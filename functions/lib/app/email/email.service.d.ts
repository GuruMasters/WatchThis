export declare class EmailService {
    private readonly logger;
    constructor();
    sendConsultationEmail(consultationData: any): Promise<{
        success: boolean;
        message: string;
    }>;
    sendConfirmationEmail(email: string, name: string): Promise<{
        success: boolean;
        message: string;
    }>;
    subscribeNewsletter(email: string): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    unsubscribeNewsletter(email: string): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    getNewsletterStats(): Promise<{
        success: boolean;
        totalSubscribers: number;
        activeSubscribers: number;
        unsubscribed: number;
        subscriptionRate: string;
    } | {
        success: boolean;
        totalSubscribers: number;
        activeSubscribers: number;
        unsubscribed: number;
    }>;
    sendContactMessage(contactData: any): Promise<{
        success: boolean;
        message: string;
        contactId: string;
    }>;
}
