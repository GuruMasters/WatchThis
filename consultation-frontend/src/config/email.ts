// Email configuration
export const EMAIL_CONFIG = {
  // EmailJS configuration
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_3892fcn',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_kqooxjc',
  NEWSLETTER_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'template_newsletter_confirmation',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'XQBwyBlw250dxXyjd',

  // Consultation email
  CONSULTATION_EMAIL: import.meta.env.VITE_CONSULTATION_EMAIL || 'busines.watch.this@gmail.com',

  // Fallback email (if env vars are not set)
  FALLBACK_EMAIL: 'busines.watch.this@gmail.com'
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

