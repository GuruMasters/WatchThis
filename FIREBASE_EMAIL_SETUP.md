# Firebase Functions Email Setup

## Overview
This setup uses Firebase Cloud Functions to send emails instead of EmailJS. This provides better security and control over the email sending process.

## Prerequisites
1. Firebase project with Functions enabled
2. Gmail account with App Password enabled
3. Node.js 18+ installed

## Setup Instructions

### 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Cloud Functions in the project

### 2. Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for Gmail
4. Note down the 16-character app password

### 3. Environment Variables
Create a `.env` file in the `consultation-backend` directory:

```env
# Email Configuration
EMAIL_USER=busines.watch.this@gmail.com
EMAIL_PASS=your_16_character_app_password

# Firebase Configuration (if needed)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

### 4. Install Dependencies
```bash
cd consultation-backend
npm install
```

### 5. Deploy Functions
```bash
# Build and deploy
npm run deploy

# Or deploy specific functions
firebase deploy --only functions:sendConsultationEmail
firebase deploy --only functions:sendConfirmationEmail
```

### 6. Frontend Configuration
Update the frontend environment variables in `consultation-frontend/.env`:

```env
# Firebase Functions URL
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-your-project-id.cloudfunctions.net
```

### 7. Test Functions Locally
```bash
# Start emulator
npm run serve

# Functions will be available at:
# http://localhost:5001/your-project-id/us-central1/sendConsultationEmail
# http://localhost:5001/your-project-id/us-central1/sendConfirmationEmail
```

## Function Endpoints

### Send Consultation Email
- **URL**: `https://us-central1-your-project-id.cloudfunctions.net/sendConsultationEmail`
- **Method**: POST
- **Body**: Form data from booking form
- **Response**: `{ success: boolean, messageId: string }`

### Send Confirmation Email
- **URL**: `https://us-central1-your-project-id.cloudfunctions.net/sendConfirmationEmail`
- **Method**: POST
- **Body**: `{ firstName, lastName, email, service, preferredDate, preferredTime }`
- **Response**: `{ success: boolean, messageId: string }`

## Email Templates

### Consultation Email (to busines.watch.this@gmail.com)
- **Subject**: "New Consultation Booking - [Service]"
- **Content**: Formatted HTML email with all form data
- **Includes**: Personal info, project details, description

### Confirmation Email (to user)
- **Subject**: "Consultation Booking Confirmation"
- **Content**: Professional confirmation with next steps
- **Includes**: Booking summary, contact info, timeline

## Security Features
- ✅ Email credentials stored in environment variables
- ✅ Server-side email sending (no client-side exposure)
- ✅ CORS enabled for frontend requests
- ✅ Input validation and error handling
- ✅ Fallback to mailto link if function fails

## Monitoring
- View function logs in Firebase Console
- Monitor email delivery in Gmail
- Check function performance in Firebase Console

## Troubleshooting

### Common Issues
1. **App Password not working**: Ensure 2FA is enabled and app password is correct
2. **CORS errors**: Check that CORS is enabled in function configuration
3. **Function timeout**: Increase timeout in firebase.json if needed
4. **Email not delivered**: Check spam folder and Gmail settings

### Debug Commands
```bash
# View function logs
firebase functions:log

# Test function locally
curl -X POST http://localhost:5001/your-project-id/us-central1/sendConsultationEmail \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}'
```

## Cost Considerations
- Firebase Functions: Free tier includes 2M invocations/month
- Gmail SMTP: Free for personal use
- Total cost: $0 for typical usage

## Advantages over EmailJS
- ✅ No third-party service dependency
- ✅ Better security (server-side credentials)
- ✅ More control over email templates
- ✅ Better error handling and logging
- ✅ No monthly limits or costs
- ✅ Custom domain support

