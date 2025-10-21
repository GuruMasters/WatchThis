import { TranslationService } from '../translation/translation.service';
export interface AIRequest {
    message: string;
    language?: string;
    context?: string;
    conversationHistory?: Array<{
        role: 'user' | 'ai';
        content: string;
    }>;
}
export interface AIResponse {
    response: string;
    language: string;
    originalResponse?: string;
    context?: string;
}
export declare class AIService {
    private readonly translationService;
    private readonly logger;
    private readonly geminiApiUrl;
    private readonly apiKey;
    private readonly systemPrompt;
    constructor(translationService: TranslationService);
    /**
     * Generiše AI odgovor na korisničku poruku sa conversation memory
     */
    generateResponse(request: AIRequest): Promise<AIResponse>;
    /**
     * Poziva Google Gemini API za generisanje AI odgovora sa conversation memory
     */
    private getAIResponse;
    /**
     * Čisti AI odgovor od nepotrebnih prefiksa i suffiksa
     */
    private cleanAIResponse;
    /**
     * AnaliziraIntent (nameru) korisnika pomoću NLP tehnike
     */
    private analyzeIntent;
    /**
     * Generiše kontekstualni odgovor baziran na intent analizi
     */
    private generateContextualResponse;
    /**
     * Vraća fallback odgovore bazirane na kontekstu poruke
     */
    private getFallbackResponse;
    /**
     * Vraća informacije o konfiguraciji AI servisa
     */
    getServiceInfo(): {
        configured: boolean;
        model: string;
        provider: string;
    };
    /**
     * Health check za AI servis
     */
    healthCheck(): Promise<{
        status: string;
        api_configured: boolean;
    }>;
}
