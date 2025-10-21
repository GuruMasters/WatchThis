# AI Backend Service - Dokumentacija

## Pregled

Backend servis za AI asistenta je implementiran kao NestJS modul koji integriše Hugging Face API za AI odgovore i Translation servis za multi-jezičku podršku.

## Arhitektura

### Struktura Modula
```
consultation-backend/src/ai/
├── ai.module.ts         # NestJS modul
├── ai.controller.ts     # REST API kontroler
└── ai.service.ts        # Business logika i AI integracija
```

### Tok Podataka

```
Frontend → Backend AI Service → Translation Service
                ↓
         Hugging Face API
                ↓
         Translation Service → Frontend
```

## Glavne Karakteristike

1. **AI Integracija** - Hugging Face DialoGPT-medium model
2. **Multi-jezička Podrška** - Automatski prevod poruka i odgovora
3. **Fallback Sistem** - Inteligentni odgovori kada AI nije dostupan
4. **Centralizacija** - Sva AI logika na backend-u
5. **Sigurnost** - API ključevi ostaju na serveru

## API Endpoints

### 1. AI Chat
**POST** `/api/ai/chat`

Generiše AI odgovor na korisničku poruku sa automatskim prevođenjem.

**Request Body:**
```json
{
  "message": "Hello, how can you help me?",
  "language": "sr",
  "context": "optional context string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "Здраво! Како могу да вам помогнем данас?",
    "language": "sr",
    "originalResponse": "Hello! How can I help you today?",
    "context": "optional"
  }
}
```

### 2. Service Info
**GET** `/api/ai/info`

Vraća informacije o konfiguraciji AI servisa.

**Response:**
```json
{
  "success": true,
  "data": {
    "configured": true,
    "model": "microsoft/DialoGPT-medium",
    "provider": "Hugging Face"
  }
}
```

### 3. Health Check
**GET** `/api/ai/health`

Provera zdravlja AI servisa.

**Response:**
```json
{
  "success": true,
  "service": "ai",
  "status": "operational",
  "api_configured": true,
  "timestamp": "2025-10-15T12:00:00.000Z"
}
```

## Setup

### 1. Instalacija

Backend je već konfigurisan, samo trebaš dodati API ključ.

### 2. Dobijanje Hugging Face API Ključa

1. Idi na https://huggingface.co/settings/tokens
2. Registruj se / Uloguj se
3. Klikni "New token"
4. Ime tokena: "WatchThis AI"
5. Tip: "Read"
6. Kopiraj token (počinje sa `hf_`)

### 3. Konfiguracija Environment Varijabli

Kreiraj `.env` fajl u `consultation-backend` folderu:

```bash
# consultation-backend/.env
HUGGINGFACE_API_KEY=hf_your_actual_token_here
PORT=3088
```

### 4. Pokretanje Servisa

```bash
cd consultation-booking/consultation-backend
yarn start
```

Backend će biti dostupan na `http://localhost:3088`

## Kako Radi

### 1. Prijem Poruke

Frontend šalje korisničku poruku sa jezikom:
```typescript
POST /api/ai/chat
{
  "message": "Koje usluge nudite?",
  "language": "sr"
}
```

### 2. Prevođenje na Engleski (ako je potrebno)

AI servis koristi Translation servis da prevede poruku na engleski:
```
"Koje usluge nudite?" → "What services do you offer?"
```

### 3. AI Generisanje Odgovora

Poziva se Hugging Face API sa prevedenom porukom:
```
Input: "What services do you offer?"
Output: "We offer web development, mobile app development, and digital marketing services..."
```

### 4. Prevođenje Odgovora

AI odgovor se prevodi nazad na željeni jezik:
```
"We offer web development..." → "Nudimo razvoj web aplikacija..."
```

### 5. Vraćanje Odgovora

Frontend dobija preveden odgovor:
```json
{
  "success": true,
  "data": {
    "response": "Nudimo razvoj web aplikacija, mobilnih aplikacija i usluge digitalnog marketinga...",
    "language": "sr"
  }
}
```

## Fallback Sistem

Ako Hugging Face API nije dostupan ili postoji greška, servis koristi **inteligentne fallback odgovore**:

### Prepoznavanje Konteksta

```typescript
// Poruke o uslugama
"service", "what do you do", "uslug" 
→ "We offer web development, mobile app development..."

// Poruke o cenama
"price", "cost", "cena", "cen"
→ "Our pricing is customized based on your project..."

// Poruke o kontaktu
"contact", "email", "phone", "kontakt"
→ "You can reach us at busines.watch.this@gmail.com..."

// Pozdrav
"hello", "hi", "zdravo", "cao"
→ "Hello! Welcome to WatchThis..."

// Zahvalnice
"thank", "hvala"
→ "You're welcome! If you have any other questions..."

// Default
→ "I'd be happy to help you with that..."
```

### Fallback Prevođenje

Svi fallback odgovori se takođe prevode preko Translation servisa:
```
English fallback → Translation Service → User's language
```

## Integracija sa Frontend-om

### React/TypeScript Primer

```typescript
const handleSendMessage = async (message: string, language: string) => {
  try {
    const response = await fetch('http://localhost:3088/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('AI response:', result.data.response);
      return result.data.response;
    }
  } catch (error) {
    console.error('AI chat error:', error);
    return "I'm sorry, I'm having trouble connecting right now.";
  }
};
```

## Prednosti Ovog Pristupa

### 1. Sigurnost
- API ključevi ostaju na backend-u
- Nema izlaganja kredencijala na frontendu
- Centralizovana kontrola pristupa

### 2. Multi-jezička Podrška
- Automatsko prevođenje poruka i odgovora
- Podrška za 50+ jezika preko Translation servisa
- Transparentna integracija - frontend samo šalje jezik

### 3. Pouzdanost
- Inteligentni fallback sistem
- Kontekstualni odgovori kada AI nije dostupan
- Graceful degradation

### 4. Performanse
- Translation service koristi keš
- Optimizovani API pozivi
- Brži odgovori za česte fraze

### 5. Održavanje
- Jedna tačka za sve AI izmene
- Lako testiranje i debugging
- Jednostavno dodavanje novih featrova

## Logovanje

Servis loguje sve važne događaje:

```
[AIService] AI request: "Hello, how can you help me?..." in language: sr
[AIService] AI response generated successfully for language: sr
[AIService] Fallback translation failed, returning English
[AIController] AI chat request: "What services do you offer..." in language: en
```

## Testiranje

### 1. cURL Test (Engleski)

```bash
curl -X POST http://localhost:3088/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, what services do you offer?",
    "language": "en"
  }'
```

### 2. cURL Test (Srpski)

```bash
curl -X POST http://localhost:3088/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Koje usluge nudite?",
    "language": "sr"
  }'
```

### 3. Health Check

```bash
curl http://localhost:3088/api/ai/health
```

### 4. Service Info

```bash
curl http://localhost:3088/api/ai/info
```

## Hugging Face API Limiti

### Free Tier
- **Tokeni**: 30,000 tokena mesečno
- **Rate limit**: ~100 zahteva po minuti
- **Model**: DialoGPT-medium (117M parametara)
- **Cena**: Potpuno besplatno

### Paid Tier (opciono)
- **Pro Plan**: $9/mesec
- **Tokeni**: Više tokena, brži odgovori
- **Priority**: Brže učitavanje modela

### Optimizacije

1. **Kraći Promptovi** - Koristi kraće poruke
2. **Keš** - Translation servis već keširuje prevode
3. **Rate Limiting** - Implementiraj na backend-u ako je potrebno
4. **Fallback** - Uvek koristi fallback za česte upite

## Troubleshooting

### Česte Greške

**1. "HUGGINGFACE_API_KEY not set"**
- **Uzrok**: API ključ nije postavljen u `.env` fajlu
- **Rešenje**: Dodaj `HUGGINGFACE_API_KEY=hf_...` u `.env`

**2. "AI API returned status 503"**
- **Uzrok**: Model se učitava (cold start)
- **Rešenje**: Sačekaj 10-20 sekundi i pokušaj ponovo

**3. "AI API returned status 429"**
- **Uzrok**: Prekoračen rate limit
- **Rešenje**: Sačekaj minut ili implementiraj rate limiting

**4. "Translation service error"**
- **Uzrok**: Translation servis nije dostupan
- **Rešenje**: Proveri da li je backend pokrenut

**5. Backend ne radi**
- **Uzrok**: Backend nije pokrenut ili port je zauzet
- **Rešenje**: 
  ```bash
  cd consultation-backend
  yarn start
  ```

### Debug Mode

Proveri logove u terminalu:

```bash
cd consultation-booking/consultation-backend
yarn start

# Gledaj logove u realnom vremenu
# [AIService] - AI servis logovi
# [TranslationService] - Translation servis logovi
# [AIController] - API endpoint logovi
```

## Buduća Unapređenja

### Planirane Funkcionalnosti

1. **Conversation Memory** - Pamćenje konteksta razgovora
2. **User Preferences** - Personalizovani odgovori
3. **Analytics** - Praćenje najpopularnijih pitanja
4. **Custom Training** - Fine-tuning modela sa vašim podacima
5. **Multi-model Support** - GPT-4, Claude, PaLM
6. **Voice Support** - Text-to-speech za odgovore
7. **Rate Limiting** - Zaštita od prevelikog broja zahteva
8. **Caching AI Responses** - Keširaj česte odgovore
9. **A/B Testing** - Test različitih AI modela
10. **Sentiment Analysis** - Analiza sentimenta korisnika

### Skalabilnost

Za produkciju:
- Koristi Redis za conversation memory
- Implementiraj rate limiting (10 zahteva/min po IP-u)
- Dodaj monitoring (Sentry, DataDog)
- Koristi load balancing za više instanci
- Razmotri plaćeni tier Hugging Face-a
- Alternativni modeli: GPT-3.5, Claude, Gemini

## Zaključak

AI Backend Service pruža **profesionalnu, sigurnu i efikasnu** infrastrukturu za AI chat asistenta. Sa integrisanim prevođenjem, fallback sistemom i podrškom za 50+ jezika, servis je **spreman za produkciju** i lako se može proširiti sa novim funkcionalnostima.

### Quick Start Commands

```bash
# 1. Backend setup
cd consultation-booking/consultation-backend
echo "HUGGINGFACE_API_KEY=hf_your_token" > .env
yarn start

# 2. Frontend (u drugom terminalu)
cd consultation-booking/consultation-frontend
yarn dev

# 3. Test
curl -X POST http://localhost:3088/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "language": "en"}'
```

Za dodatna pitanja ili podršku, konsultujte dokumentaciju ili kontaktirajte razvojni tim.


