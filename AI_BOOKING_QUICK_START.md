# 🤖 AI Booking Assistant - Quick Start

## What Is This?

**AI Booking Assistant** automatski **prikuplja informacije** kroz razgovor i **šalje booking/contact forme** umesto korisnika! 🚀

---

## ✨ Ključne Funkcionalnosti

✅ **Automatska Entity Extraction**
- Ime, email, telefon, datum, vreme, usluga
- Podržava prirodan jezik (en/sr)

✅ **Inteligentna Detekcija Intent-a**
- Booking konsultacije
- Kontakt poruke
- Pitanja o uslugama

✅ **Automatsko Slanje Forme**
- Kada AI prikupi sve informacije, automatski šalje formu
- Korisnik NE popunjava ručno!

---

## 🚀 Test Primer

**Scenario 1: Sve Info Odjednom**
```
User: "Hi, I'm John Doe (john@example.com), I want to book web development 
       consultation for December 5th at 5 PM"

AI: "Excellent! I've collected all the information I need."
AI: ✅ Automatski šalje formu
AI: "✅ Your booking request has been submitted successfully! 
     📧 Confirmation sent to john@example.com"
```

**Scenario 2: Korak po Korak**
```
User: "Želim da zakažem konsultaciju"
AI: "Odlično! Možete li mi reći vaše ime?"

User: "Petar Petrović"
AI: "Koja je vaša email adresa?"

User: "petar@example.com"
AI: "Koja usluga vas zanima?"

User: "Razvoj mobilne aplikacije"
AI: "Kada vam odgovara?"

User: "5. decembar u 17h"
AI: ✅ Automatski šalje formu + potvrda
```

---

## 🛠️ Kako Radi?

### Backend (NestJS)

**1. Intent Detection & Entity Extraction** (`ai.service.ts`)
```typescript
analyzeIntent(message: string)
extractAdvancedEntities(message: string, entities: any)
```

**2. Session Management**
```typescript
private bookingSessionData: Map<string, any> = new Map();
```

**3. Auto-Submission Check**
```typescript
checkBookingReadiness(sessionData: any): { ready: boolean; missing: string[] }
```

### API Endpoints

**Chat:**
```http
POST /api/ai/chat
{
  "message": "I want to book a consultation",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "Great! I'd be happy to help...",
    "structuredData": {
      "intent": "booking",
      "readyToSubmit": true,
      "formData": { "firstName": "John", "email": "john@example.com", ... }
    }
  }
}
```

**Auto-Submit:**
```http
POST /api/ai/submit-booking
{
  "firstName": "John",
  "email": "john@example.com",
  "service": "web-development",
  "preferredDate": "2025-12-05",
  "preferredTime": "17:00"
}
```

### Frontend (React)

**Auto-Submission Logic:**
```typescript
if (result.data.structuredData?.readyToSubmit) {
  const formData = result.data.structuredData.formData;
  
  // Automatski submit
  const submitResponse = await fetch('/api/ai/submit-booking', {
    method: 'POST',
    body: JSON.stringify(formData)
  });

  // Prikaži potvrdu
  showConfirmationMessage(submitResponse.data.message);
}
```

---

## 🧪 Test Fraze

### Engleski
- "I want to book a consultation for December 5th"
- "My name is John Doe, email john@example.com"
- "I need web development services"

### Srpski
- "Želim da zakažem konsultaciju za 5. decembar"
- "Zovem se Petar Petrović, email petar@example.com"
- "Treba mi razvoj web sajta"

---

## 📝 Extracted Entities

| Entity | Example Input | Extracted Value |
|--------|---------------|-----------------|
| **Name** | "My name is John Doe" | `firstName: "John"`, `lastName: "Doe"` |
| **Email** | "john@example.com" | `email: "john@example.com"` |
| **Phone** | "+1 555 123 4567" | `phone: "+1 555 123 4567"` |
| **Date** | "December 5th" | `preferredDate: "2025-12-05"` |
| **Time** | "5 PM" | `preferredTime: "17:00"` |
| **Service** | "web development" | `service: "web-development"` |
| **Budget** | "small budget" | `budget: "under-5k"` |
| **Timeline** | "urgent" | `timeline: "asap"` |

---

## 🚀 Kako Testirati?

### 1. Start Backend
```bash
cd consultation-booking
yarn nx serve consultation-backend
```

### 2. Start Frontend
```bash
yarn nx serve consultation-frontend
```

### 3. Open Browser
```
http://localhost:5321/contact
```

### 4. Click "AI Assistant" i test!

**Try:**
```
"Hi, I'm John Doe (john@example.com), I want to book web development 
consultation for December 5th at 5 PM"
```

**Result:**
- AI automatski detektuje intent
- Ekstraktuje sve entitete
- Submituje formu
- Prikazuje potvrdu ✅

---

## 🎯 Prednosti

✅ **Zero Manual Work** - Korisnik ne popunjava forme
✅ **Natural Language** - Priča prirodno, ne unosi strukturirane podatke
✅ **Multi-Language** - English + Serbian
✅ **Intelligent** - Razume različite formate (5 PM, 17h, December 5th, 5. decembar)
✅ **Automatic** - Kad prikupi info, automatski šalje

---

## 📚 Full Documentation

Za detaljnu dokumentaciju, pogledaj:
- **`AI_BOOKING_ASSISTANT_GUIDE.md`** - Complete guide with all details

---

## 💡 Tips

1. **Try All-In-One Message**: Sve informacije u jednoj poruci
2. **Try Step-by-Step**: Razgovor korak po korak
3. **Try Serbian**: Testuj na srpskom jeziku
4. **Check Console**: `console.log` prikazuje kada AI submituje formu

---

## ✅ Status

✅ Backend AI Service - Intent Detection & Entity Extraction
✅ Backend Endpoint - AI-Assisted Booking Submission
✅ Frontend Integration - Auto-Submit Logic
✅ Multi-Language Support - English + Serbian
✅ Session Management - Conversation Memory
✅ Testing Scenarios - Comprehensive Test Cases

**Sve radi! 🎉**

---

## 🔥 Example Conversation

```
👤 User: "yes book it for december 5th"

🤖 AI: "Great! To help you better, could you please tell me your name?"

👤 User: "John Doe"

🤖 AI: "Perfect! What's your email address so I can send you the confirmation?"

👤 User: "john@example.com"

🤖 AI: "Which service are you interested in? We offer web development, mobile app development, and digital marketing."

👤 User: "web development"

🤖 AI: "Excellent! I've collected all the information I need."

🤖 AI: ✅ (Automatski šalje formu)

🤖 AI: "✅ Your booking request has been submitted successfully! We will contact you within 24 hours.
      📧 Confirmation has been sent to john@example.com"
```

**That's it! Magic! 🪄✨**

