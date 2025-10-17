# 🔧 Environment Setup Guide
## WatchThis - Complete Development Environment Setup

**Last Updated**: October 16, 2025  
**Difficulty**: Beginner-friendly  
**Time Required**: 15-30 minutes

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js 18+ installed
- ✅ Yarn package manager installed
- ✅ Git installed
- ✅ Code editor (VS Code recommended)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd WatchThis/consultation-booking

# Install dependencies
yarn install
```

---

### 2. Backend Environment Setup

#### Step 1: Create Environment File

```bash
# Navigate to backend folder
cd consultation-backend

# Copy the example environment file
cp .env.example .env
```

#### Step 2: Configure Google Gemini AI (FREE)

**Why Gemini?**
- ✅ Completely FREE (1.5M tokens/month)
- ✅ Better quality than fallback system
- ✅ Automatic translations included
- ✅ Fast response times

**How to get API key:**

1. Go to: https://aistudio.google.com/
2. Sign in with your Google account
3. Go to: https://aistudio.google.com/app/apikey
4. Click **"Create API key"**
5. Select **"Create API key in new project"**
6. Copy the generated key (starts with `AIza...`)

**Add to `.env` file:**

```env
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

#### Step 3: Firebase Setup (Already Configured)

The Firebase service account file should already exist in the project root:
- File: `watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json`
- **IMPORTANT**: This file should NEVER be committed to Git

If the file is missing, contact the project admin for a copy.

#### Step 4: Other Optional Configurations

All other environment variables have sensible defaults. You can customize them in `.env` if needed:

```env
# Port (default: 3088)
PORT=3088

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5321

# JWT Secret (change in production!)
JWT_SECRET=your_super_secret_key_here
```

---

### 3. Frontend Environment Setup

The frontend doesn't require environment variables for local development. Everything is configured to work with the backend at `http://localhost:3088`.

---

### 4. Start Development Servers

#### Option A: Start Both (Recommended)

```bash
# In the root consultation-booking directory
yarn dev
```

This starts:
- 🖥️  Frontend: http://localhost:5321
- ⚙️  Backend: http://localhost:3088

#### Option B: Start Individually

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

## ✅ Verify Setup

### 1. Backend Health Check

Open: http://localhost:3088

You should see:
```json
{
  "message": "WatchThis API is running!"
}
```

### 2. API Documentation

Open: http://localhost:3088/api

You should see Swagger API documentation.

### 3. AI Service Health Check

Open: http://localhost:3088/api/ai/health

You should see:
```json
{
  "status": "operational",
  "api_configured": true  // Should be true if Gemini API key is set
}
```

### 4. Frontend

Open: http://localhost:5321

You should see the WatchThis homepage.

### 5. Test AI Chat

1. Go to: http://localhost:5321/contact
2. Click the **"AI Assistant"** button (bottom right)
3. Ask a question like: "What services do you offer?"
4. You should get an intelligent AI response

**If you see intelligent responses** → ✅ Gemini AI is working!  
**If you see basic fallback responses** → ⚠️ Check your `GEMINI_API_KEY`

---

## 🔍 Troubleshooting

### Problem: Backend won't start

**Error**: `Port 3088 is already in use`

**Solution**:
```bash
# Kill the process using port 3088
lsof -ti:3088 | xargs kill -9

# Or change the port in .env
PORT=3089
```

---

### Problem: AI responses are basic/fallback

**Symptoms**: AI gives simple, templated responses instead of intelligent answers.

**Solution**:
1. Check if `GEMINI_API_KEY` is set in `.env`
2. Verify the API key is valid (not `your_gemini_api_key_here`)
3. Check backend logs for errors
4. Restart the backend server

---

### Problem: Firebase errors

**Error**: `Firebase service account file not found`

**Solution**:
1. Verify the file exists in project root
2. Check the file name matches exactly
3. Make sure it's not in `.gitignore` (it should be!)
4. Backend will work in "mock mode" without Firebase, but data won't persist

---

### Problem: CORS errors in browser

**Error**: `Access to fetch at 'http://localhost:3088' from origin 'http://localhost:5321' has been blocked by CORS policy`

**Solution**:
1. Check backend is running
2. Verify `FRONTEND_URL` in `.env` matches your frontend URL
3. Restart the backend server

---

### Problem: Frontend won't start

**Error**: `Module not found` or `Cannot find module`

**Solution**:
```bash
# Clean install
rm -rf node_modules
yarn install

# Clear Nx cache
yarn nx reset

# Try again
yarn nx serve consultation-frontend
```

---

## 🌍 Language & Translation

The app supports:
- 🇺🇸 English (default)
- 🇷🇸 Serbian (Српски)
- 🇫🇷 French, 🇩🇪 German, 🇪🇸 Spanish, and 50+ more

**How it works:**
- Gemini AI automatically handles translations
- Fallback system has manual Serbian translations
- LibreTranslate API used as backup (currently offline)

---

## 📊 Environment Variables Reference

### Required (Minimum to run)

```env
# Backend
PORT=3088
GEMINI_API_KEY=AIza...    # For intelligent AI (highly recommended)
```

### Optional but Recommended

```env
# Security
JWT_SECRET=your_secret_key

# CORS
FRONTEND_URL=http://localhost:5321

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Future/Advanced (Not needed now)

```env
# Alternative AI APIs
OPENAI_API_KEY=sk-...
HUGGINGFACE_API_KEY=hf_...

# Translation backup
GOOGLE_TRANSLATE_API_KEY=...

# Email (future feature)
SMTP_HOST=smtp.gmail.com
SMTP_USER=...
SMTP_PASS=...

# Caching (future optimization)
REDIS_HOST=localhost
REDIS_PORT=6379

# Monitoring (production)
SENTRY_DSN=...
```

---

## 🎯 Next Steps

Once your environment is set up:

1. ✅ Read the [OPTIMIZATION_ROADMAP.md](../OPTIMIZATION_ROADMAP.md)
2. ✅ Check [AI_SYSTEM_STATUS.md](./AI_SYSTEM_STATUS.md)
3. ✅ Review [GEMINI_SETUP.md](./GEMINI_SETUP.md) for detailed AI setup
4. ✅ Explore the codebase structure
5. ✅ Start developing! 🚀

---

## 📞 Support & Resources

### Documentation Files
- `OPTIMIZATION_ROADMAP.md` - Complete optimization plan
- `AI_SYSTEM_STATUS.md` - Current AI system status
- `GEMINI_SETUP.md` - Detailed Gemini AI setup
- `TRANSLATION_SERVICE.md` - Translation system docs
- `UI_SYSTEM_README.md` - UI/UX documentation

### External Resources
- Google Gemini API: https://ai.google.dev/
- NestJS Docs: https://nestjs.com/
- React Docs: https://react.dev/
- Nx Docs: https://nx.dev/
- Firebase Docs: https://firebase.google.com/docs

### Project Commands

```bash
# Development
yarn dev                                    # Start both frontend & backend
yarn nx serve consultation-backend          # Backend only
yarn nx serve consultation-frontend         # Frontend only

# Build
yarn nx build consultation-backend          # Build backend
yarn nx build consultation-frontend         # Build frontend

# Testing (when implemented)
yarn nx test consultation-backend           # Backend tests
yarn nx test consultation-frontend          # Frontend tests

# Linting
yarn nx lint consultation-backend           # Lint backend
yarn nx lint consultation-frontend          # Lint frontend

# Reset Nx cache
yarn nx reset                               # Clear all caches
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Add all API keys to environment variables (never hardcode)
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Ensure Firebase service account JSON is in `.gitignore`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure rate limiting appropriately
- [ ] Review CORS settings

---

**Happy Coding! 🚀**

If you encounter any issues not covered here, check the backend logs or reach out to the development team.

