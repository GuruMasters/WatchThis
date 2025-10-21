# 🤖 Google Gemini AI Setup (BESPLATNO!)

AI asistent u aplikaciji sada koristi **Google Gemini 2.0 Flash** model koji je **potpuno besplatan**!

## Kako dobiti Gemini API ključ? (2 minuta)

### 1. Idi na Google AI Studio
Otvori: https://aistudio.google.com/app/apikey

### 2. Prijavi se sa Google nalogom
Koristi svoj Google nalog (Gmail)

### 3. Kreiraj API ključ
- Klikni na **"Create API key"** dugme
- Izaberi postojeći Google Cloud projekat ili kreiraj novi
- Kopiraj API ključ

### 4. Dodaj u `.env` fajl
Otvori `.env` fajl u root direktorijumu projekta i dodaj:

```bash
GEMINI_API_KEY=tvoj-api-kljuc-ovde
```

### 5. Restartuj backend
```bash
yarn nx serve consultation-backend
```

## ✅ Provera

Nakon restartovanja backen-a, trebalo bi da vidiš u konzoli:
```
Gemini API key configured successfully
```

## 📊 Gemini Besplatni Tier

- **60 zahteva po minuti**
- **1,500 zahteva po danu**
- **1 milion zahteva po mesecu**
- **Potpuno BESPLATNO** - bez kreditne kartice!

## 🎯 Model koji koristimo

**gemini-2.0-flash-exp**
- Najnoviji Gemini model
- Izuzetno brz
- Odličan za chat botove
- Podržava sve jezike

## 🔧 Troubleshooting

### Greška: "Gemini API key not configured"
- Proveri da li si dodao `GEMINI_API_KEY` u `.env` fajl
- Restartuj backend server

### Greška: "429 Too Many Requests"
- Dostigao si limit od 60 zahteva po minuti
- Sačekaj 1 minut

### API ključ ne radi?
- Proveri da li si kopirao ceo ključ
- Proveri da nema dodatnih razmaka u `.env`
- Ključ treba da izgleda ovako: `AIza...`

## 📚 Više informacija

- Gemini API Dokumentacija: https://ai.google.dev/docs
- Google AI Studio: https://aistudio.google.com
