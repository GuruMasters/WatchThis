import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.logger.log('Initializing email service...');
    this.logger.log('Email config:', {
      consultation: process.env.CONSULTATION_EMAIL || 'busines.watch.this@gmail.com'
    });
    this.logger.log('Using EmailJS for email delivery');
  }

  async sendConsultationEmail(consultationData: any) {
    try {
      this.logger.log('Consultation email should be sent via EmailJS from frontend');
      this.logger.log('Consultation data received:', JSON.stringify(consultationData, null, 2));
      
      return {
        success: true,
        message: 'Consultation email will be sent via EmailJS from frontend',
      };
    } catch (error) {
      this.logger.error('Failed to process consultation email:', error);
      throw new Error(`Failed to process consultation email: ${error.message}`);
    }
  }

  async sendConfirmationEmail(email: string, name: string) {
    try {
      this.logger.log('Confirmation email should be sent via EmailJS from frontend');
      this.logger.log(`Confirmation email for: ${name} (${email})`);

      return {
        success: true,
        message: 'Confirmation email will be sent via EmailJS from frontend',
      };
    } catch (error) {
      this.logger.error('Failed to process confirmation email:', error);
      throw new Error('Failed to process confirmation email');
    }
  }

  async subscribeNewsletter(email: string) {
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
    } catch (error) {
      this.logger.error('Failed to process newsletter subscription:', error);
      throw new Error(error.message || 'Failed to process newsletter subscription');
    }
  }

  async unsubscribeNewsletter(email: string) {
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
    } catch (error) {
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
    } catch (error) {
      this.logger.error('Failed to get newsletter stats:', error);
      throw new Error('Failed to get newsletter statistics');
    }
  }

  async sendContactMessage(contactData: any) {
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
    } catch (error) {
      this.logger.error('Failed to process contact message:', error);
      throw new Error(error.message || 'Failed to process contact message');
    }
  }

}
