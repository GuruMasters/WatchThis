// EmailJS email service
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';

class EmailService {
  private static instance: EmailService;
  
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  constructor() {
    // Initialize EmailJS with public key
    emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized with public key:', EMAIL_CONFIG.PUBLIC_KEY);
  }

  // Send consultation booking email via EmailJS (primary)
  async sendConsultationEmail(formData: any): Promise<boolean> {
    try {
      console.log('Sending consultation email via EmailJS...');
      console.log('Form data received:', formData);

      const emailData = {
        to_email: EMAIL_CONFIG.CONSULTATION_EMAIL,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        service: formData.service || 'Not specified',
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        preferred_date: formData.preferredDate || 'Not specified',
        preferred_time: formData.preferredTime || 'Not specified',
        message: formData.message || 'No description provided',
        project_description: formData.message || 'No description provided',
        reply_to: formData.email,
      };

      console.log('Email data being sent:', emailData);

      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        emailData,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('Consultation email sent successfully via EmailJS:', result);

      // Send confirmation email
      await this.sendConfirmationEmail(formData);

      return true;
    } catch (error) {
      console.error('Failed to send consultation email via EmailJS:', error);

      // Show user-friendly error message
      alert('Failed to send email. Please try again or contact us directly at ' + EMAIL_CONFIG.CONSULTATION_EMAIL);

      // Final fallback: try to send via mailto link
      this.sendFallbackEmail(formData);
      return false;
    }
  }

  // Send confirmation email to user (no-reply style)
  async sendConfirmationEmail(formData: any): Promise<boolean> {
    try {
      console.log('🔔 Sending confirmation email to user:', formData.email);
      console.log('📋 Full form data:', formData);
      
      // Template parameters for user confirmation
      const templateParams = {
        to_email: formData.email, // CRITICAL: User's email address
        to_name: `${formData.firstName} ${formData.lastName}`,
        from_name: 'WatchThis Team',
        from_email: EMAIL_CONFIG.NOREPLY_EMAIL,
        reply_to: EMAIL_CONFIG.CONSULTATION_EMAIL,
        
        // Booking details
        service: formData.service || 'General Consultation',
        preferred_date: formData.preferredDate || 'Not specified',
        preferred_time: formData.preferredTime || 'Not specified',
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        
        // Main message for confirmation
        message: `Thank you for scheduling a consultation with WatchThis!

We have received your request and will get back to you within 24 hours.

Your Booking Details:
━━━━━━━━━━━━━━━━━━
• Service: ${formData.service || 'General Consultation'}
• Date: ${formData.preferredDate || 'Not specified'}
• Time: ${formData.preferredTime || 'Not specified'}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}

Questions? Contact us at: ${EMAIL_CONFIG.CONSULTATION_EMAIL}

Best regards,
The WatchThis Team`,
        
        // Additional fields
        subject: 'Consultation Request Received - WatchThis',
        user_message: formData.message || 'No message provided'
      };

      console.log('📧 Confirmation email params:', {
        to: templateParams.to_email,
        from: templateParams.from_name,
        service: templateParams.service,
        date: templateParams.preferred_date
      });

      // Send using emailjs.send with explicit template params
      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.CONFIRMATION_TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('✅ Confirmation email sent successfully!', result);
      console.log(`✉️  Email should arrive at: ${formData.email}`);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send confirmation email!', error);
      console.error('Error status:', error?.status);
      console.error('Error text:', error?.text);
      // Don't block the main flow if confirmation email fails
      return false;
    }
  }

  // Send contact form message via EmailJS
  async sendContactFormEmail(formData: any): Promise<boolean> {
    try {
      console.log('Sending contact form email via EmailJS...');
      console.log('Contact form data received:', formData);

      const emailData = {
        to_email: EMAIL_CONFIG.CONSULTATION_EMAIL,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        reply_to: formData.email,
      };

      console.log('Contact email data being sent:', emailData);

      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        emailData,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('Contact email sent successfully via EmailJS:', result);

      // Send confirmation email to user
      await this.sendContactConfirmationEmail(formData);

      return true;
    } catch (error) {
      console.error('Failed to send contact email via EmailJS:', error);
      alert('Failed to send email. Please try again or contact us directly at ' + EMAIL_CONFIG.CONSULTATION_EMAIL);
      return false;
    }
  }

  // Send confirmation email for contact form
  async sendContactConfirmationEmail(formData: any): Promise<boolean> {
    try {
      console.log('🔔 Sending contact confirmation email to user:', formData.email);
      
      const emailData = {
        to_email: formData.email,
        to_name: `${formData.firstName} ${formData.lastName}`,
        from_name: 'WatchThis Team',
        from_email: 'noreply@watchthis.com',
        reply_to: EMAIL_CONFIG.CONSULTATION_EMAIL,
        
        subject: formData.subject || 'General Inquiry',
        message: `
Thank you for contacting WatchThis!

We have received your message and our team will respond within 24 hours.

Your Message:
${formData.message}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Our support team will review your message and get back to you shortly.

Questions? Contact us at: ${EMAIL_CONFIG.CONSULTATION_EMAIL}

Best regards,
The WatchThis Team
        `.trim(),
        
        phone: formData.phone || 'Not provided',
        user_message: formData.message
      };

      console.log('📧 Sending contact confirmation with data:', {
        to: emailData.to_email,
        name: emailData.to_name,
        subject: emailData.subject
      });

      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID, // Use same template
        emailData,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('✅ Contact confirmation email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('❌ Failed to send contact confirmation email:', error);
      console.error('Error details:', error);
      return false;
    }
  }

  // Send newsletter confirmation email
  async sendNewsletterConfirmationEmail(email: string): Promise<boolean> {
    try {
      console.log('Sending newsletter confirmation email via EmailJS...');

      const emailData = {
        to_email: email,
        to_name: email.split('@')[0], // Use part before @ as name
        company_name: 'WatchThis',
        subscription_date: new Date().toLocaleDateString(),
        unsubscribe_link: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`,
        website_url: window.location.origin,
        support_email: EMAIL_CONFIG.CONSULTATION_EMAIL
      };

      console.log('Newsletter confirmation email data:', emailData);

      // Use the same template for now, but you can create a separate newsletter confirmation template
      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID, // Using consultation template for now
        emailData,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('Newsletter confirmation email sent successfully via EmailJS:', result);
      return true;
    } catch (error) {
      console.error('Failed to send newsletter confirmation email via EmailJS:', error);
      return false;
    }
  }

  // Format email message for fallback
  private formatEmailMessage(formData: any): string {
    return `
New Consultation Booking Request

Personal Information:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}
- Company: ${formData.company || 'Not provided'}

Project Details:
- Service Interest: ${formData.service || 'Not specified'}
- Budget Range: ${formData.budget || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Preferred Date: ${formData.preferredDate || 'Not specified'}
- Preferred Time: ${formData.preferredTime || 'Not specified'}

Project Description:
${formData.message || 'No description provided'}

---
This email was sent from the WatchThis booking form.
    `.trim();
  }

  // Fallback email method - show contact info instead of opening mailto
  private sendFallbackEmail(formData: any): void {
    // Show user-friendly message with contact information
    alert(`Email service is temporarily unavailable. Please contact us directly at:\n\nEmail: ${EMAIL_CONFIG.CONSULTATION_EMAIL}\n\nWe will get back to you within 24 hours.`);
  }
}

export const emailService = EmailService.getInstance();