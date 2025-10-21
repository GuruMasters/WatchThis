"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const admin = __importStar(require("firebase-admin"));
let EmailService = EmailService_1 = class EmailService {
    constructor() {
        this.logger = new common_1.Logger(EmailService_1.name);
        this.logger.log('Initializing email service...');
        this.logger.log('Email config:', {
            consultation: process.env.CONSULTATION_EMAIL || 'busines.watch.this@gmail.com'
        });
        this.logger.log('Using EmailJS for email delivery');
    }
    async sendConsultationEmail(consultationData) {
        try {
            this.logger.log('Consultation email should be sent via EmailJS from frontend');
            this.logger.log('Consultation data received:', JSON.stringify(consultationData, null, 2));
            return {
                success: true,
                message: 'Consultation email will be sent via EmailJS from frontend',
            };
        }
        catch (error) {
            this.logger.error('Failed to process consultation email:', error);
            throw new Error(`Failed to process consultation email: ${error.message}`);
        }
    }
    async sendConfirmationEmail(email, name) {
        try {
            this.logger.log('Confirmation email should be sent via EmailJS from frontend');
            this.logger.log(`Confirmation email for: ${name} (${email})`);
            return {
                success: true,
                message: 'Confirmation email will be sent via EmailJS from frontend',
            };
        }
        catch (error) {
            this.logger.error('Failed to process confirmation email:', error);
            throw new Error('Failed to process confirmation email');
        }
    }
    async subscribeNewsletter(email) {
        try {
            this.logger.log('Newsletter subscription request received');
            this.logger.log(`Newsletter subscription for: ${email}`);
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }
            // Check if Firebase is initialized
            if (!admin.apps.length) {
                this.logger.warn('Firebase not initialized, using mock subscription');
                return {
                    success: true,
                    message: 'Successfully subscribed to newsletter (mock)',
                    email: email
                };
            }
            const db = admin.firestore();
            // Check if email is already subscribed
            const newsletterRef = db.collection('newsletter_subscribers');
            const existingSubscriber = await newsletterRef.where('email', '==', email.toLowerCase()).get();
            if (!existingSubscriber.empty) {
                return {
                    success: false,
                    message: 'Email is already subscribed to newsletter',
                    email: email
                };
            }
            // Add new subscriber
            const newSubscriber = {
                email: email.toLowerCase(),
                subscribedAt: new Date(),
                status: 'active',
                source: 'website'
            };
            await newsletterRef.add(newSubscriber);
            this.logger.log(`New newsletter subscriber added: ${email}`);
            // Note: Confirmation email will be sent from frontend via EmailJS
            // This is handled in the frontend newsletter subscription flow
            return {
                success: true,
                message: 'Successfully subscribed to newsletter',
                email: email
            };
        }
        catch (error) {
            this.logger.error('Failed to process newsletter subscription:', error);
            throw new Error(error.message || 'Failed to process newsletter subscription');
        }
    }
    async unsubscribeNewsletter(email) {
        try {
            this.logger.log('Newsletter unsubscription request received');
            this.logger.log(`Newsletter unsubscription for: ${email}`);
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }
            // Check if Firebase is initialized
            if (!admin.apps.length) {
                this.logger.warn('Firebase not initialized, using mock unsubscription');
                return {
                    success: true,
                    message: 'Successfully unsubscribed from newsletter (mock)',
                    email: email
                };
            }
            const db = admin.firestore();
            // Find and update subscriber status
            const newsletterRef = db.collection('newsletter_subscribers');
            const subscriberQuery = await newsletterRef.where('email', '==', email.toLowerCase()).get();
            if (subscriberQuery.empty) {
                return {
                    success: false,
                    message: 'Email not found in newsletter subscribers',
                    email: email
                };
            }
            // Update subscriber status to inactive
            const subscriberDoc = subscriberQuery.docs[0];
            await subscriberDoc.ref.update({
                status: 'unsubscribed',
                unsubscribedAt: new Date()
            });
            this.logger.log(`Newsletter subscriber unsubscribed: ${email}`);
            return {
                success: true,
                message: 'Successfully unsubscribed from newsletter',
                email: email
            };
        }
        catch (error) {
            this.logger.error('Failed to process newsletter unsubscription:', error);
            throw new Error(error.message || 'Failed to process newsletter unsubscription');
        }
    }
    async getNewsletterStats() {
        try {
            this.logger.log('Newsletter stats request received');
            // Check if Firebase is initialized
            if (!admin.apps.length) {
                this.logger.warn('Firebase not initialized, returning mock stats');
                return {
                    success: true,
                    totalSubscribers: 0,
                    activeSubscribers: 0,
                    unsubscribed: 0
                };
            }
            const db = admin.firestore();
            const newsletterRef = db.collection('newsletter_subscribers');
            // Get total subscribers
            const totalSnapshot = await newsletterRef.get();
            const totalSubscribers = totalSnapshot.size;
            // Get active subscribers
            const activeSnapshot = await newsletterRef.where('status', '==', 'active').get();
            const activeSubscribers = activeSnapshot.size;
            // Get unsubscribed
            const unsubscribedSnapshot = await newsletterRef.where('status', '==', 'unsubscribed').get();
            const unsubscribed = unsubscribedSnapshot.size;
            const stats = {
                success: true,
                totalSubscribers,
                activeSubscribers,
                unsubscribed,
                subscriptionRate: totalSubscribers > 0 ? (activeSubscribers / totalSubscribers * 100).toFixed(1) : '0.0'
            };
            this.logger.log('Newsletter stats retrieved:', stats);
            return stats;
        }
        catch (error) {
            this.logger.error('Failed to get newsletter stats:', error);
            throw new Error('Failed to get newsletter statistics');
        }
    }
    async sendContactMessage(contactData) {
        try {
            this.logger.log('Contact message request received');
            this.logger.log('Contact data:', JSON.stringify(contactData, null, 2));
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactData.email)) {
                throw new Error('Invalid email format');
            }
            // Check if Firebase is initialized
            if (!admin.apps.length) {
                this.logger.warn('Firebase not initialized, using mock contact message');
                return {
                    success: true,
                    message: 'Contact message received (mock mode). Email will be sent via EmailJS from frontend.',
                    contactId: 'mock-' + Date.now()
                };
            }
            const db = admin.firestore();
            // Save contact message to Firestore
            const contactMessage = {
                firstName: contactData.firstName,
                lastName: contactData.lastName,
                email: contactData.email.toLowerCase(),
                phone: contactData.phone || '',
                subject: contactData.subject || 'General Inquiry',
                message: contactData.message,
                status: 'new',
                createdAt: new Date(),
                source: 'website-contact-form'
            };
            const contactRef = await db.collection('contact_messages').add(contactMessage);
            this.logger.log(`New contact message saved with ID: ${contactRef.id}`);
            // Note: Email will be sent from frontend via EmailJS
            // This backend endpoint is for saving the message to the database
            return {
                success: true,
                message: 'Contact message received successfully. We will respond shortly.',
                contactId: contactRef.id
            };
        }
        catch (error) {
            this.logger.error('Failed to process contact message:', error);
            throw new Error(error.message || 'Failed to process contact message');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map