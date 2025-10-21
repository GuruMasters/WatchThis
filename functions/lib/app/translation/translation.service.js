"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TranslationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationService = void 0;
const common_1 = require("@nestjs/common");
let TranslationService = TranslationService_1 = class TranslationService {
    constructor() {
        this.logger = new common_1.Logger(TranslationService_1.name);
        this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
        // In-memory cache za prevode
        this.translationCache = new Map();
        this.cacheHits = 0;
        this.cacheMisses = 0;
        // Koristi isti Gemini API key kao i AI servis - BESPLATNO!
        this.apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || '';
        if (!this.apiKey) {
            this.logger.warn('GEMINI_API_KEY not set in environment variables. Translation service will use fallbacks only.');
        }
        else {
            this.logger.log('✅ Translation Service using Gemini API (FREE!)');
        }
    }
    /**
     * Prevodi tekst na ciljni jezik
     */
    async translateText(request) {
        var _a, _b, _c, _d, _e, _f;
        const { text, targetLanguage, sourceLanguage = 'auto' } = request;
        // Provera keša
        const cacheKey = this.getCacheKey(text, targetLanguage, sourceLanguage);
        const cached = this.translationCache.get(cacheKey);
        if (cached) {
            this.cacheHits++;
            this.logger.debug(`Cache hit for: ${text.substring(0, 30)}...`);
            return cached;
        }
        this.cacheMisses++;
        try {
            if (!this.apiKey) {
                // Fallback - vrati originalni tekst
                return this.getFallbackTranslation(text, sourceLanguage || 'auto', targetLanguage);
            }
            // Gemini translation prompt
            const translationPrompt = `Translate the following text from ${sourceLanguage === 'auto' ? 'detected language' : sourceLanguage} to ${targetLanguage}. 
      
IMPORTANT: 
- Return ONLY the translated text, nothing else
- No explanations, no notes, no extra text
- Just the pure translation

Text to translate:
${text}`;
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: translationPrompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.3, // Lower temperature for more accurate translations
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1000,
                }
            };
            const response = await fetch(`${this.geminiApiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Gemini Translation API error: ${response.status} - ${errorText}`);
                return this.getFallbackTranslation(text, sourceLanguage || 'auto', targetLanguage);
            }
            const data = await response.json();
            if (data.error) {
                this.logger.error(`Translation API error: ${data.error.message}`);
                return this.getFallbackTranslation(text, sourceLanguage || 'auto', targetLanguage);
            }
            const translatedText = ((_f = (_e = (_d = (_c = (_b = (_a = data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.trim()) || text;
            const detectedSourceLanguage = sourceLanguage || 'auto';
            const result = {
                translatedText,
                sourceLanguage: detectedSourceLanguage,
                targetLanguage,
                confidence: 0.95
            };
            // Sačuvaj u keš
            this.translationCache.set(cacheKey, result);
            return result;
        }
        catch (error) {
            this.logger.error(`Translation failed: ${error.message}`);
            return this.getFallbackTranslation(text, sourceLanguage || 'auto', targetLanguage);
        }
    }
    /**
     * Prevodi više tekstova odjednom (batch)
     */
    async translateBatch(texts, targetLanguage, sourceLanguage = 'auto') {
        this.logger.log(`Batch translating ${texts.length} texts to ${targetLanguage}`);
        // Paralelno prevodi sve tekstove
        const promises = texts.map(text => this.translateText({ text, targetLanguage, sourceLanguage }));
        return Promise.all(promises);
    }
    /**
     * Vraća listu podržanih jezika
     */
    async getSupportedLanguages() {
        // Najčešći jezici koje podržava Google Translate
        return [
            { code: 'en', name: 'English' },
            { code: 'sr', name: 'Serbian' },
            { code: 'es', name: 'Spanish' },
            { code: 'fr', name: 'French' },
            { code: 'de', name: 'German' },
            { code: 'it', name: 'Italian' },
            { code: 'pt', name: 'Portuguese' },
            { code: 'ru', name: 'Russian' },
            { code: 'zh', name: 'Chinese' },
            { code: 'ja', name: 'Japanese' },
            { code: 'ko', name: 'Korean' },
            { code: 'ar', name: 'Arabic' },
            { code: 'hi', name: 'Hindi' },
            { code: 'tr', name: 'Turkish' },
            { code: 'pl', name: 'Polish' },
            { code: 'nl', name: 'Dutch' },
            { code: 'sv', name: 'Swedish' },
            { code: 'no', name: 'Norwegian' },
            { code: 'da', name: 'Danish' },
            { code: 'fi', name: 'Finnish' }
        ];
    }
    /**
     * Detektuje jezik teksta koristeći Gemini
     */
    async detectLanguage(text) {
        var _a, _b, _c, _d, _e, _f;
        try {
            if (!this.apiKey) {
                return this.detectLanguageFallback(text);
            }
            const detectionPrompt = `Detect the language of the following text. Respond with ONLY the two-letter language code (e.g., "en" for English, "sr" for Serbian, "es" for Spanish).

Text: ${text}`;
            const requestBody = {
                contents: [
                    {
                        parts: [{ text: detectionPrompt }]
                    }
                ],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 10,
                }
            };
            const response = await fetch(`${this.geminiApiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                return this.detectLanguageFallback(text);
            }
            const data = await response.json();
            const detectedLang = ((_f = (_e = (_d = (_c = (_b = (_a = data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.trim().toLowerCase()) || 'en';
            return {
                language: detectedLang.substring(0, 2), // Ensure 2-letter code
                confidence: 0.9
            };
        }
        catch (error) {
            this.logger.error(`Language detection failed: ${error.message}`);
            return this.detectLanguageFallback(text);
        }
    }
    /**
     * Vraća statistiku keša
     */
    getCacheStats() {
        const totalRequests = this.cacheHits + this.cacheMisses;
        const hitRate = totalRequests > 0 ? this.cacheHits / totalRequests : 0;
        const missRate = totalRequests > 0 ? this.cacheMisses / totalRequests : 0;
        // Procena veličine keša u memoriji
        const cacheSize = this.translationCache.size;
        const estimatedSizeKB = Math.round(cacheSize * 0.5); // Procena ~ 0.5KB po entry-ju
        return {
            totalEntries: cacheSize,
            hitRate: Math.round(hitRate * 100) / 100,
            missRate: Math.round(missRate * 100) / 100,
            size: `${estimatedSizeKB} KB`
        };
    }
    /**
     * Čisti keš prevoda
     */
    clearCache() {
        this.translationCache.clear();
        this.cacheHits = 0;
        this.cacheMisses = 0;
        this.logger.log('Translation cache cleared');
    }
    /**
     * Generiše cache key za prevod
     */
    getCacheKey(text, targetLanguage, sourceLanguage) {
        return `${sourceLanguage}:${targetLanguage}:${text.substring(0, 100)}`;
    }
    /**
     * Fallback prevod kada API nije dostupan
     */
    getFallbackTranslation(text, sourceLanguage, targetLanguage) {
        this.logger.warn(`Using fallback translation for: ${text.substring(0, 30)}...`);
        // Jednostavni fallback - vraća originalni tekst
        return {
            translatedText: text,
            sourceLanguage,
            targetLanguage,
            confidence: 0.1
        };
    }
    /**
     * Fallback detekcija jezika bazirana na karakterima
     */
    detectLanguageFallback(text) {
        // Jednostavna heuristika bazirana na karakterima
        const lowerText = text.toLowerCase();
        // Ćirilica = Srpski/Ruski
        if (/[а-яА-Я]/.test(text)) {
            return { language: 'sr', confidence: 0.7 };
        }
        // Latinica sa dijakriticima = može biti srpski
        if (/[čćžšđČĆŽŠĐ]/.test(text)) {
            return { language: 'sr', confidence: 0.6 };
        }
        // Kinesko pismo
        if (/[\u4e00-\u9fa5]/.test(text)) {
            return { language: 'zh', confidence: 0.8 };
        }
        // Japansko pismo
        if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
            return { language: 'ja', confidence: 0.8 };
        }
        // Korejsko pismo
        if (/[\uac00-\ud7af]/.test(text)) {
            return { language: 'ko', confidence: 0.8 };
        }
        // Arapski
        if (/[\u0600-\u06ff]/.test(text)) {
            return { language: 'ar', confidence: 0.8 };
        }
        // Default: Engleski
        return { language: 'en', confidence: 0.5 };
    }
};
exports.TranslationService = TranslationService;
exports.TranslationService = TranslationService = TranslationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TranslationService);
//# sourceMappingURL=translation.service.js.map