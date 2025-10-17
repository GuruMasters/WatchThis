# AI Assistant Setup Guide

## Overview
The Contact page includes an AI assistant that can respond to user questions in multiple languages. The AI uses:
- **Hugging Face's free inference API** for natural language processing (AI responses)
- **Backend Translation Service** (NestJS) for secure, cached, multi-language translation
- **LibreTranslate API** as the underlying translation engine (via backend)

## Features
- **Multi-language support**: English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese
- **Context-aware responses**: AI understands questions about services, pricing, and contact information
- **Fallback responses**: If API fails, provides helpful fallback answers
- **Real-time typing indicator**: Shows when AI is "thinking"
- **Responsive design**: Works on all device sizes

## Setup Instructions

### 1. Get Hugging Face API Key (Free)
1. Go to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Sign up/Login to Hugging Face
3. Click "New token"
4. Give it a name (e.g., "WatchThis AI Assistant")
5. Copy the generated token (starts with `hf_`)

### 2. Add API Key to Environment Variables
Add this line to your `.env` file in the root of the project:

```env
REACT_APP_HUGGINGFACE_API_KEY=hf_your_token_here
```

Replace `hf_your_token_here` with your actual token.

### 3. Pokreni Backend i Frontend

**Backend (NestJS):**
```bash
cd consultation-booking/consultation-backend
yarn install  # Samo prvi put
yarn start
```
Backend će biti dostupan na `http://localhost:3088`

**Frontend (React):**
```bash
cd consultation-booking/consultation-frontend
yarn install  # Samo prvi put
yarn dev
```
Frontend će biti dostupan na `http://localhost:5321`

**Napomena**: Backend MORA biti pokrenut da bi AI asistent i prevođenje radili!

### 4. API Limits and Costs
- **Hugging Face API**:
  - **Free tier**: 30,000 tokens per month
  - **Rate limits**: 100 requests per minute
  - **Model**: Microsoft DialoGPT-medium (conversational AI)

- **LibreTranslate API**:
  - **Free tier**: Unlimited (public instance)
  - **Rate limits**: Varies by server load
  - **Service**: Open-source translation API

- **Total Cost**: Completely free for basic usage

### 4. Supported Languages
The AI can respond in **50+ languages** thanks to LibreTranslate API integration:

**Popular Languages:**
- English (en) - Primary language
- Spanish (es) - Español
- French (fr) - Français
- German (de) - Deutsch
- Italian (it) - Italiano
- Portuguese (pt) - Português
- Russian (ru) - Русский
- Japanese (ja) - 日本語
- Korean (ko) - 한국어
- Chinese (zh) - 中文

**Additional Languages:** Arabic, Hindi, Dutch, Swedish, Norwegian, Danish, Finnish, Polish, Czech, Turkish, Thai, Vietnamese, Indonesian, Malay, Filipino, Hebrew, Greek, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Slovak, Ukrainian, Latvian, Lithuanian, Estonian, and many more.

*Note: Translation quality may vary for less common languages*

### 5. Fallback System
If the AI API fails or is unavailable, the system provides intelligent fallback responses in **multiple languages** based on:
- **Service questions**: Information about web development, marketing, consulting
- **Pricing questions**: Information about pricing structure
- **Contact questions**: Contact information and next steps
- **Translation failures**: Falls back to English with static translations for common phrases

### 6. Customization Options

#### Add More Languages
The system automatically supports **50+ languages** through LibreTranslate API. No manual translation mapping needed!

#### Change Translation Service
To use a different translation service, update the API endpoint in `/libs/consultation/frontend/pages/contact/contact-page.tsx`:

```typescript
// Example: Use Google Translate API instead
const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GOOGLE_TRANSLATE_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    q: text,
    target: targetLang,
    source: 'en',
    key: process.env.GOOGLE_TRANSLATE_API_KEY
  })
});
```

#### Change AI Model
To use a different model, update the API endpoint:

```typescript
const response = await fetch('https://api-inference.huggingface.co/models/YOUR_MODEL_NAME', {
```

#### Add More Fallback Responses
Add more intelligent responses in the `handleSendMessage` function:

```typescript
if (lowerMessage.includes('your_keyword')) {
  fallbackResponse = "Your custom response";
}
```

## Troubleshooting

### Common Issues

**Hugging Face API Issues:**
1. **"API Error: 429"** - Too many requests. Wait a minute or upgrade to paid tier.
2. **"API Error: 401"** - Invalid API key. Check your token.
3. **"API Error: 503"** - Model is loading. Try again in a few seconds.

**LibreTranslate API Issues:**
1. **"Translation failed"** - Server overload. Falls back to English automatically.
2. **"Network Error"** - Connection issues. Check internet and try again.
3. **"Rate Limited"** - Too many requests. Wait a moment before retrying.

**General Issues:**
- **No response** - Check browser console for detailed error logs.
- **Slow responses** - Normal for free APIs, responses usually take 1-3 seconds.

### Debugging
Check the browser console for detailed error messages. The system logs all API calls and responses.

### Testing
1. Open the Contact page
2. Click "AI Assistant" button
3. Ask questions like:
   - "What services do you offer?"
   - "How much does it cost?"
   - "How can I contact you?"

## Performance
- **Response time**: Usually 1-3 seconds
- **API calls**: 1 per message
- **Data usage**: ~1KB per request/response
- **Caching**: No caching (real-time responses)

## Security Notes
- API key is stored in environment variables (not in code)
- All conversations are client-side only
- No personal data is stored or transmitted
- Rate limiting prevents abuse

## Future Enhancements
- Add conversation memory/context
- Integrate with OpenAI GPT models
- Add voice responses
- Implement conversation analytics
