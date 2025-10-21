import { AIService, AIResponse } from './ai.service';
declare class ConversationMessageDto {
    role: 'user' | 'ai';
    content: string;
}
declare class ChatRequestDto {
    message: string;
    language?: string;
    context?: string;
    conversationHistory?: ConversationMessageDto[];
}
export declare class AIController {
    private readonly aiService;
    private readonly logger;
    constructor(aiService: AIService);
    /**
     * POST /api/ai/chat
     * Generiše AI odgovor na korisničku poruku
     */
    chat(chatRequest: ChatRequestDto): Promise<{
        success: boolean;
        data: AIResponse;
    }>;
    /**
     * GET /api/ai/info
     * Vraća informacije o AI servisu
     */
    getServiceInfo(): {
        success: boolean;
        data: {
            configured: boolean;
            model: string;
            provider: string;
        };
    };
    /**
     * POST /api/ai/submit-booking
     * Submits a booking collected by AI
     */
    submitBooking(bookingData: any): Promise<{
        success: boolean;
        data: {
            message: string;
            bookingData: any;
        };
    }>;
    /**
     * GET /api/ai/health
     * Health check za AI servis
     */
    healthCheck(): Promise<{
        success: boolean;
        data: {
            status: string;
            api_configured: boolean;
        };
    }>;
}
export {};
