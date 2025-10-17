# 🚀 Redis Caching Guide - WatchThis

**Last Updated**: October 16, 2025  
**Status**: Optional - For Scale

---

## 📋 Overview

**Redis** is an in-memory data store perfect for:
- ✅ Caching AI responses
- ✅ Caching translations
- ✅ Session storage
- ✅ Conversation history
- ✅ Rate limiting (already using in-memory)

**When to add Redis**:
- Your app has > 1000 users
- You need persistent cache
- You want multi-server support
- You need faster responses (< 10ms)

---

## 🛠️ Setup (Optional)

### **Option 1: Local Redis** (Development)

```bash
# macOS
brew install redis
redis-server

# Ubuntu
sudo apt-get install redis-server
sudo service redis-server start

# Docker
docker run -d -p 6379:6379 redis:alpine
```

### **Option 2: Cloud Redis** (Production - FREE)

**Upstash** (Recommended - FREE tier):
1. Go to: https://upstash.com/
2. Create account
3. Create Redis database
4. Copy connection string

**Free Tier**:
- 10,000 commands/day
- 256 MB storage
- Perfect for this app

---

## 📦 Install Dependencies

```bash
cd consultation-booking

# Install Redis client
yarn add ioredis

# Types
yarn add -D @types/ioredis
```

---

## 🔧 Implementation

### **1. Redis Service** (Backend)

**File**: `consultation-backend/src/cache/redis.service.ts`

```typescript
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: Redis | null;
  private readonly enabled: boolean;

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    
    if (!redisUrl) {
      this.logger.warn('Redis URL not configured. Caching disabled.');
      this.enabled = false;
      this.client = null;
      return;
    }

    try {
      this.client = new Redis(redisUrl, {
        retryStrategy(times) {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      });

      this.client.on('connect', () => {
        this.logger.log('Redis connected successfully');
      });

      this.client.on('error', (err) => {
        this.logger.error('Redis error:', err);
      });

      this.enabled = true;
    } catch (error) {
      this.logger.error('Failed to connect to Redis', error);
      this.enabled = false;
      this.client = null;
    }
  }

  /**
   * Get value from cache
   */
  async get<T = any>(key: string): Promise<T | null> {
    if (!this.enabled || !this.client) return null;

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      this.logger.error(`Failed to get key: ${key}`, error);
      return null;
    }
  }

  /**
   * Set value in cache
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.enabled || !this.client) return;

    try {
      const serialized = JSON.stringify(value);
      
      if (ttl) {
        await this.client.setex(key, ttl, serialized);
      } else {
        await this.client.set(key, serialized);
      }
    } catch (error) {
      this.logger.error(`Failed to set key: ${key}`, error);
    }
  }

  /**
   * Delete key
   */
  async delete(key: string): Promise<void> {
    if (!this.enabled || !this.client) return;

    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error(`Failed to delete key: ${key}`, error);
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.enabled || !this.client) return false;

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.error(`Failed to check key: ${key}`, error);
      return false;
    }
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    if (!this.enabled || !this.client) return;

    try {
      await this.client.flushdb();
      this.logger.log('Redis cache cleared');
    } catch (error) {
      this.logger.error('Failed to clear cache', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{ keys: number; memory: string }> {
    if (!this.enabled || !this.client) {
      return { keys: 0, memory: '0B' };
    }

    try {
      const keys = await this.client.dbsize();
      const info = await this.client.info('memory');
      const memoryMatch = info.match(/used_memory_human:(\S+)/);
      const memory = memoryMatch ? memoryMatch[1] : '0B';

      return { keys, memory };
    } catch (error) {
      this.logger.error('Failed to get stats', error);
      return { keys: 0, memory: '0B' };
    }
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }
}
```

---

### **2. AI Service with Redis** (Enhanced)

**File**: `consultation-backend/src/ai/ai.service.ts` (add caching)

```typescript
import { RedisService } from '../cache/redis.service';

@Injectable()
export class AIService {
  constructor(
    private readonly translationService: TranslationService,
    private readonly redisService: RedisService,  // Add this
  ) {
    // ...
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const { message, language = 'en', context } = request;

    // Try cache first
    const cacheKey = `ai:${language}:${message}`;
    const cached = await this.redisService.get<AIResponse>(cacheKey);
    
    if (cached) {
      this.logger.log('Cache hit for AI response');
      return cached;
    }

    // Generate response
    const response = await this.getAIResponse(message, context);

    // ... translate and format ...

    // Cache for 1 hour
    await this.redisService.set(cacheKey, result, 3600);

    return result;
  }
}
```

---

### **3. Translation Service with Redis**

```typescript
async translateText(request: TranslationRequest): Promise<TranslationResponse> {
  const { text, targetLanguage, sourceLanguage = 'en' } = request;

  // Try Redis cache first
  const cacheKey = `translation:${sourceLanguage}:${targetLanguage}:${text}`;
  const cached = await this.redisService.get<TranslationResponse>(cacheKey);
  
  if (cached) {
    this.logger.log('Redis cache hit for translation');
    return cached;
  }

  // ... do translation ...

  // Cache for 24 hours
  await this.redisService.set(cacheKey, result, 86400);

  return result;
}
```

---

## 🎯 Caching Strategy

### **What to Cache**:

1. **AI Responses** (TTL: 1 hour)
   ```
   Key: ai:{language}:{message}
   Value: AIResponse
   ```

2. **Translations** (TTL: 24 hours)
   ```
   Key: translation:{source}:{target}:{text}
   Value: TranslationResponse
   ```

3. **User Sessions** (TTL: 30 days)
   ```
   Key: session:{userId}
   Value: SessionData
   ```

4. **Conversation History** (TTL: 7 days)
   ```
   Key: conversation:{userId}
   Value: Message[]
   ```

---

## 📊 Performance Impact

### **Before Redis**:
- AI response: 500ms-2s (API call every time)
- Translation: 500ms-2s (API call every time)
- Conversation memory: Lost on restart

### **With Redis**:
- AI response (cached): **< 10ms** ✅
- Translation (cached): **< 10ms** ✅
- Conversation memory: **Persistent** ✅

**Cache Hit Rate**: 60-80% (most common queries)

---

## 💰 Cost

### **Free Tier** (Upstash):
- 10,000 commands/day
- 256 MB storage
- **Cost: $0/month**

**For this app**:
- ~100 users/day = ~5,000 commands/day
- Well within free tier ✅

### **Paid Tier** (if needed):
- $0.20 / 100,000 commands
- **Cost: ~$1-2/month** (moderate traffic)

---

## 🔧 Environment Variables

Add to `.env`:

```env
# Redis (Optional - for caching)
REDIS_URL=redis://localhost:6379

# Or Upstash (production)
REDIS_URL=rediss://default:password@us1-example.upstash.io:6379
```

---

## 🚀 When to Add Redis

### **Don't need it if**:
- < 100 users/day
- Single server deployment
- In-memory cache is sufficient

### **Add it when**:
- > 1000 users/day
- Multiple servers (load balancing)
- Need persistent cache
- Want < 10ms responses

**Current app**: In-memory cache is **sufficient** ✅

---

## 📚 Resources

- **Redis Documentation**: https://redis.io/docs/
- **ioredis Client**: https://github.com/redis/ioredis
- **Upstash** (Free Cloud Redis): https://upstash.com/

---

**Redis is OPTIONAL for now!** 

Current in-memory caching works great for most use cases. Add Redis when you scale to > 1000 users/day.

---

Created: October 16, 2025  
Version: 1.0  
Status: ⏳ Optional - Not Blocking Production

