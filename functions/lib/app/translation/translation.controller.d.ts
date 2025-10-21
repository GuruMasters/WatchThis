import { TranslationService, TranslationResponse } from './translation.service';
declare class TranslateDto {
    text: string;
    targetLanguage: string;
    sourceLanguage?: string;
}
declare class TranslateBatchDto {
    texts: string[];
    targetLanguage: string;
    sourceLanguage?: string;
}
declare class DetectLanguageDto {
    text: string;
}
export declare class TranslationController {
    private readonly translationService;
    private readonly logger;
    constructor(translationService: TranslationService);
    /**
     * POST /api/translation/translate
     * Prevodi tekst na ciljni jezik
     */
    translate(translateDto: TranslateDto): Promise<{
        success: boolean;
        data: TranslationResponse;
    }>;
    /**
     * POST /api/translation/batch
     * Prevodi više tekstova odjednom
     */
    translateBatch(batchDto: TranslateBatchDto): Promise<{
        success: boolean;
        data: TranslationResponse[];
        count: number;
    }>;
    /**
     * GET /api/translation/languages
     * Vraća listu podržanih jezika
     */
    getSupportedLanguages(): Promise<{
        success: boolean;
        data: {
            code: string;
            name: string;
        }[];
        count: number;
    }>;
    /**
     * POST /api/translation/detect
     * Detektuje jezik teksta
     */
    detectLanguage(detectDto: DetectLanguageDto): Promise<{
        success: boolean;
        data: import("./translation.service").LanguageDetectionResult;
    }>;
    /**
     * GET /api/translation/cache/stats
     * Vraća statistiku keša
     */
    getCacheStats(): {
        success: boolean;
        data: import("./translation.service").CacheStats;
    };
    /**
     * DELETE /api/translation/cache
     * Čisti keš prevoda
     */
    clearCache(): {
        success: boolean;
        message: string;
    };
    /**
     * GET /api/translation/health
     * Provera zdravlja servisa
     */
    healthCheck(): {
        success: boolean;
        service: string;
        status: string;
        timestamp: string;
    };
}
export {};
