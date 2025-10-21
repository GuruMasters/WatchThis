// Email configuration
export const EMAIL_CONFIG = {
  // EmailJS configuration
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_czqok4a', // ✅ Updated service ID
  
  // Template IDs - 2 SEPARATE TEMPLATES
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_kqooxjc', // ⚠️ ADMIN notification template (To: busines.watch.this@gmail.com - FIXED)
  CONFIRMATION_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_mp22w0v', // ✅ USER confirmation template (To: {{to_email}} - DYNAMIC)
  
  NEWSLETTER_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'template_newsletter_confirmation',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'XQBwyBlw250dxXyjd',

  // Consultation email (Admin)
  CONSULTATION_EMAIL: import.meta.env.VITE_CONSULTATION_EMAIL || 'busines.watch.this@gmail.com',

  // Fallback email (if env vars are not set)
  FALLBACK_EMAIL: 'busines.watch.this@gmail.com',
  
  // No-reply email
  NOREPLY_EMAIL: 'noreply@watchthis.com'
};

// Email template data structure
export interface EmailTemplateData {
  to_email: string;
  to_name: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  form_data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    budget: string;
    timeline: string;
    message: string;
    preferredDate: string;
    preferredTime: string;
  };
}

