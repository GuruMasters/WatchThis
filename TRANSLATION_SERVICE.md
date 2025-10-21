# Translation Service - Backend Servis za Prevođenje

## Pregled

Backend servis za prevođenje je implementiran kao NestJS modul koji pruža robusnu, keširanu i sigurnu infrastrukturu za prevođenje tekstova na preko 50 jezika.

## Arhitektura

### Struktura Modula
```
consultation-backend/src/translation/
├── translation.module.ts      # NestJS modul
├── translation.controller.ts  # REST API kontroler
└── translation.service.ts     # Business logika i integracija sa LibreTranslate
```

### Glavne Prednosti

1. **Sigurnost** - API ključevi ostaju na backend-u
2. **Performanse** - Integrisan keš mehanizam (do 1000 prevoda u memoriji)
3. **Pouzdanost** - Fallback sistem za česte fraze
4. **Centralizacija** - Sva logika prevođenja na jednom mestu
5. **Proširivost** - Lako dodavanje novih funkcionalnosti

## API Endpoints

### 1. Prevođenje Teksta
**POST** `/api/translation/translate`

Prevodi jedan tekst sa izvornog na ciljni jezik.

**Request Body:**
```json
{
  "text": "Hello, how can I help you?",
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "translatedText": "Hola, ¿cómo puedo ayudarte?",
    "sourceLanguage": "en",
    "targetLanguage": "es",
    "originalText": "Hello, how can I help you?"
  }
}
```

### 2. Batch Prevođenje
**POST** `/api/translation/batch`

Prevodi više tekstova odjednom (optimizovano za performanse).

**Request Body:**
```json
{
  "texts": [
    "Hello",
    "Goodbye",
    "Thank you"
  ],
  "targetLanguage": "fr",
  "sourceLanguage": "en"
}
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "translatedText": "Bonjour",
      "sourceLanguage": "en",
      "targetLanguage": "fr",
      "originalText": "Hello"
    },
    {
      "translatedText": "Au revoir",
      "sourceLanguage": "en",
      "targetLanguage": "fr",
      "originalText": "Goodbye"
    },
    {
      "translatedText": "Merci",
      "sourceLanguage": "en",
      "targetLanguage": "fr",
      "originalText": "Thank you"
    }
  ]
}
```

### 3. Podržani Jezici
**GET** `/api/translation/languages`

Vraća listu svih podržanih jezika.

**Response:**
```json
{
  "success": true,
  "count": 50,
  "data": [
    { "code": "en", "name": "English" },
    { "code": "es", "name": "Spanish" },
    { "code": "fr", "name": "French" },
    { "code": "de", "name": "German" },
    { "code": "sr", "name": "Serbian" }
    // ... još jezika
  ]
}
```

### 4. Detekcija Jezika
**POST** `/api/translation/detect`

Automatski detektuje jezik teksta.

**Request Body:**
```json
{
  "text": "Bonjour, comment allez-vous?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "language": "fr",
    "confidence": 0.98
  }
}
```

### 5. Statistika Keša
**GET** `/api/translation/cache/stats`

Vraća informacije o keš memoriji.

**Response:**
```json
{
  "success": true,
  "data": {
    "size": 234,
    "maxSize": 1000
  }
}
```

### 6. Brisanje Keša
**DELETE** `/api/translation/cache`

Čisti keš memoriju prevoda.

**Response:**
```json
{
  "success": true,
  "message": "Translation cache cleared successfully"
}
```

### 7. Health Check
**GET** `/api/translation/health`

Proverava da li je servis operativan.

**Response:**
```json
{
  "success": true,
  "service": "translation",
  "status": "operational",
  "timestamp": "2025-10-15T12:00:00.000Z"
}
```

## Integracija sa Frontend-om

### React/TypeScript Primer

```typescript
// Frontend funkcija za prevođenje
const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (targetLang === 'en') return text;

  try {
    const response = await fetch('http://localhost:3088/api/translation/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        targetLanguage: targetLang,
        sourceLanguage: 'en'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation service error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error('Translation failed');
    }

    return result.data.translatedText || text;

  } catch (error) {
    console.error('Translation failed:', error);
    return text; // Fallback na originalni tekst
  }
};
```

## Keš Mehanizam

Servis koristi in-memory keš za optimizaciju performansi:

- **Ključ keša**: `{sourceLanguage}:{targetLanguage}:{text}`
- **Maksimalna veličina**: 1000 prevoda
- **Strategija evikacije**: FIFO (First In, First Out)
- **Automatsko čišćenje**: Kada se dostigne limit, briše se najstariji unos

### Prednosti Keša

1. **Brže odgovore** - Keširani prevodi se vraćaju trenutno
2. **Smanjeno opterećenje API-ja** - Manje poziva ka LibreTranslate
3. **Bolja dostupnost** - Keširani prevodi dostupni čak i kada je API nedostupan

## Fallback Sistem

Servis ima ugrađen fallback sistem za najčešće fraze:

```typescript
// Primer fallback prevoda
"Hi! I'm your AI assistant..." → {
  "es": "¡Hola! Soy tu asistente de IA...",
  "fr": "Salut! Je suis votre assistant IA...",
  "de": "Hallo! Ich bin Ihr KI-Assistent...",
  "sr": "Здраво! Ја сам ваш АИ асистент...",
  // ... još jezika
}
```

### Kada se Koristi Fallback?

1. LibreTranslate API nije dostupan
2. Mrežna greška
3. Rate limiting (prekoračen broj zahteva)
4. Timeout

## Logovanje

Servis loguje sve važne događaje:

```
[TranslationService] Translated text from en to es
[TranslationService] Cache hit for: en:fr:Hello
[TranslationService] Using fallback translation for: Hi! I'm your AI assistant...
[TranslationController] Translation request: Hello, how can I help you... to es
[TranslationController] Batch translation request: 5 texts to fr
```

## Testiranje

### Ručno Testiranje (cURL)

```bash
# Prevođenje teksta
curl -X POST http://localhost:3088/api/translation/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world!",
    "targetLanguage": "sr",
    "sourceLanguage": "en"
  }'

# Provera podržanih jezika
curl http://localhost:3088/api/translation/languages

# Health check
curl http://localhost:3088/api/translation/health
```

### Testiranje sa Frontend-a

1. Pokreni backend: `cd consultation-backend && yarn start`
2. Pokreni frontend: `cd consultation-frontend && yarn dev`
3. Otvori Contact stranicu
4. Promeni jezik u AI chat-u
5. Pošalji poruku - prevod će se uraditi kroz backend servis

## Podržani Jezici (Kompletna Lista)

### Evropski Jezici
- English (en) - Engleski
- Spanish (es) - Španski
- French (fr) - Francuski
- German (de) - Nemački
- Italian (it) - Italijanski
- Portuguese (pt) - Portugalski
- Russian (ru) - Ruski
- Serbian (sr) - Srpski
- Croatian (hr) - Hrvatski
- Polish (pl) - Poljski
- Dutch (nl) - Holandski
- Swedish (sv) - Švedski
- Norwegian (no) - Norveški
- Danish (da) - Danski
- Finnish (fi) - Finski
- Czech (cs) - Češki
- Slovak (sk) - Slovački
- Hungarian (hu) - Mađarski
- Romanian (ro) - Rumunski
- Bulgarian (bg) - Bugarski
- Greek (el) - Grčki
- Ukrainian (uk) - Ukrajinski

### Azijski Jezici
- Chinese (zh) - Kineski
- Japanese (ja) - Japanski
- Korean (ko) - Korejski
- Hindi (hi) - Hindi
- Arabic (ar) - Arapski
- Turkish (tr) - Turski
- Thai (th) - Tajlandski
- Vietnamese (vi) - Vijetnamski
- Indonesian (id) - Indonežanski
- Malay (ms) - Malajski
- Filipino (fil) - Filipinski
- Hebrew (he) - Hebrejski

*Ukupno: 50+ jezika*

## Performanse

### Prosečno Vreme Odgovora
- **Cache hit**: < 1ms
- **Prvi prevod (API poziv)**: 500ms - 2s
- **Batch prevod (10 tekstova)**: 1s - 3s

### Ograničenja
- **LibreTranslate Free Tier**: Bez strogih limita, ali zavisi od opterećenja servera
- **Keš veličina**: 1000 unosa
- **Maksimalna dužina teksta**: 5000 karaktera (LibreTranslate limit)

## Troubleshooting

### Česte Greške

**1. "Translation service error: 502"**
- **Uzrok**: LibreTranslate server nije dostupan
- **Rešenje**: Servis automatski vraća fallback prevod

**2. "Translation failed"**
- **Uzrok**: Nevalidan format podataka ili nepodržan jezik
- **Rešenje**: Proveri format request-a i kod jezika

**3. Backend nije dostupan**
- **Uzrok**: Backend server nije pokrenut
- **Rešenje**: Pokreni backend sa `yarn start` u `consultation-backend` folderu

### Debug Mode

Proveri logove u terminalu gde je pokrenut backend:

```bash
cd consultation-booking/consultation-backend
yarn start

# Gledaj logove u realnom vremenu
```

## Buduća Unapređenja

### Planirane Funkcionalnosti
1. **Redis keš** - Za distribuirano keširanje
2. **Rate limiting** - Zaštita od preopterećenja
3. **Prioritizacija prevoda** - Važniji tekstovi se prevode prvi
4. **Offline prevodi** - Za najčešće fraze
5. **Alternativni API-ji** - Google Translate, DeepL kao backup
6. **A/B testiranje** - Testiranje različitih translation servisa
7. **Analytics** - Praćenje najčešćih jezika i tekstova
8. **Optimizacija keša** - LRU umesto FIFO

### Skalabilnost
Za produkcijsko okruženje:
- Koristi Redis za distribuirani keš
- Implementiraj load balancing
- Dodaj CDN za statičke prevode
- Razmotri plaćeni tier LibreTranslate-a ili alternativne servise

## Zaključak

Translation Service pruža profesionalan, siguran i efikasan način za prevođenje tekstova u aplikaciji. Sa kešom, fallback sistemom i podrškom za 50+ jezika, servis je spreman za produkciju i lako se može proširiti sa novim funkcionalnostima.

Za dodatna pitanja ili podršku, konsultujte dokumentaciju ili kontaktirajte razvojni tim.


