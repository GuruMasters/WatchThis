# 🚀 Deployment Guide - WatchThis Application

**Last Updated**: October 16, 2025  
**Status**: Production-Ready with Docker

---

## 📋 Deployment Options

### Option 1: Docker (Recommended) 🐳
**Best for**: Full-stack deployment, easy scaling, consistent environments

### Option 2: Platform-as-a-Service (PaaS) ☁️
**Best for**: Quick deployment, managed infrastructure, zero DevOps

### Option 3: Manual Deployment 🛠️
**Best for**: Custom infrastructure, full control

---

## 🐳 Option 1: Docker Deployment (Recommended)

### Prerequisites
- ✅ Docker installed ([Download](https://www.docker.com/))
- ✅ Docker Compose installed ([Download](https://docs.docker.com/compose/install/))
- ✅ `.env` file configured in `consultation-backend/`

---

### Quick Start (3 Commands)

```bash
# 1. Clone and navigate
cd consultation-booking

# 2. Configure environment
cp consultation-backend/ENV_TEMPLATE.txt consultation-backend/.env
# Edit .env with your actual values (Gemini API key, etc.)

# 3. Deploy!
./scripts/deploy.sh
```

**That's it!** 🎉

- Frontend: http://localhost
- Backend: http://localhost:3088
- API Docs: http://localhost:3088/api

---

### Manual Docker Commands

If you prefer manual control:

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

---

### Docker Architecture

```
┌─────────────────────────────────────────┐
│           Load Balancer / Nginx         │
│              (Port 80/443)              │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌───────▼────────┐
│   Frontend     │  │    Backend     │
│   Container    │  │   Container    │
│   (Nginx)      │  │   (Node.js)    │
│   Port: 80     │  │   Port: 3088   │
└────────────────┘  └────────────────┘
                           │
                    ┌──────▼─────────┐
                    │   Firebase     │
                    │   (External)   │
                    └────────────────┘
```

---

### Environment Variables (.env)

**Required for Production**:
```env
# Server
NODE_ENV=production
PORT=3088

# Frontend URL (your actual domain)
FRONTEND_URL=https://yourdomain.com

# AI (at least one required)
GEMINI_API_KEY=AIza...     # Recommended (FREE)
# or
OPENAI_API_KEY=sk-...      # Paid alternative

# Firebase
FIREBASE_PROJECT_ID=watchthis-b1602

# Security (change these!)
JWT_SECRET=your_super_secret_production_key_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---

### Health Checks

Docker containers have built-in health checks:

**Backend**:
```bash
curl http://localhost:3088
# Should return: {"message":"WatchThis API is running!"}
```

**Frontend**:
```bash
curl http://localhost/health
# Should return: "healthy"
```

**Check container status**:
```bash
docker-compose ps
# All services should show "healthy"
```

---

### Troubleshooting Docker

#### Problem: Container won't start

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check resource usage
docker stats
```

#### Problem: Port already in use

```bash
# Find what's using port 3088
lsof -i :3088

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
```

#### Problem: Build fails

```bash
# Clean rebuild
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

---

## ☁️ Option 2: Platform-as-a-Service Deployment

### 2A. Frontend - Vercel (Recommended)

**Why Vercel**:
- ✅ FREE tier (perfect for this app)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Zero configuration for Vite

**Steps**:

1. **Sign up**: https://vercel.com/signup
2. **Import Git repository**
3. **Configure project**:
   ```
   Framework Preset: Vite
   Root Directory: consultation-booking/consultation-frontend
   Build Command: yarn nx build consultation-frontend
   Output Directory: ../dist/consultation-frontend
   ```
4. **Add environment variables** (if needed)
5. **Deploy** 🚀

**Cost**: $0/month (Free tier covers 100GB bandwidth)

---

### 2B. Backend - Render (Recommended)

**Why Render**:
- ✅ FREE tier (750 hours/month)
- ✅ Automatic HTTPS
- ✅ Easy database integration
- ✅ Simple deployment from Git
- ✅ Built-in health checks

**Steps**:

1. **Sign up**: https://render.com/
2. **New Web Service**
3. **Connect Git repository**
4. **Configure**:
   ```
   Name: watchthis-backend
   Runtime: Node
   Build Command: yarn nx build consultation-backend
   Start Command: node dist/consultation-backend/main.js
   ```
5. **Add environment variables** (from `.env`)
6. **Deploy** 🚀

**Cost**: $0/month (Free tier) or $7/month (Starter for always-on)

---

### 2C. Alternative: Railway

**Why Railway**:
- ✅ FREE $5/month credit
- ✅ Simpler than Render
- ✅ Great DX

**Steps**:

1. **Sign up**: https://railway.app/
2. **New Project** → Deploy from GitHub
3. **Select repository**
4. **Configure environment variables**
5. **Deploy** 🚀

**Cost**: $0/month (with $5 free credit)

---

## 🛠️ Option 3: Manual Deployment

### 3A. Frontend (Static Hosting)

Build locally:
```bash
cd consultation-booking
yarn nx build consultation-frontend --configuration=production
```

Output: `dist/consultation-frontend/`

**Deploy to**:
- **Netlify**: Drag & drop `dist/consultation-frontend/`
- **AWS S3 + CloudFront**: Upload and configure
- **GitHub Pages**: Push dist to `gh-pages` branch
- **Any static host**: Upload files via FTP/SSH

---

### 3B. Backend (VPS/Server)

**Requirements**:
- Node.js 18+
- Yarn
- PM2 (process manager)

**Setup**:

```bash
# On your server
git clone <repo>
cd consultation-booking

# Install dependencies
yarn install --frozen-lockfile --production

# Build
yarn nx build consultation-backend

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start dist/consultation-backend/main.js --name watchthis-backend

# Save PM2 configuration
pm2 save
pm2 startup

# View logs
pm2 logs watchthis-backend
```

---

## 🔒 Security Checklist (Production)

### Before Deploying:

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Add real API keys (Gemini/OpenAI)
- [ ] Update `FRONTEND_URL` to actual domain
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (SSL certificate)
- [ ] Configure CORS with production domains
- [ ] Remove Firebase service account JSON from Git
- [ ] Set up backup strategy
- [ ] Configure monitoring (Sentry)
- [ ] Test rate limiting
- [ ] Review security headers (Helmet)

### After Deploying:

- [ ] Test all critical flows (booking, contact, AI)
- [ ] Run Lighthouse audit (should be 90+)
- [ ] Test on mobile devices
- [ ] Verify HTTPS works
- [ ] Test API endpoints
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Configure DNS
- [ ] Test SEO (meta tags, sitemap)

---

## 📊 Monitoring & Maintenance

### Recommended Tools:

**Free Tier**:
- **Sentry** (error tracking) - 5K events/month
- **UptimeRobot** (uptime monitoring) - 50 monitors
- **Google Analytics** (analytics) - FREE
- **Lighthouse CI** (performance) - FREE

### Health Checks:

**Backend**:
```bash
curl https://api.yourdomain.com/
curl https://api.yourdomain.com/api/ai/health
curl https://api.yourdomain.com/api/translation/health
```

**Frontend**:
```bash
curl https://yourdomain.com/
curl https://yourdomain.com/health
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Already configured in `.github/workflows/ci.yml`:

**On every push**:
1. ✅ Lint code
2. ✅ Run tests (when implemented)
3. ✅ Build applications
4. ✅ Run security scans
5. ✅ Build Docker images (on main branch)

**On pull requests**:
1. ✅ Run all checks
2. ✅ Comment with results

**Manual triggers**:
- Deploy to staging
- Deploy to production

---

## 💰 Cost Breakdown

### FREE Tier Setup (Recommended):

| Service | Plan | Cost |
|---------|------|------|
| **Frontend** (Vercel) | Free | $0 |
| **Backend** (Render) | Free | $0 |
| **Firebase** | Spark | $0 |
| **Gemini AI** | Free | $0 |
| **Monitoring** (Sentry) | Free | $0 |
| **Total** | | **$0/month** |

**Limitations**:
- Render free tier: 750 hours/month (31 days)
- Vercel: 100GB bandwidth
- Firebase: 50K reads, 20K writes/day
- Gemini: 1.5M tokens/month

### Paid Setup (Production):

| Service | Plan | Cost |
|---------|------|------|
| **Frontend** (Vercel Pro) | Pro | $20/month |
| **Backend** (Render Starter) | Starter | $7/month |
| **Firebase** (Blaze) | Pay-as-you-go | ~$10/month |
| **Gemini AI** | Pay-as-you-go | $0-5/month |
| **Monitoring** (Sentry) | Team | $26/month |
| **Total** | | **~$63-68/month** |

**For small traffic**:
- Realistically: $7-15/month (just Render Starter + minimal Firebase)

---

## 🎯 Recommended Setup

### For Development/Testing:
- ✅ **Docker locally** (free, fast, consistent)
- ✅ Use free tiers for APIs

### For Small Production:
- ✅ **Frontend**: Vercel (free tier)
- ✅ **Backend**: Render (free tier)
- ✅ **Database**: Firebase (free tier)
- ✅ **Total**: $0/month

### For Serious Production:
- ✅ **Frontend**: Vercel Pro ($20/month)
- ✅ **Backend**: Render Starter ($7/month)
- ✅ **Database**: Firebase Blaze ($10/month)
- ✅ **Monitoring**: Sentry + UptimeRobot (free)
- ✅ **Total**: $37/month

---

## 🆘 Support

### Deployment Issues:

1. Check deployment logs
2. Verify environment variables
3. Test locally with Docker first
4. Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Platform-Specific Docs:

- **Vercel**: https://vercel.com/docs
- **Render**: https://render.com/docs
- **Railway**: https://docs.railway.app/
- **Docker**: https://docs.docker.com/

---

## 🚀 Quick Deploy Commands

```bash
# Docker (local/VPS)
./scripts/deploy.sh

# Build for Vercel/Netlify
yarn nx build consultation-frontend --configuration=production

# Build for Render/Railway
yarn nx build consultation-backend --configuration=production

# Full rebuild
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d
```

---

**Happy Deploying! 🚀**

Created: October 16, 2025  
Version: 1.0

