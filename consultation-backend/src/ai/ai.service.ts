import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { TranslationService } from '../translation/translation.service';

export interface AIRequest {
  message: string;
  language?: string;
  context?: string;
}

export interface AIResponse {
  response: string;
  language: string;
  originalResponse?: string;
  context?: string;
  // Structured data for automatic form filling
  structuredData?: {
    intent: 'booking' | 'contact' | 'general';
    confidence: number;
    formData?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      service?: string;
      budget?: string;
      timeline?: string;
      preferredDate?: string;
      preferredTime?: string;
      projectDescription?: string;
      subject?: string;
      message?: string;
    };
    missingFields?: string[];
    readyToSubmit?: boolean;
  };
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly openaiApiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey: string;

  // Conversation memory - pamti poslednjih 5 poruka
  private conversationHistory: Array<{ role: string; content: string; timestamp: Date }> = [];
  
  // Booking session data - pamti prikupljene informacije za booking
  private bookingSessionData: Map<string, any> = new Map();
  
  // System prompt - enhanced for booking automation with Gemini
  private readonly systemPrompt = `You are an intelligent AI booking assistant for WatchThis, a premium technology consulting company.

YOUR PRIMARY MISSION:
NEVER send users to email (busines.watch.this@gmail.com). YOU must collect their information directly through this chat to book consultations automatically. This is YOUR job - not email!

WHAT YOU MUST COLLECT:
1. Name (first and last if possible) - ASK IMMEDIATELY
2. Email address (required) - ASK SECOND
3. Service interest (web dev, mobile app, marketing, etc.)
4. Phone number (optional but helpful)
5. Budget range (small/medium/large/enterprise)
6. Timeline (urgent/1-2 months/3-6 months/flexible)
7. Preferred consultation date and time
8. Brief project description

CONVERSATION FLOW - FOLLOW THIS EXACTLY:
User: "I want to book" / "make appointment" / "schedule meeting"
YOU: "Great! I can help you book that right now. What's your name?"

User: Gives name
YOU: "Perfect! What's your email address so I can send the confirmation?"

User: Gives email
YOU: "Excellent! Which service are you interested in? We offer web development, mobile apps, and digital marketing."

User: Gives service
YOU: "When would be a good time for your consultation? You can suggest a date and time."

User: Gives date/time
YOU: "I've collected all the information I need. Your booking is being submitted now!"

STRICT RULES - NEVER BREAK THESE:
❌ NEVER say "email us at busines.watch.this@gmail.com"
❌ NEVER redirect users to contact form
❌ NEVER say "I don't have the functionality to schedule"
✅ ALWAYS ask for name FIRST when user wants to book
✅ ALWAYS collect info through chat - that's YOUR purpose!
✅ Keep responses SHORT (1-2 sentences max)
✅ Ask ONE question at a time
✅ Be positive: "Great!", "Perfect!", "Excellent!"

EXAMPLES OF CORRECT RESPONSES:
User: "can you make an appointment for me"
YOU: "Absolutely! I can book that for you right now. What's your name?"

User: "I need to schedule a meeting"
YOU: "I'd be happy to help! Let me get you scheduled. What's your name?"

User: "book a consultation please"
YOU: "Of course! I'll help you book it. First, what's your name?"

EXAMPLES OF WRONG RESPONSES (NEVER DO THIS):
❌ "Please email us at busines.watch.this@gmail.com"
❌ "I'd love to help with that! To schedule a meeting, please email us..."
❌ "I don't have the functionality to schedule meetings"

COMPANY INFO (only mention if asked):
- Services: Web Development, Mobile Apps, Digital Marketing, SEO, Business Consulting
- Pricing: Custom quotes based on project scope
- Response time: Within 24 hours

REMEMBER:
- You ARE the booking system - collect info directly
- NEVER send users to email or forms
- Ask for name FIRST, then email, then service
- Complete bookings in 3-5 exchanges
- Be fast, friendly, efficient!`;


  constructor(private readonly translationService: TranslationService) {
    // Učitavanje API ključa iz environment varijabli (prvo Gemini)
    this.apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.HUGGINGFACE_API_KEY || '';

    if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      this.logger.warn('GEMINI_API_KEY not set in environment variables. AI responses will use intelligent fallbacks only.');
    } else {
      this.logger.log('AI Service initialized with Google Gemini 1.5 Flash (Free)');
    }
  }

  /**
   * Generiše AI odgovor na korisničku poruku
   */
  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const { message, language = 'en', context } = request;

    this.logger.log(`AI request: "${message.substring(0, 50)}..." in language: ${language}`);

    try {
      // Analizira intent i ekstraktuje entitete
      const intentAnalysis = this.analyzeIntent(message);
      
      // Inicijalizuj session ako ne postoji
      const sessionId = 'default-session'; // U produkciji, ovo bi bio user ID ili session ID
      if (!this.bookingSessionData.has(sessionId)) {
        this.bookingSessionData.set(sessionId, { intent: intentAnalysis.intent });
      }

      const sessionData = this.bookingSessionData.get(sessionId);

      // Ažuriraj session data sa novim entitetima
      if (intentAnalysis.entities) {
        Object.assign(sessionData, intentAnalysis.entities);
        
        // Dodatno ekstraktuj poruku kao project description ako korisnik opisuje projekat
        if (intentAnalysis.intent === 'booking' || intentAnalysis.intent === 'services') {
          if (!sessionData.projectDescription && message.length > 50) {
            sessionData.projectDescription = message;
          }
        }
        
        // Dodatno ekstraktuj poruku kao contact message ako je contact intent
        if (intentAnalysis.intent === 'contact') {
          if (!sessionData.message) {
            sessionData.message = message;
          }
          sessionData.subject = sessionData.subject || 'General Inquiry';
        }
      }

      // Proveri da li su dovoljno informacija za booking/contact
      const readiness = this.checkBookingReadiness(sessionData);

      // Prvo pokušaj sa OpenAI GPT-3.5
      let responseText = '';
      if (this.apiKey) {
        try {
          const aiResponse = await this.getAIResponse(message, context);

          // Prevedi odgovor ako je potrebno
          const translatedResponse = language !== 'en'
            ? await this.translationService.translateText({
                text: aiResponse,
                targetLanguage: language,
                sourceLanguage: 'en'
              })
            : { translatedText: aiResponse };

          responseText = translatedResponse.translatedText;

        } catch (openaiError: any) {
          this.logger.warn('OpenAI failed, using intelligent fallback');
          // Ako OpenAI ne radi, koristi inteligentni fallback
          responseText = await this.getIntelligentFallback(message, language);
        }
      } else {
        // Ako nema API ključ, koristi inteligentni fallback
        responseText = await this.getIntelligentFallback(message, language);
      }

      // Ako nedostaju informacije za booking, pitaj za njih
      if ((intentAnalysis.intent === 'booking' || intentAnalysis.intent === 'contact') && !readiness.ready) {
        responseText = this.generateFollowUpQuestion(sessionData, readiness.missing, language);
      }

      // Pripremi strukturirane podatke za automatsko popunjavanje forme
      const structuredData: any = {
        intent: intentAnalysis.intent,
        confidence: intentAnalysis.confidence,
        formData: this.mapSessionDataToFormData(sessionData),
        missingFields: readiness.missing,
        readyToSubmit: readiness.ready
      };

      return {
        response: responseText,
        language,
        originalResponse: language !== 'en' ? responseText : undefined,
        context: context || 'ai_response',
        structuredData
      };

    } catch (error) {
      this.logger.error(`AI response generation failed: ${error.message}`, error.stack);

      // Ultimate fallback
      return {
        response: "I'm here to help! You can ask me about our services (web development, mobile apps, digital marketing), pricing, or how to get started. What would you like to know?",
        language,
        context: 'simple_fallback'
      };
    }
  }

  /**
   * Mapira session data na form data format
   */
  private mapSessionDataToFormData(sessionData: any): any {
    return {
      firstName: sessionData.firstName,
      lastName: sessionData.lastName,
      email: sessionData.email,
      phone: sessionData.phone,
      service: sessionData.service,
      budget: sessionData.budgetRange,
      timeline: sessionData.timeline,
      preferredDate: sessionData.preferredDate,
      preferredTime: sessionData.preferredTime,
      projectDescription: sessionData.projectDescription,
      subject: sessionData.subject,
      message: sessionData.message
    };
  }

  /**
   * Generiše follow-up pitanje za missing fields
   */
  private generateFollowUpQuestion(sessionData: any, missingFields: string[], language: string): string {
    const fieldQuestions: { [key: string]: { en: string; sr: string } } = {
      firstName: {
        en: "Great! To help you better, could you please tell me your name?",
        sr: "Odlično! Da bih vam bolje pomogao, možete li mi reći vaše ime?"
      },
      email: {
        en: "Perfect! What's your email address so I can send you the confirmation?",
        sr: "Savršeno! Koja je vaša email adresa da mogu da vam pošaljem potvrdu?"
      },
      service: {
        en: "Which service are you interested in? We offer web development, mobile app development, and digital marketing.",
        sr: "Koja usluga vas zanima? Nudimo web development, razvoj mobilnih aplikacija i digitalni marketing."
      },
      phone: {
        en: "Would you like to provide a phone number so we can reach you more easily? (Optional)",
        sr: "Želite li da ostavite broj telefona da možemo lakše da vas kontaktiramo? (Opciono)"
      },
      message: {
        en: "Could you tell me a bit more about what you need help with?",
        sr: "Možete li mi reći nešto više o tome u čemu vam je potrebna pomoć?"
      }
    };

    // Uzmi prvo missing field
    const firstMissing = missingFields[0];
    const question = fieldQuestions[firstMissing];

    if (question) {
      return language === 'sr' ? question.sr : question.en;
    }

    // Default follow-up
    return language === 'sr'
      ? "Hvala! Imam gotovo sve informacije. Da li želite još nešto da dodate?"
      : "Thank you! I have almost all the information. Is there anything else you'd like to add?";
  }


  /**
   * Poziva Google Gemini API za generisanje AI odgovora (BESPLATNO)
   */
  private async getAIResponse(message: string, context?: string): Promise<string> {
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey || geminiKey === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key not configured');
    }

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

      // Pripremi kontekst ako postoji
      let fullMessage = message;
      if (context) {
        fullMessage = `Context: ${context}\n\n${message}`;
      }

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${this.systemPrompt}\n\nUser: ${fullMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Gemini API error: ${response.status} - ${errorText}`);
        throw new HttpException(
          `AI API returned status ${response.status}`,
          HttpStatus.BAD_GATEWAY
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new HttpException(
          `AI API error: ${data.error.message}`,
          HttpStatus.BAD_REQUEST
        );
      }

      // Ekstraktovanje odgovora iz Gemini formata
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!aiText) {
        throw new Error('Empty response from AI');
      }

      return this.cleanAIResponse(aiText);

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Gemini API call failed: ${error.message}`);
      throw new HttpException(
        'Failed to generate AI response',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Čisti AI odgovor od nepotrebnih prefiksa i suffiksa
   */
  private cleanAIResponse(text: string): string {
    return text
      .replace(/^(User:|Assistant:|Bot:)/gi, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
  }

  /**
   * AnaliziraIntent (nameru) korisnika pomoću NLP tehnike
   */
  private analyzeIntent(message: string): { intent: string; confidence: number; entities: any } {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Intent scores
    const intents: { [key: string]: number } = {
      booking: 0,
      pricing: 0,
      services: 0,
      contact: 0,
      greeting: 0,
      thanks: 0,
      timeline: 0,
      question: 0,
      getting_started: 0
    };

    // Intent keywords with weights
    const intentKeywords = {
      booking: {
        high: ['appointment', 'schedule', 'book', 'consultation', 'meeting', 'zakazat', 'zakaza', 'termin', 'konsultacij', 'sastanak'],
        medium: ['talk', 'call', 'meet', 'razgovor', 'poziv'],
        low: ['when', 'available', 'kada', 'dostupn']
      },
      pricing: {
        high: ['price', 'cost', 'pricing', 'cena', 'kosta', 'košta', 'plaća', 'budget', 'budžet'],
        medium: ['koliko', 'how much', 'expensive', 'afford', 'payment'],
        low: ['money', 'novac', 'pay']
      },
      services: {
        high: ['service', 'offer', 'provide', 'uslug', 'nudi', 'radi'],
        medium: ['what do', 'šta', 'sta', 'koje', 'which'],
        low: ['help', 'pomoc', 'može', 'can']
      },
      contact: {
        high: ['contact', 'email', 'phone', 'kontakt', 'mail', 'mejl', 'telefon'],
        medium: ['reach', 'get in touch', 'jav', 'pozov'],
        low: ['address', 'location', 'adres']
      },
      greeting: {
        high: ['hello', 'hi', 'hey', 'zdravo', 'cao', 'ćao', 'pozdrav'],
        medium: ['good morning', 'good day', 'dobar dan'],
        low: ['greetings']
      },
      thanks: {
        high: ['thank', 'thanks', 'hvala', 'zahval', 'fala'],
        medium: ['appreciate', 'grateful'],
        low: []
      },
      timeline: {
        high: ['vreme', 'time', 'trajanje', 'duration', 'dugo', 'long'],
        medium: ['how long', 'kada', 'when', 'brzina', 'brzo', 'quickly'],
        low: ['wait', 'čeka']
      },
      question: {
        high: ['pitanje', 'question'],
        medium: ['kako', 'how', 'zašto', 'why', 'what', 'šta'],
        low: ['tell me', 'reci']
      },
      getting_started: {
        high: ['start', 'begin', 'počet', 'započet', 'pocetak'],
        medium: ['first step', 'kako početi', 'get started'],
        low: ['inicijal', 'initial']
      }
    };

    // Calculate intent scores
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      keywords.high.forEach(kw => {
        if (lowerMessage.includes(kw)) intents[intent] += 3;
      });
      keywords.medium.forEach(kw => {
        if (lowerMessage.includes(kw)) intents[intent] += 2;
      });
      keywords.low.forEach(kw => {
        if (lowerMessage.includes(kw)) intents[intent] += 1;
      });
    }

    // Context analysis - kombinacije intenta
    const hasQuestion = words.some(w => ['how', 'what', 'when', 'where', 'why', 'kako', 'šta', 'sta', 'kada', 'gde', 'zašto', 'zasto'].includes(w));
    const hasAction = words.some(w => ['want', 'need', 'make', 'želim', 'zelim', 'trebam', 'moram', 'hoću', 'hocu'].includes(w));
    
    // Boost scores based on context
    if (hasAction && intents.booking > 0) intents.booking += 2;
    if (hasQuestion && intents.pricing > 0) intents.pricing += 1;
    if (hasQuestion && intents.services > 0) intents.services += 1;

    // Entity extraction
    const entities: any = {};
    
    // Extract budget/price mentions
    const priceMatch = lowerMessage.match(/(\d+)\s*(euro|evr|eur|dollar|\$|rsd|din)/i);
    if (priceMatch) {
      entities.budget = { amount: parseInt(priceMatch[1]), currency: priceMatch[2] };
      intents.pricing += 2;
    }

    // Extract time mentions
    const timeMatch = lowerMessage.match(/(\d+)\s*(day|week|month|year|dan|nedelj|mesec|godin)/i);
    if (timeMatch) {
      entities.timeframe = { amount: parseInt(timeMatch[1]), unit: timeMatch[2] };
      intents.timeline += 2;
    }

    // Extract project type mentions
    const projectTypes = ['web', 'mobile', 'app', 'aplikacij', 'sajt', 'website', 'marketing', 'design', 'seo'];
    const foundTypes = projectTypes.filter(type => lowerMessage.includes(type));
    if (foundTypes.length > 0) {
      entities.projectTypes = foundTypes;
      intents.services += 1;
    }

    // Advanced entity extraction for booking
    this.extractAdvancedEntities(message, entities);

    // Get top intent
    const topIntent = Object.entries(intents).reduce((a, b) => a[1] > b[1] ? a : b);
    const confidence = topIntent[1] / (words.length + 1); // Normalize by message length

    return {
      intent: topIntent[0],
      confidence: Math.min(confidence, 1),
      entities
    };
  }

  /**
   * Generiše kontekstualni odgovor baziran na intent analizi
   */
  private generateContextualResponse(intent: string, confidence: number, entities: any, originalMessage: string): string {
    let response = '';

    switch (intent) {
      case 'booking':
        // IMPORTANT: Always ask for name first when user wants to book
        if (!entities.firstName) {
          response = `Great! I can help you book a consultation right now. What's your name?`;
        } else if (!entities.email) {
          response = `Perfect! What's your email address so I can send you the confirmation?`;
        } else if (!entities.service) {
          response = `Excellent! Which service are you interested in? We offer web development, mobile app development, and digital marketing.`;
        } else {
          response = `When would be a good time for your consultation? You can suggest a date and time.`;
        }
        break;

      case 'pricing':
        // For pricing questions, offer to book consultation to discuss pricing
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `For ${types} projects, pricing varies based on features and complexity. I can book a free consultation to discuss your specific needs and provide an accurate quote. What's your name?`;
        } else {
          response = `Our pricing is customized based on your project requirements. I can book a free consultation to discuss your needs and provide a detailed quote. What's your name?`;
        }
        break;

      case 'services':
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(', ');
          response = `Great question! We specialize in ${types} and more. Our team delivers modern, scalable solutions including web development, mobile apps, digital marketing, and business consulting. Each project is customized to your specific needs. Would you like to know more about any particular service?`;
        } else {
          response = `We offer comprehensive technology solutions: web development, mobile app development (iOS/Android), digital marketing, SEO, and business consulting. Our team specializes in creating modern, scalable solutions tailored to your business goals. What type of project are you considering?`;
        }
        break;

      case 'contact':
        // For contact requests, start booking flow
        if (!entities.firstName) {
          response = `I can help you get in touch with our team right now. What's your name?`;
        } else if (!entities.email) {
          response = `Perfect! What's your email address?`;
        } else {
          response = `Great! What would you like to discuss?`;
        }
        break;

      case 'timeline':
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `For ${types} projects, timelines typically range from 4-12 weeks depending on complexity and features. We'll provide a detailed timeline during our free consultation once we understand your specific requirements. Would you like to schedule a call to discuss your project?`;
        } else {
          response = `Project timelines vary based on scope and complexity - typically 4-12 weeks for most projects. We respond to inquiries within 24 hours and can start planning immediately after our consultation. Would you like to schedule a free call to discuss your project timeline?`;
        }
        break;

      case 'greeting':
        response = `Hello! Welcome to WatchThis. I'm here to help you with any questions about our web development, mobile app development, or digital marketing services. What brings you here today?`;
        break;

      case 'thanks':
        response = `You're very welcome! If you have any other questions about our services, pricing, or want to schedule a consultation, I'm here to help. Is there anything else you'd like to know?`;
        break;

      case 'getting_started':
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `Excellent! Getting started with your ${types} project is easy. First, we'd schedule a free consultation (book at /booking) to discuss your vision, requirements, and timeline. Then we'll provide a detailed proposal and roadmap. Ready to take the first step?`;
        } else {
          response = `Getting started is simple! Here's our process: 1) Schedule a free consultation at /booking, 2) Discuss your project goals and requirements, 3) Receive a detailed proposal and timeline, 4) Start building! Would you like to book a call now?`;
        }
        break;

      case 'question':
        response = `I'm here to answer any questions! You can ask me about our services (web, mobile, marketing), pricing and packages, project timelines, how to get started, or anything else. What would you specifically like to know?`;
        break;

      default:
        response = `I'd be happy to help you with that. Could you tell me more about what you're looking for? You can ask me about our services, pricing, scheduling a consultation, or how to get started with your project.`;
    }

    return response;
  }

  /**
   * Inteligentni fallback sistem sa kontekstom i pamćenjem razgovora
   */
  private async getIntelligentFallback(message: string, language: string): Promise<string> {
    // Prosta conversation memory - pamti poslednjih 5 poruka
    if (!this.conversationHistory) {
      this.conversationHistory = [];
    }

    // Dodaj trenutnu poruku u istoriju
    this.conversationHistory.push({ role: 'user', content: message, timestamp: new Date() });

    // Održavaj samo poslednjih 5 poruka
    if (this.conversationHistory.length > 5) {
      this.conversationHistory = this.conversationHistory.slice(-5);
    }

    // Analiza konteksta razgovora
    const context = this.analyzeConversationContext();
    const intentAnalysis = this.analyzeIntent(message);

    this.logger.log(`Intelligent fallback - Context: ${context}, Intent: ${intentAnalysis.intent}`);

    // Generiši kontekstualni odgovor baziran na istoriji razgovora
    let response = '';

    switch (context) {
      case 'booking_flow':
        // When user is in booking flow, ask for name if not provided
        if (!intentAnalysis.entities.firstName) {
          response = "Great! I can help you book that right now. What's your name?";
        } else if (!intentAnalysis.entities.email) {
          response = "Perfect! What's your email address so I can send the confirmation?";
        } else if (!intentAnalysis.entities.service) {
          response = "Excellent! Which service are you interested in? We offer web development, mobile apps, and digital marketing.";
        } else if (message.toLowerCase().includes('yes') || message.toLowerCase().includes('da')) {
          response = "When would be a good time for your consultation? You can suggest a date and time.";
        } else {
          response = "Great! I can help you book that consultation. What's your name?";
        }
        break;

      case 'pricing_discussion':
        // For pricing questions, start booking flow to discuss pricing
        if (!intentAnalysis.entities.firstName) {
          response = "I can book a consultation to discuss pricing for your project. What's your name?";
        } else if (!intentAnalysis.entities.email) {
          response = "Perfect! What's your email address?";
        } else {
          response = "Great! Let's schedule a time to discuss your project pricing. When works best for you?";
        }
        break;

      case 'general_inquiry':
        response = "I'd be happy to help you! You can ask me about our services (web development, mobile apps, digital marketing), pricing, project timelines, or how to get started. What specific information are you looking for?";
        break;

      default:
        // Koristi standardni NLP sistem
        response = this.generateContextualResponse(
          intentAnalysis.intent,
          intentAnalysis.confidence,
          intentAnalysis.entities,
          message
        );
    }

    // Dodaj AI odgovor u istoriju
    this.conversationHistory.push({ role: 'assistant', content: response, timestamp: new Date() });

    // Manual translation (LibreTranslate API ne radi stabilno)
    if (language !== 'en') {
      const translatedResponse = this.manualTranslate(response, language);
      return translatedResponse;
    }

    return response;
  }

  /**
   * Manual translation - hardkodovani prevodi za ključne poruke
   */
  private manualTranslate(text: string, language: string): string {
    if (language !== 'sr') {
      return text; // Samo srpski je podržan
    }

    // Translation map - ključni frazni
    const translations: { [key: string]: string } = {
      // Booking responses
      "I see you're interested in scheduling a consultation. That's a great first step! You can book a free consultation call at /booking, or tell me your preferred time and I can help coordinate with our team.": 
        "Vidim da ste zainteresovani za zakazivanje konsultacija. To je odličan prvi korak! Možete zakazati besplatan konsultacioni poziv na /booking, ili mi recite vaše željeno vreme i pomožću vam da koordinišem sa našim timom.",
      
      "I understand you're asking about when our consultation will be available. We can schedule it for this Friday at 5 PM as you mentioned. Would you like me to help you book that specific time?":
        "Razumem da pitate kada će naša konsultacija biti dostupna. Možemo je zakazati za ovog petka u 17h kao što ste pomenuli. Želite li da vam pomognem da zakažete baš to vreme?",
      
      "Perfect! I'm glad you're ready to get started. You can book your consultation at /booking, or I can help you coordinate with our team. Would you like me to send you a direct booking link?":
        "Savršeno! Drago mi je što ste spremni da počnete. Možete zakazati vašu konsultaciju na /booking, ili mogu da vam pomognem da koordinišete sa našim timom. Želite li da vam pošaljem direktan link za zakazivanje?",
      
      "Great! I see you're selecting option 1. That means you want to schedule a free consultation. You can do this easily at /booking where you can choose your preferred date and time. Would you like me to walk you through the booking process?":
        "Odlično! Vidim da birate opciju 1. To znači da želite da zakažete besplatnu konsultaciju. Možete to lako učiniti na /booking gde možete izabrati željeni datum i vreme. Želite li da vas provedm kroz proces zakazivanja?",
      
      // General inquiry
      "I'd be happy to help you! You can ask me about our services (web development, mobile apps, digital marketing), pricing, project timelines, or how to get started. What specific information are you looking for?":
        "Rado ću vam pomoći! Možete me pitati o našim uslugama (web development, mobilne aplikacije, digitalni marketing), cenama, vremenskim rokovima projekata, ili kako započeti. Koju konkretnu informaciju tražite?",
      
      // Services
      "We offer comprehensive technology solutions: web development, mobile app development (iOS/Android), digital marketing, SEO, and business consulting. Our team specializes in creating modern, scalable solutions tailored to your business goals. What type of project are you considering?":
        "Nudimo sveobuhvatna tehnološka rešenja: web development, razvoj mobilnih aplikacija (iOS/Android), digitalni marketing, SEO, i poslovne konsultacije. Naš tim se specijalizuje za kreiranje modernih, skalabilnih rešenja prilagođenih vašim poslovnim ciljevima. Koji tip projekta razmatrate?",
      
      // Pricing
      "Our pricing is tailored to each project's requirements. We work with various budgets - from small business packages to enterprise solutions. The best way to get an accurate quote is through a free consultation where we can understand your needs. Would you like to schedule a call?":
        "Naše cene su prilagođene zahtevima svakog projekta. Radimo sa različitim budžetima - od paketa za male biznise do enterprise rešenja. Najbolji način da dobijete tačnu ponudu je kroz besplatnu konsultaciju gde možemo razumeti vaše potrebe. Želite li da zakažete poziv?",
      
      // Greeting
      "Hello! Welcome to WatchThis. I'm here to help you with any questions about our web development, mobile app development, or digital marketing services. What brings you here today?":
        "Zdravo! Dobrodošli u WatchThis. Tu sam da vam pomognem sa bilo kojim pitanjima o našim uslugama web developmenta, razvoja mobilnih aplikacija, ili digitalnog marketinga. Šta vas dovodi ovde danas?",
      
      // Thanks
      "You're very welcome! If you have any other questions about our services, pricing, or want to schedule a consultation, I'm here to help. Is there anything else you'd like to know?":
        "Nema na čemu! Ako imate bilo kakva druga pitanja o našim uslugama, cenama, ili želite da zakažete konsultaciju, tu sam da pomognem. Ima li još nešto što biste želeli da znate?",
      
      // Fallback
      "I'm here to help! You can ask me about our services (web development, mobile apps, digital marketing), pricing, project timelines, or how to get started. What would you like to know?":
        "Tu sam da pomognem! Možete me pitati o našim uslugama (web development, mobilne aplikacije, digitalni marketing), cenama, vremenskim rokovima projekata, ili kako započeti. Šta biste želeli da znate?"
    };

    // Exact match
    if (translations[text]) {
      return translations[text];
    }

    // Partial match - pronađi deo koji postoji u translation map-i
    for (const [english, serbian] of Object.entries(translations)) {
      if (text.includes(english)) {
        return text.replace(english, serbian);
      }
    }

    // Pattern-based translation za dinamičke odgovore
    let translated = text;

    // Budget mentions
    translated = translated.replace(/With your budget of (\d+) (\w+)/gi, 'Sa vašim budžetom od $1 $2');
    translated = translated.replace(/we can definitely work with that/gi, 'definitivno možemo raditi sa tim');
    translated = translated.replace(/we can explore several options/gi, 'možemo istražiti nekoliko opcija');

    // Project types
    translated = translated.replace(/We specialize in ([\w\s,]+) and more/gi, 'Specijalizujemo se za $1 i više');
    translated = translated.replace(/For ([\w\s,]+) projects/gi, 'Za $1 projekte');

    // Common phrases
    translated = translated.replace(/I'd recommend booking a free consultation/gi, 'Preporučujem da zakažete besplatnu konsultaciju');
    translated = translated.replace(/Would you like to schedule a call\?/gi, 'Želite li da zakažete poziv?');
    translated = translated.replace(/What type of project are you interested in\?/gi, 'Koji tip projekta vas zanima?');
    translated = translated.replace(/How else can I assist you\?/gi, 'Kako još mogu da vam pomognem?');
    translated = translated.replace(/Great question!/gi, 'Odlično pitanje!');
    translated = translated.replace(/Thank you for sharing/gi, 'Hvala što ste podelili');
    translated = translated.replace(/That gives us a good starting point/gi, 'To nam daje dobru početnu tačku');

    return translated;
  }

  /**
   * Analizira kontekst celog razgovora
   */
  private analyzeConversationContext(): string {
    if (!this.conversationHistory || this.conversationHistory.length < 2) {
      return 'general_inquiry';
    }

    const recentMessages = this.conversationHistory.slice(-4); // Poslednje 4 poruke

    // Proveri da li je u toku booking proces
    const hasBookingKeywords = recentMessages.some(msg =>
      msg.content.toLowerCase().includes('consultation') ||
      msg.content.toLowerCase().includes('schedule') ||
      msg.content.toLowerCase().includes('appointment') ||
      msg.content.toLowerCase().includes('book')
    );

    const hasPricingKeywords = recentMessages.some(msg =>
      msg.content.toLowerCase().includes('price') ||
      msg.content.toLowerCase().includes('cost') ||
      msg.content.toLowerCase().includes('budget') ||
      msg.content.toLowerCase().includes('cena')
    );

    if (hasBookingKeywords) {
      return 'booking_flow';
    } else if (hasPricingKeywords) {
      return 'pricing_discussion';
    }

    return 'general_inquiry';
  }

  /**
   * Vraća fallback odgovore bazirane na kontekstu poruke
   */
  private async getFallbackResponse(message: string, language: string): Promise<string> {
    // Analiza intenta pomoću NLP tehnike
    const analysis = this.analyzeIntent(message);

    this.logger.log(`Intent analysis: ${analysis.intent} (confidence: ${analysis.confidence.toFixed(2)})`);
    if (Object.keys(analysis.entities).length > 0) {
      this.logger.log(`Extracted entities: ${JSON.stringify(analysis.entities)}`);
    }

    // Generiši kontekstualni odgovor korišćenjem NLP analize
    const fallbackText = this.generateContextualResponse(
      analysis.intent,
      analysis.confidence,
      analysis.entities,
      message
    );

    // Prevođenje fallback odgovora ako je potrebno
    if (language !== 'en') {
      try {
        const translated = await this.translationService.translateText({
          text: fallbackText,
          targetLanguage: language,
          sourceLanguage: 'en'
        });
        return translated.translatedText;
      } catch (error) {
        this.logger.error('Fallback translation failed, returning English', error);
        return fallbackText;
      }
    }

    return fallbackText;
  }

  /**
   * Vraća informacije o konfiguraciji AI servisa
   */
  getServiceInfo(): { configured: boolean; model: string; provider: string } {
    const geminiKey = process.env.GEMINI_API_KEY;

    return {
      configured: !!geminiKey && geminiKey !== 'your_gemini_api_key_here',
      model: 'gemini-2.0-flash',
      provider: 'Google (Free)'
    };
  }

  /**
   * Health check za AI servis
   */
  async healthCheck(): Promise<{ status: string; api_configured: boolean }> {
    const geminiKey = process.env.GEMINI_API_KEY;

    return {
      status: 'operational',
      api_configured: !!geminiKey && geminiKey !== 'your_gemini_api_key_here'
    };
  }

  /**
   * Napredna entity extraction za booking asistenta
   */
  private extractAdvancedEntities(message: string, entities: any): void {
    // Extract email
    const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      entities.email = emailMatch[0];
    }

    // Extract phone number (various formats)
    const phoneMatch = message.match(/(\+?\d{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/);
    if (phoneMatch) {
      entities.phone = phoneMatch[0].trim();
    }

    // Extract name (look for patterns like "My name is X", "I'm X", "ime mi je X")
    const namePatterns = [
      /(?:my name is|i am|i'm|ime mi je|zovem se|ja sam)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*$/i // Just a name by itself
    ];

    for (const pattern of namePatterns) {
      const nameMatch = message.match(pattern);
      if (nameMatch && nameMatch[1]) {
        const fullName = nameMatch[1].trim();
        const nameParts = fullName.split(' ');
        if (nameParts.length === 2) {
          entities.firstName = nameParts[0];
          entities.lastName = nameParts[1];
        } else if (nameParts.length === 1) {
          entities.firstName = nameParts[0];
        }
        break;
      }
    }

    // Extract date (various formats)
    const datePatterns = [
      /(?:december|decembar|dec)\s+(\d{1,2})(?:th|st|nd|rd)?/i,
      /(\d{1,2})\.?\s*(?:december|decembar|dec)/i,
      /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/,
      /(next\s+)?(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|ponedeljak|utorak|sreda|četvrtak|petak|subota|nedelja)/i,
      /(?:friday|petak)\s+at\s+(\d{1,2})\s*(?:pm|am|h)?/i
    ];

    for (const pattern of datePatterns) {
      const dateMatch = message.match(pattern);
      if (dateMatch) {
        entities.dateRaw = dateMatch[0];
        // Parse and format date
        if (dateMatch[1]) {
          // If it's like "December 5th" or "5. decembar"
          const day = dateMatch[1];
          const month = message.toLowerCase().includes('dec') ? '12' : dateMatch[2] || '12';
          const year = dateMatch[3] || new Date().getFullYear().toString();
          entities.preferredDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        break;
      }
    }

    // Extract time
    const timePatterns = [
      /(\d{1,2})(?::(\d{2}))?\s*(am|pm|h)/i,
      /(\d{1,2})\s*(?:sati|sat|h)/i,
      /at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i
    ];

    for (const pattern of timePatterns) {
      const timeMatch = message.match(pattern);
      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const minute = timeMatch[2] || '00';
        const meridiem = timeMatch[3]?.toLowerCase();

        // Convert to 24h format
        if (meridiem === 'pm' && hour < 12) {
          hour += 12;
        } else if (meridiem === 'am' && hour === 12) {
          hour = 0;
        }

        entities.preferredTime = `${hour.toString().padStart(2, '0')}:${minute}`;
        break;
      }
    }

    // Extract service type
    const serviceMap: { [key: string]: string } = {
      'web development': 'web-development',
      'web dev': 'web-development',
      'website': 'web-development',
      'sajt': 'web-development',
      'mobile app': 'mobile-development',
      'mobile': 'mobile-development',
      'app development': 'mobile-development',
      'aplikacija': 'mobile-development',
      'marketing': 'digital-marketing',
      'seo': 'digital-marketing',
      'digital marketing': 'digital-marketing'
    };

    for (const [keyword, serviceId] of Object.entries(serviceMap)) {
      if (message.toLowerCase().includes(keyword)) {
        entities.service = serviceId;
        break;
      }
    }

    // Extract budget range
    const budgetRanges = [
      { keywords: ['small', 'mali', 'budžet', 'startup'], value: 'under-5k' },
      { keywords: ['medium', 'srednji', 'mid'], value: '5k-20k' },
      { keywords: ['large', 'veliki', 'enterprise'], value: '20k-50k' },
      { keywords: ['very large', 'jako veliki', 'unlimited'], value: 'over-50k' }
    ];

    for (const range of budgetRanges) {
      if (range.keywords.some(kw => message.toLowerCase().includes(kw))) {
        entities.budgetRange = range.value;
        break;
      }
    }

    // Extract timeline
    const timelineMap: { [key: string]: string } = {
      'urgent': 'asap',
      'hitno': 'asap',
      'as soon as possible': 'asap',
      'što pre': 'asap',
      '1-2 months': '1-2-months',
      '3-6 months': '3-6-months',
      'flexible': 'flexible',
      'fleksibilno': 'flexible'
    };

    for (const [keyword, timelineId] of Object.entries(timelineMap)) {
      if (message.toLowerCase().includes(keyword)) {
        entities.timeline = timelineId;
        break;
      }
    }
  }

  /**
   * Proverava da li su dovoljno informacija prikupljeno za booking/contact
   */
  private checkBookingReadiness(sessionData: any): { ready: boolean; missing: string[] } {
    const requiredFields = {
      booking: ['firstName', 'email', 'service'],
      contact: ['firstName', 'email', 'message']
    };

    const intent = sessionData.intent || 'booking';
    const required = requiredFields[intent] || requiredFields.booking;
    const missing = required.filter(field => !sessionData[field]);

    return {
      ready: missing.length === 0,
      missing
    };
  }
}

