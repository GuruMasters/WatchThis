# 🚀 Quick Start Guide - WatchThis Application

**Za početnike** - Kompletno uputstvo za pokretanje aplikacije u 5 minuta

---

## ⚡ Brzi Start (TL;DR)

```bash
# 1. Instaliraj dependencies
cd consultation-booking
yarn install

# 2. Pokreni aplikaciju
yarn dev

# 3. Otvori browser
# Frontend: http://localhost:5321
# Backend: http://localhost:3088
```

✅ **To je to!** Aplikacija radi sa default konfigur acijom.

---

## 📋 Predusovi

Pre nego što počneš, proveri da imaš instalirano:

- ✅ **Node.js** 18+ ([Download](https://nodejs.org/))
- ✅ **Yarn** package manager ([Download](https://yarnpkg.com/))
- ✅ **Git** ([Download](https://git-scm.com/))

Provera verzija:
```bash
node --version   # Treba >= 18.0.0
yarn --version   # Bilo koja verzija
git --version    # Bilo koja verzija
```

---

## 🛠️ Step-by-Step Setup

### **KORAK 1: Clone Repository**

```bash
# Clone projekat
git clone <your-repo-url>
cd WatchThis/consultation-booking

# Ili ako već imaš projekat:
cd /path/to/WatchThis/consultation-booking
```

---

### **KORAK 2: Install Dependencies**

```bash
# Instalacija svih paketa (može trajati 2-3 minuta)
yarn install
```

Ovo instalira:
- React 19 (frontend)
- NestJS (backend)
- Firebase SDK
- Tailwind CSS
- I sve ostale dependencies (~500MB)

---

### **KORAK 3: Environment Setup** (Opciono - aplikacija radi i bez ovog)

Ako želiš **pravi AI chat** (preporučeno), kreiraj `.env` fajl:

```bash
cd consultation-backend

# Linux/Mac
cp ENV_TEMPLATE.txt .env

# Windows
copy ENV_TEMPLATE.txt .env

# Edituj .env i dodaj API key
```

**Dobijanje Gemini API ključa** (BESPLATNO):
1. Idi na: https://aistudio.google.com/app/apikey
2. Sign in sa Google nalogom
3. Klikni "Create API key"
4. Copy ključ (počinje sa `AIza...`)
5. Paste u `.env`: `GEMINI_API_KEY=AIzaSy...`

**Napomena**: Ako ne kreirašsv `.env`, aplikacija će raditi sa inteligentnim fallback sistemom (bez pravog AI-ja).

---

### **KORAK 4: Pokreni Aplikaciju**

```bash
# Vrati se u root folder
cd /Users/radomirpopovic/Documents/projects/WatchThis/consultation-booking

# Pokreni frontend i backend istovremeno
yarn dev
```

Ili odvojeno (u dva terminala):

**Terminal 1 - Backend:**
```bash
cd consultation-booking
yarn nx serve consultation-backend
```

**Terminal 2 - Frontend:**
```bash
cd consultation-booking
yarn nx serve consultation-frontend
```

---

### **KORAK 5: Otvori u Browser-u**

Aplikacija je pokrenuta! Otvori:

**Frontend** (korisničko sučelje):
```
http://localhost:5321
```

**Backend** (API):
```
http://localhost:3088
```

**API Dokumentacija** (Swagger):
```
http://localhost:3088/api
```

---

## 🎯 Šta Možeš Testirati

### **1. Homepage** ✅
```
http://localhost:5321/
```
- Luksuzni hero sekcija
- Animacije
- Scroll effects
- Responsive dizajn

### **2. Services** ✅
```
http://localhost:5321/services
```
- Lista usluga
- Service detail stranice
- Hover effects

### **3. Contact & AI Chat** 🤖
```
http://localhost:5321/contact
```
1. Klikni na **"AI Assistant"** button (dolje desno)
2. Pitaj AI:
   - "What services do you offer?"
   - "How much does it cost?"
   - "I want to book a consultation"
3. AI odgovara na engleskom (ili srpskom ako imaš Gemini API)

### **4. Booking System** 📅
```
http://localhost:5321/booking
```
- Multi-step booking forma
- Calendar selection
- Consultant selection

### **5. About Us** 👥
```
http://localhost:5321/about
```
- Team members
- Company info
- Mission & Values

### **6. FAQ** ❓
```
http://localhost:5321/faq
```
- Accordion komponente
- Searchable FAQ

---

## 🔧 Troubleshooting

### Problem: `Port 3088 is already in use`

**Rešenje**: Zaustavi postojeći proces ili promeni port

```bash
# Option 1: Kill postojeći proces
lsof -ti:3088 | xargs kill -9

# Option 2: Promeni port u .env
echo "PORT=3089" >> consultation-backend/.env
```

---

### Problem: `Module not found` ili `Cannot find module`

**Rešenje**: Clean install

```bash
# Obriši node_modules i reinstaliraj
rm -rf node_modules
yarn install

# Clear Nx cache
yarn nx reset
```

---

### Problem: Frontend se ne učitava

**Rešenje**:
1. Proveri da li backend radi: `http://localhost:3088`
2. Proveri konzolu za greške (F12 u browseru)
3. Restartuj frontend:
   ```bash
   # Ctrl+C da stopaš
   yarn nx serve consultation-frontend
   ```

---

### Problem: AI ne radi

**Simptomi**: AI daje basic/fallback odgovore

**Rešenje**:
1. Proveri da li si dodao `GEMINI_API_KEY` u `.env`
2. Proveri backend logs za greške
3. Testuj API health check:
   ```bash
   curl http://localhost:3088/api/ai/health
   ```
   Trebalo bi da vidiš: `{"status":"operational","api_configured":true}`

---

### Problem: Stil (CSS) ne radi

**Rešenje**:
1. Proveri da li Tailwind radi:
   ```bash
   # Rebuild frontend
   yarn nx build consultation-frontend
   yarn nx serve consultation-frontend
   ```

---

## 📱 Mobile App (React Native) - Opciono

Ako želiš da pokreneš mobile app:

### iOS (Mac only):
```bash
cd consultation-mobile
yarn nx run-ios consultation-mobile
```

### Android:
```bash
cd consultation-mobile
yarn nx run-android consultation-mobile
```

**Napomena**: Mobile app zahteva dodatnu konfiguraciju (Xcode za iOS, Android Studio za Android).

---

## 🎨 Build za Production

### Frontend (optimizovan build):
```bash
yarn nx build consultation-frontend

# Output: dist/consultation-frontend/
# Deploy na Vercel, Netlify, ili bilo koji static hosting
```

### Backend (production build):
```bash
yarn nx build consultation-backend

# Output: dist/consultation-backend/
# Deploy na Render, Railway, ili bilo koji Node.js hosting
```

---

## 📚 Korisni Linkovi

### Dokumentacija:
- [OPTIMIZATION_ROADMAP.md](./OPTIMIZATION_ROADMAP.md) - Plan optimizacije
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Što je urađeno
- [ENVIRONMENT_SETUP_GUIDE.md](./consultation-booking/ENVIRONMENT_SETUP_GUIDE.md) - Detaljni setup
- [PERFORMANCE_IMPROVEMENTS.md](./consultation-booking/PERFORMANCE_IMPROVEMENTS.md) - Performance detalji

### Backend API:
- Health Check: `http://localhost:3088`
- Swagger API Docs: `http://localhost:3088/api`
- AI Health: `http://localhost:3088/api/ai/health`
- Translation Health: `http://localhost:3088/api/translation/health`

### Frontend:
- Homepage: `http://localhost:5321/`
- Services: `http://localhost:5321/services`
- Contact: `http://localhost:5321/contact`
- Booking: `http://localhost:5321/booking`
- About: `http://localhost:5321/about`
- FAQ: `http://localhost:5321/faq`

---

## 🧪 Testing Features

### Test AI Chat:
```bash
# Test sa curl (backend mora biti pokrenut)
curl -X POST http://localhost:3088/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What services do you offer?","language":"en"}'
```

### Test Translation:
```bash
curl -X POST http://localhost:3088/api/translation/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","targetLanguage":"sr","sourceLanguage":"en"}'
```

---

## 💡 Pro Tips

### 1. **Development Mode**
Frontend i backend imaju **hot reload** - izmene se automatski prikazuju bez restarta.

### 2. **Debug Mode**
Otvori DevTools (F12) u browser-u da vidiš:
- Network requests
- Console logs
- React component tree

### 3. **Backend Logs**
Backend prikazuje detaljna logovanja:
- AI requests
- Translation calls
- API endpoints
- Errors

### 4. **Performance**
Sa implementiranim optimizacijama:
- Initial load: ~320KB (60% manje!)
- Time to Interactive: ~3.3s (40% brže!)
- Lazy loading: Stranice se učitavaju na zahtev

---

## 🚀 Sledeći Koraci

Nakon što pokreneš aplikaciju:

1. ✅ **Explore Features** - Idi kroz sve stranice
2. ✅ **Test AI Chat** - Probaj AI asistenta
3. ✅ **Check Responsive** - Testiraj na mobil, tablet
4. ✅ **Read Documentation** - Pregledaj `.md` fajlove
5. ✅ **Customize** - Promeni boje, tekstove, slike

---

## ❓ FAQ

**Q: Da li moram imati Gemini API key?**  
A: Ne! Aplikacija radi sa inteligentnim fallback sistemom. Ali preporučujemo Gemini (besplatan) za najbolje iskustvo.

**Q: Koliko košta hosting?**  
A: $0 sa free tier-ovima (Vercel, Render, Firebase)

**Q: Da li mogu koristiti OpenAI umesto Gemini?**  
A: Da! Dodaj `OPENAI_API_KEY` u `.env`. Ali Gemini je besplatan (OpenAI nije).

**Q: Kako da deploy-ujem u production?**  
A: Pogledaj [OPTIMIZATION_ROADMAP.md](./OPTIMIZATION_ROADMAP.md) - Faza 5.

**Q: Aplikacija ne radi, šta da radim?**  
A: Proveri **Troubleshooting** sekciju iznad. Ako i dalje ne radi, proveri backend logs.

---

## 📞 Support

Ako imaš problema:

1. 📖 Proveri [ENVIRONMENT_SETUP_GUIDE.md](./consultation-booking/ENVIRONMENT_SETUP_GUIDE.md)
2. 🐛 Proveri **Troubleshooting** sekciju
3. 📝 Pogledaj backend logs za greške
4. 🔍 Search GitHub Issues (ako je public repo)

---

**Srecan coding! 🚀**

Kreirano: 16. Oktobar 2025  
Verzija: 1.0

