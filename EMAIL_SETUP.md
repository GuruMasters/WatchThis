# Email Configuration Setup

## EmailJS Configuration

To enable email functionality for the consultation booking form, you need to set up EmailJS:

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down the **Service ID**

### 3. Create Email Templates
1. Go to "Email Templates"
2. Create a new template for consultation bookings
3. Use this template content:

```
Subject: New Consultation Booking - {{subject}}

Hello WatchThis Team,

You have received a new consultation booking request:

Personal Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{form_data.phone}}
- Company: {{form_data.company}}

Project Details:
- Service Interest: {{form_data.service}}
- Budget Range: {{form_data.budget}}
- Timeline: {{form_data.timeline}}
- Preferred Date: {{form_data.preferredDate}}
- Preferred Time: {{form_data.preferredTime}}

Project Description:
{{form_data.message}}

---
This email was sent from the WatchThis booking form.
```

4. Note down the **Template ID**

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### 5. Environment Variables
Create a `.env` file in the `consultation-frontend` directory:

```env
# Email Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_CONSULTATION_EMAIL=busines.watch.this@gmail.com
```

### 6. Email Address
The consultation emails will be sent to: **busines.watch.this@gmail.com**

## Testing
1. Fill out the booking form
2. Submit the form
3. Check the email inbox at busines.watch.this@gmail.com
4. Verify that both the consultation email and confirmation email are sent

## Fallback
If EmailJS fails, the system will automatically open a mailto link as a fallback.

## Security Notes
- Never commit the `.env` file to version control
- The email address is configured in environment variables for security
- EmailJS handles the email sending securely without exposing credentials

