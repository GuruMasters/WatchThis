export interface TranslationRequest {
    text: string;
    targetLanguage: string;
    sourceLanguage?: string;
}
export interface TranslationResponse {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    confidence?: number;
}
export interface LanguageDetectionResult {
    language: string;
    confidence: number;
}
export interface CacheStats {
    totalEntries: number;
    hitRate: number;
    missRate: number;
    size: string;
}
export declare class TranslationService {
    private readonly logger;
    private readonly geminiApiUrl;
    private readonly apiKey;
    private translationCache;
    private cacheHits;
    private cacheMisses;
    constructor();
    /**
     * Prevodi tekst na ciljni jezik
     */
    translateText(request: TranslationRequest): Promise<TranslationResponse>;
    /**
     * Prevodi više tekstova odjednom (batch)
     */
    translateBatch(texts: string[], targetLanguage: string, sourceLanguage?: string): Promise<TranslationResponse[]>;
    /**
     * Vraća listu podržanih jezika
     */
    getSupportedLanguages(): Promise<Array<{
        code: string;
        name: string;
    }>>;
    /**
     * Detektuje jezik teksta koristeći Gemini
     */
    detectLanguage(text: string): Promise<LanguageDetectionResult>;
    /**
     * Vraća statistiku keša
     */
    getCacheStats(): CacheStats;
    /**
     * Čisti keš prevoda
     */
    clearCache(): void;
    /**
     * Generiše cache key za prevod
     */
    private getCacheKey;
    /**
     * Fallback prevod kada API nije dostupan
     */
    private getFallbackTranslation;
    /**
     * Fallback detekcija jezika bazirana na karakterima
     */
    private detectLanguageFallback;
}
