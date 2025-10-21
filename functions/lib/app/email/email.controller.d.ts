import { EmailService } from './email.service';
import { DocumentationService } from '../documentation/documentation.service';
export interface ConsultationRequest {
    name: string;
    email: string;
    phone: string;
    company: string;
    serviceInterest: string;
    budgetRange: string;
    timeline: string;
    preferredDate: string;
    preferredTime: string;
    projectDescription: string;
}
export declare class EmailController {
    private readonly emailService;
    private readonly documentationService;
    constructor(emailService: EmailService, documentationService: DocumentationService);
    sendConsultationEmail(consultationData: ConsultationRequest): Promise<{
        success: boolean;
        message: string;
    }>;
    sendConfirmationEmail(confirmationData: {
        email: string;
        name: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    subscribeNewsletter(subscriptionData: {
        email: string;
    }): Promise<{
        success: boolean;
        message: any;
        email: string;
    }>;
    unsubscribeNewsletter(unsubscribeData: {
        email: string;
    }): Promise<{
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
    sendContactMessage(contactData: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        subject?: string;
        message: string;
    }): Promise<{
        success: boolean;
        message: string;
        contactId: string;
    } | {
        success: boolean;
        message: any;
    }>;
    downloadResource(resourceId: string, res: any): Promise<any>;
}
