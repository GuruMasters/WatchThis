# 🚀 Firebase Hosting - Deployment Vodič

## 📋 Tvoji Domeni

Tvoja aplikacija će biti dostupna na:
- **Primary**: https://watchthis-b1602.web.app
- **Alternative**: https://watchthis-b1602.firebaseapp.com

---

## 🔧 Setup (Jednom)

### 1. Instaliraj Firebase Tools

```bash
# Globalna instalacija (preporučeno)
npm install -g firebase-tools

# ILI lokalna instalacija (ako ne želiš globalno)
yarn add -D firebase-tools
```

### 2. Login u Firebase

```bash
firebase login
```

Ovo će otvoriti browser gde ćeš se ulogovati sa Google nalogom koji ima pristup projektu `watchthis-b1602`.

### 3. Verifikuj konfiguraciju

```bash
cd /Users/radomirpopovic/Documents/projects/WatchThis/consultation-booking
firebase projects:list
```

Trebalo bi da vidiš `watchthis-b1602` u listi.

---

## 🏗️ Build & Deploy Proces

### Korak 1: Build aplikaciju

```bash
cd /Users/radomirpopovic/Documents/projects/WatchThis/consultation-booking

# Build frontend sa produkcijskim env vars
npx nx build consultation-frontend --configuration=production
```

Ovo će kreirati optimizovani build u `dist/consultation-frontend/` folderu.

### Korak 2: Deploy na Firebase

```bash
# Deploy
firebase deploy --only hosting
```

### Brzi Deploy (sve odjednom)

```bash
# Build + Deploy (možeš dodati ovo u package.json)
npx nx build consultation-frontend --configuration=production && firebase deploy --only hosting
```

---

## 📁 Šta Fajlovi Rade

### `firebase.json`

```json
{
  "hosting": {
    "public": "dist/consultation-frontend",  // Folder sa build-om
    "rewrites": [{
      "source": "**",
      "destination": "/index.html"  // SPA routing (React Router)
    }],
    "headers": [
      // Cache strategija za brži load
      {
        "source": "**/*.@(js|css)",
        "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000"}]
      },
      {
        "source": "index.html",
        "headers": [{"key": "Cache-Control", "value": "no-cache"}]  // Uvek fresh
      }
    ]
  }
}
```

**Što znači:**
- `public`: Koji folder da deploy-uje
- `rewrites`: Omogućava da `/about`, `/services` rade (SPA routing)
- `headers`: Browser cache strategija (1 godina za JS/CSS, 0 za HTML)

### `.firebaserc`

```json
{
  "projects": {
    "default": "watchthis-b1602"  // Tvoj Firebase project ID
  }
}
```

**Što znači:** Definiše na koji Firebase projekat da se deploy-uje.

### `.env.production`

Environment varijable za production build sa tvojim Firebase config-om.

---

## 🔄 Workflow

```
1. Napravi izmene u kodu
   ↓
2. Testiraj lokalno: npx nx serve consultation-frontend
   ↓
3. Build: npx nx build consultation-frontend --configuration=production
   ↓
4. Deploy: firebase deploy --only hosting
   ↓
5. ✅ Live na watchthis-b1602.web.app
```

---

## 🎯 Kako Firebase Hosting Funkcioniše

### 1. **CDN (Content Delivery Network)**

Firebase koristi Google Cloud CDN sa serverima širom sveta:

```
Korisnik u Srbiji → Edge server u Frankfurtu → Brži load
Korisnik u US → Edge server u New Yorku → Brži load
```

**Cache**: Statički fajlovi (JS, CSS, images) se kesiraju na edge serverima → ultra brzo učitavanje.

### 2. **Deployment Proces**

Kada pokrneš `firebase deploy`:

```
1. Firebase Tools kompresuje sve fajlove
2. Upload-uje ih na Firebase Hosting servere
3. Distribucija na CDN edge servere širom sveta
4. Dobija automatski SSL certifikat (HTTPS)
5. Aktivira novi build (~30 sekundi)
```

### 3. **SSL & Domeni**

Firebase automatski:
- ✅ Dodaje HTTPS (besplatno)
- ✅ Kreira 2 subdomena:
  - `watchthis-b1602.web.app` (primary)
  - `watchthis-b1602.firebaseapp.com` (alternative)
- ✅ Možeš dodati custom domain (npr. `www.watchthis.rs`)

### 4. **SPA Routing**

Firebase rewrite pravilo omogućava:

```
watchthis-b1602.web.app/about     → index.html (React Router preuzima)
watchthis-b1602.web.app/services  → index.html (React Router preuzima)
watchthis-b1602.web.app/booking   → index.html (React Router preuzima)
```

Bez ovoga, direktan pristup `/about` bi dao **404 error**.

### 5. **Verzioniranje**

Firebase čuva sve deploymente:

```bash
# Vidi verzije
firebase hosting:channel:list

# Rollback na prethodnu verziju
firebase hosting:channel:deploy old-version
```

---

## 🛠️ Korisne Komande

```bash
# Deploy samo hosting-a
firebase deploy --only hosting

# Preview pre deploy-a (test URL)
firebase hosting:channel:deploy preview

# Otvori Firebase Console u browseru
firebase open hosting

# Vidi history verzija
firebase hosting:channel:list

# Lokalni preview production build-a
firebase serve
```

---

## 🌐 Custom Domain (Opciono)

Ako imaš svoj domain (npr. `watchthis.rs`):

1. Firebase Console → Hosting → Add custom domain
2. Dodaj DNS rekorde koje Firebase da:
   ```
   A    @    151.101.1.195
   A    @    151.101.65.195
   ```
3. Čeka DNS propagaciju (~24h)
4. Firebase automatski dodaje SSL certifikat

---

## 📊 Monitoring

Firebase Console → Hosting Dashboard:

- **Traffic**: Koliko poseta, geografska distribucija
- **Performance**: Load times, Core Web Vitals
- **Versions**: Sve deploy-ovane verzije
- **Usage**: Bandwidth, storage

---

## ⚡ Performance Tips

1. **Build optimizacije** (već konfigurisano):
   - Terser minifikacija (drop_console)
   - Code splitting (vendor chunks)
   - Image compression

2. **Cache strategija** (već konfigurisano):
   - JS/CSS: 1 godina cache
   - HTML: No cache (uvek fresh)

3. **robots.txt & noindex**:
   - Trenutno blokirano indeksiranje (skiniemo kasnije)

---

## 🆘 Troubleshooting

### Deploy nije uspeo

```bash
# Check da li si login-ovan
firebase login

# Check da li project postoji
firebase projects:list

# Forsiraj re-deploy
firebase deploy --only hosting --force
```

### Build greška

```bash
# Clean build
rm -rf dist/
npx nx reset
npx nx build consultation-frontend --configuration=production
```

### Domain ne radi

- Čekaj 5-10 minuta nakon deploy-a
- Hard refresh (Ctrl+Shift+R ili Cmd+Shift+R)
- Proveri da li build postoji: `ls -la dist/consultation-frontend/`

---

## 📦 Quick Deploy Script

Dodaj u `package.json`:

```json
{
  "scripts": {
    "deploy": "npx nx build consultation-frontend --configuration=production && firebase deploy --only hosting",
    "deploy:preview": "npx nx build consultation-frontend && firebase hosting:channel:deploy preview"
  }
}
```

Onda samo:

```bash
yarn deploy
```

---

## ✅ Checklist Pre Prvog Deploy-a

- [ ] Firebase Tools instaliran (`firebase --version`)
- [ ] Login na Firebase (`firebase login`)
- [ ] Build uspešan (`dist/consultation-frontend/index.html` postoji)
- [ ] `.env.production` ima prave Firebase kredencijale
- [ ] `robots.txt` i `noindex` sklonjeni (kada bude spreman za Google)
- [ ] Testirano lokalno

---

## 🎉 Prvi Deploy

```bash
cd /Users/radomirpopovic/Documents/projects/WatchThis/consultation-booking

# 1. Login (jednom)
firebase login

# 2. Build
npx nx build consultation-frontend --configuration=production

# 3. Deploy
firebase deploy --only hosting

# ✅ Live: https://watchthis-b1602.web.app
```

---

**Pitanja?** Sve je konfigurisano, samo pokreni komande! 🚀

