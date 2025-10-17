import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { getManualTranslation, hasManualTranslation, getSupportedManualLanguages } from './manual-translations';

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  originalText: string;
  method?: 'api' | 'manual' | 'cache' | 'fallback';
}

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private readonly libreTranslateUrl = 'https://libretranslate.de/translate';
  
  // Cache za prevode (optimizacija)
  private translationCache: Map<string, string> = new Map();

  /**
   * Prevodi tekst sa izvornog na ciljni jezik
   */
  async translateText(request: TranslationRequest): Promise<TranslationResponse> {
    const { text, targetLanguage, sourceLanguage = 'en' } = request;

    // Ako je ciljni jezik engleski, vraćamo originalni tekst
    if (targetLanguage === 'en' || targetLanguage === sourceLanguage) {
      return {
        translatedText: text,
        sourceLanguage,
        targetLanguage,
        originalText: text
      };
    }

    // Provera keša
    const cacheKey = `${sourceLanguage}:${targetLanguage}:${text}`;
    if (this.translationCache.has(cacheKey)) {
      this.logger.debug(`Cache hit for: ${cacheKey}`);
      return {
        translatedText: this.translationCache.get(cacheKey)!,
        sourceLanguage,
        targetLanguage,
        originalText: text,
        method: 'cache'
      };
    }

    // Prvo pokušaj sa manual translations (brže i pouzdanije)
    const manualTranslation = getManualTranslation(text, targetLanguage);
    if (manualTranslation) {
      this.logger.log(`Using manual translation for language: ${targetLanguage}`);
      // Sačuvaj u keš
      this.translationCache.set(cacheKey, manualTranslation);
      return {
        translatedText: manualTranslation,
        sourceLanguage,
        targetLanguage,
        originalText: text,
        method: 'manual'
      };
    }

    try {
      // Poziv LibreTranslate API-ja
      const response = await fetch(this.libreTranslateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
          api_key: '' // Public LibreTranslate ne zahteva ključ
        })
      });

      if (!response.ok) {
        throw new HttpException(
          `LibreTranslate API returned status ${response.status}`,
          HttpStatus.BAD_GATEWAY
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new HttpException(
          `Translation API error: ${data.error}`,
          HttpStatus.BAD_REQUEST
        );
      }

      const translatedText = data.translatedText || text;

      // Čuvanje u keš
      this.translationCache.set(cacheKey, translatedText);

      // Ograničavanje veličine keša (max 1000 prevoda)
      if (this.translationCache.size > 1000) {
        const firstKey = this.translationCache.keys().next().value;
        this.translationCache.delete(firstKey);
      }

      this.logger.log(`Translated text from ${sourceLanguage} to ${targetLanguage} using API`);

      return {
        translatedText,
        sourceLanguage,
        targetLanguage,
        originalText: text,
        method: 'api'
      };

    } catch (error) {
      this.logger.error(`Translation API failed: ${error.message}`);

      // Pokušaj sa manual translations kao backup
      const manualBackup = getManualTranslation(text, targetLanguage);
      if (manualBackup) {
        this.logger.log(`Using manual translation as API backup for language: ${targetLanguage}`);
        this.translationCache.set(cacheKey, manualBackup);
        return {
          translatedText: manualBackup,
          sourceLanguage,
          targetLanguage,
          originalText: text,
          method: 'manual'
        };
      }

      // Legacy fallback za kompatibilnost
      const legacyFallback = this.getFallbackTranslation(text, targetLanguage);
      if (legacyFallback) {
        this.logger.warn(`Using legacy fallback translation`);
        return {
          translatedText: legacyFallback,
          sourceLanguage,
          targetLanguage,
          originalText: text,
          method: 'fallback'
        };
      }

      // Ako nema nijednog prevoda, vraćamo originalni tekst
      this.logger.warn(`No translation available, returning original text`);
      return {
        translatedText: text,
        sourceLanguage,
        targetLanguage,
        originalText: text,
        method: 'fallback'
      };
    }
  }

  /**
   * Prevodi više tekstova odjednom (batch prevod)
   */
  async translateBatch(
    texts: string[],
    targetLanguage: string,
    sourceLanguage: string = 'en'
  ): Promise<TranslationResponse[]> {
    this.logger.log(`Batch translating ${texts.length} texts to ${targetLanguage}`);
    
    const promises = texts.map(text =>
      this.translateText({ text, targetLanguage, sourceLanguage })
    );

    return Promise.all(promises);
  }

  /**
   * Vraća listu podržanih jezika
   */
  async getSupportedLanguages(): Promise<{ code: string; name: string }[]> {
    try {
      const response = await fetch('https://libretranslate.de/languages');
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const languages = await response.json();
      return languages;

    } catch (error) {
      this.logger.error(`Failed to fetch supported languages: ${error.message}`);
      
      // Vraćamo osnovnu listu jezika kao fallback
      return this.getDefaultSupportedLanguages();
    }
  }

  /**
   * Detektuje jezik teksta
   */
  async detectLanguage(text: string): Promise<{ language: string; confidence: number }> {
    try {
      const response = await fetch('https://libretranslate.de/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          api_key: ''
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.length > 0) {
        return {
          language: data[0].language,
          confidence: data[0].confidence
        };
      }

      return { language: 'en', confidence: 0 };

    } catch (error) {
      this.logger.error(`Language detection failed: ${error.message}`);
      return { language: 'en', confidence: 0 };
    }
  }

  /**
   * Čisti keš prevoda
   */
  clearCache(): void {
    this.translationCache.clear();
    this.logger.log('Translation cache cleared');
  }

  /**
   * Vraća statistiku keša
   */
  getCacheStats(): { size: number; maxSize: number } {
    return {
      size: this.translationCache.size,
      maxSize: 1000
    };
  }

  /**
   * Fallback prevodi za najčešće fraze
   */
  private getFallbackTranslation(text: string, targetLang: string): string | null {
    const fallbackTranslations: { [key: string]: { [key: string]: string } } = {
      "Hi! I'm your AI assistant. I can help you with questions about our services, pricing, or getting started. How can I assist you today?": {
        "es": "¡Hola! Soy tu asistente de IA. Puedo ayudarte con preguntas sobre nuestros servicios, precios o cómo empezar. ¿Cómo puedo asistirte hoy?",
        "fr": "Salut! Je suis votre assistant IA. Je peux vous aider avec des questions sur nos services, nos tarifs ou comment démarrer. Comment puis-je vous assister aujourd'hui?",
        "de": "Hallo! Ich bin Ihr KI-Assistent. Ich kann Ihnen bei Fragen zu unseren Dienstleistungen, Preisen oder dem Einstieg helfen. Wie kann ich Ihnen heute behilflich sein?",
        "it": "Ciao! Sono il tuo assistente IA. Posso aiutarti con domande sui nostri servizi, prezzi o come iniziare. Come posso assisterti oggi?",
        "pt": "Olá! Sou seu assistente de IA. Posso ajudá-lo com perguntas sobre nossos serviços, preços ou como começar. Como posso assisti-lo hoje?",
        "ru": "Привет! Я ваш ИИ-помощник. Я могу помочь вам с вопросами о наших услугах, ценах или как начать. Чем могу помочь вам сегодня?",
        "ja": "こんにちは！私はあなたのAIアシスタントです。サービス、価格、または開始方法についての質問をお手伝いできます。今日はどのようにお手伝いしましょうか？",
        "ko": "안녕하세요! 저는 AI 어시스턴트입니다. 서비스, 가격 또는 시작 방법에 대한 질問에 도움을 드릴 수 있습니다. 오늘 어떻게 도와드릴까요?",
        "zh": "你好！我是你的AI助手。我可以帮助你解答关于我们的服务、价格或入门的问题。今天我怎么帮助你？",
        "sr": "Здраво! Ја сам ваш АИ асистент. Могу да вам помогнем са питањима о нашим услугама, ценама или како почети. Како могу да вам помогнем данас?"
      },
      "I'd be happy to help you with that. Could you tell me more about what you're looking for?": {
        "es": "Estaría encantado de ayudarte con eso. ¿Podrías contarme más sobre lo que buscas?",
        "fr": "Je serais ravi de vous aider. Pourriez-vous me dire plus sur ce que vous cherchez?",
        "de": "Ich helfe Ihnen gerne dabei. Könnten Sie mir mehr über das erzählen, was Sie suchen?",
        "it": "Sarei felice di aiutarti. Potresti dirmi di più su cosa stai cercando?",
        "pt": "Fico feliz em ajudar você com isso. Você poderia me contar mais sobre o que está procurando?",
        "ru": "Я с радостью помогу вам с этим. Не могли бы вы рассказать подробнее о том, что вы ищете?",
        "ja": "喜んでお手伝いします。何をお探しか、もう少し詳しく教えていただけますか？",
        "ko": "기꺼이 도와드리겠습니다. 무엇을 찾고 계신지 자세히 알려주시겠어요?",
        "zh": "我很乐意帮助你。你能告诉我更多你正在寻找什么吗？",
        "sr": "Радо ћу вам помоћи са тим. Можете ли ми рећи више о томе шта тражите?"
      }
    };

    return fallbackTranslations[text]?.[targetLang] || null;
  }

  /**
   * Osnovni podržani jezici kao fallback
   */
  private getDefaultSupportedLanguages(): { code: string; name: string }[] {
    // Combine manual translation languages with default list
    const manualLanguages = getSupportedManualLanguages();
    const languageNames: { [code: string]: string } = {
      'en': 'English',
      'es': 'Spanish (Español)',
      'fr': 'French (Français)',
      'de': 'German (Deutsch)',
      'it': 'Italian (Italiano)',
      'pt': 'Portuguese (Português)',
      'ru': 'Russian (Русский)',
      'ja': 'Japanese (日本語)',
      'ko': 'Korean (한국어)',
      'zh': 'Chinese (中文)',
      'ar': 'Arabic (العربية)',
      'hi': 'Hindi (हिन्दी)',
      'nl': 'Dutch (Nederlands)',
      'sv': 'Swedish (Svenska)',
      'pl': 'Polish (Polski)',
      'tr': 'Turkish (Türkçe)',
      'sr': 'Serbian (Српски)'
    };

    return [
      { code: 'en', name: 'English' },
      ...manualLanguages
        .filter(code => code !== 'en')
        .map(code => ({
          code,
          name: languageNames[code] || code.toUpperCase()
        }))
    ];
  }

  /**
   * Get information about translation service
   */
  getServiceInfo(): {
    cacheSize: number;
    manualTranslationsAvailable: boolean;
    supportedManualLanguages: string[];
  } {
    return {
      cacheSize: this.translationCache.size,
      manualTranslationsAvailable: true,
      supportedManualLanguages: getSupportedManualLanguages(),
    };
  }
}

