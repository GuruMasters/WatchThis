# 🔥 Firebase Optimization Guide - WatchThis

**Last Updated**: October 16, 2025  
**Status**: Production Optimization Recommendations

---

## 📊 Current Firebase Usage

**Project**: `watchthis-b1602`  
**Plan**: Spark (Free) → Blaze (Pay-as-you-go) recommended for production

### Free Tier Limits:
- **Reads**: 50,000/day
- **Writes**: 20,000/day
- **Deletes**: 20,000/day
- **Storage**: 1 GB
- **Bandwidth**: 10 GB/month

---

## 🎯 Optimization Strategies

### 1. **Firestore Indexing** ⚡

#### Why Indexing Matters:
- Queries without indexes are **slow** (table scan)
- Complex queries **require** composite indexes
- Proper indexes = 10-100x faster queries

#### Current Collections:
```
watchthis-b1602/
├── bookings/
├── users/
├── consultants/
├── services/
└── conversations/
```

#### Recommended Indexes:

**Bookings Collection**:
```json
// Single-field indexes (automatic)
- consultantId (ascending)
- userId (ascending)
- status (ascending)
- createdAt (descending)

// Composite indexes (create manually)
[
  {
    "collectionGroup": "bookings",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "consultantId", "order": "ASCENDING" },
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "date", "order": "ASCENDING" }
    ]
  },
  {
    "collectionGroup": "bookings",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "userId", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]
  }
]
```

**Users Collection**:
```json
[
  {
    "collectionGroup": "users",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "role", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]
  }
]
```

**How to Create Indexes**:

**Option 1: Firebase Console**
1. Go to: https://console.firebase.google.com/
2. Select `watchthis-b1602`
3. Firestore Database → Indexes
4. Click "Create Index"
5. Add fields and click "Create"

**Option 2: CLI** (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Create firestore.indexes.json
firebase init firestore

# Deploy indexes
firebase deploy --only firestore:indexes
```

**`firestore.indexes.json` Example**:
```json
{
  "indexes": [
    {
      "collectionGroup": "bookings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "consultantId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "date", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "bookings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

---

### 2. **Query Optimization** 🔍

#### Best Practices:

**✅ DO:**
```typescript
// Limit results
const bookings = await db.collection('bookings')
  .where('status', '==', 'pending')
  .orderBy('createdAt', 'desc')
  .limit(10)  // Only get what you need
  .get();

// Use pagination
const next = await db.collection('bookings')
  .orderBy('createdAt', 'desc')
  .startAfter(lastDoc)  // Cursor-based pagination
  .limit(10)
  .get();

// Cache locally
const bookings = await db.collection('bookings')
  .where('consultantId', '==', consultantId)
  .get({ source: 'cache' });  // Try cache first
```

**❌ DON'T:**
```typescript
// Don't fetch all documents
const all = await db.collection('bookings').get();  // 💸 Expensive!

// Don't use offset
const page2 = await db.collection('bookings')
  .orderBy('createdAt')
  .offset(10)  // 💸 Still reads first 10!
  .limit(10)
  .get();

// Don't query without limits
const bookings = await db.collection('bookings')
  .where('status', '==', 'pending')
  .get();  // Could return thousands!
```

---

### 3. **Batch Operations** 📦

**Reduce write costs** by batching:

```typescript
const batch = db.batch();

// Update multiple documents in one batch
bookings.forEach(booking => {
  const ref = db.collection('bookings').doc(booking.id);
  batch.update(ref, { status: 'confirmed' });
});

// Commit once (1 write instead of N writes)
await batch.commit();
```

**Limits**:
- Max 500 operations per batch
- Atomic: all succeed or all fail

---

### 4. **Real-time Listeners** 👂

**Use wisely** - listeners count as reads:

```typescript
// ✅ Narrow scope
const unsubscribe = db.collection('bookings')
  .where('consultantId', '==', consultantId)
  .where('status', '==', 'pending')
  .limit(5)
  .onSnapshot(snapshot => {
    // Handle updates
  });

// ❌ Too broad
const unsubscribe = db.collection('bookings')
  .onSnapshot(snapshot => {  // 💸 Reads EVERYTHING on every change!
    // ...
  });

// Always cleanup!
useEffect(() => {
  const unsubscribe = ...
  return () => unsubscribe();  // Prevent memory leaks
}, []);
```

---

### 5. **Data Structure** 🏗️

#### Denormalization

Firebase favors **denormalization** (duplicate data):

**❌ Normalized (SQL-style)**:
```
bookings/
  - bookingId: {consultantId, userId, ...}
  
users/
  - userId: {name, email, ...}
  
consultants/
  - consultantId: {name, specialty, ...}

// Requires 3 reads to display booking!
```

**✅ Denormalized (Firebase-style)**:
```
bookings/
  - bookingId: {
      consultantId,
      consultantName,      // Duplicated
      consultantPhoto,     // Duplicated
      userId,
      userName,            // Duplicated
      userEmail,           // Duplicated
      ...
    }

// Only 1 read to display booking!
```

**Trade-offs**:
- **Faster reads** (1 instead of 3)
- **More storage** (duplicated data)
- **Update complexity** (must update duplicates)

**When to use**:
- Read-heavy operations
- Data doesn't change often
- Performance > storage cost

---

### 6. **Security Rules** 🔒

**Optimize rules** for performance:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Bookings
    match /bookings/{bookingId} {
      // Allow read if user owns it or is consultant
      allow read: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        resource.data.consultantId == request.auth.uid
      );
      
      // Allow create if authenticated
      allow create: if request.auth != null;
      
      // Allow update if owner
      allow update: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Users (private)
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
    
    // Consultants (public read)
    match /consultants/{consultantId} {
      allow read: if true;  // Public
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

---

### 7. **Caching Strategy** 💾

**Client-side caching**:

```typescript
// Enable persistence (offline support)
firebase.firestore().enablePersistence()
  .catch(err => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open
    } else if (err.code === 'unimplemented') {
      // Browser doesn't support
    }
  });

// Use cache-first strategy
const bookings = await db.collection('bookings')
  .where('status', '==', 'pending')
  .get({ source: 'cache' })  // Try cache first
  .catch(() => db.collection('bookings')
    .where('status', '==', 'pending')
    .get());  // Fallback to server
```

**Backend caching** (Redis):
```typescript
// Cache frequent queries
const cacheKey = `bookings:consultant:${consultantId}`;
let bookings = await redis.get(cacheKey);

if (!bookings) {
  bookings = await db.collection('bookings')
    .where('consultantId', '==', consultantId)
    .get();
  
  await redis.set(cacheKey, JSON.stringify(bookings), 'EX', 300);  // 5 min
}
```

---

## 📊 Cost Optimization

### Monitoring Usage

**Firebase Console → Usage**:
- Check daily reads/writes/deletes
- Set up alerts for approaching limits
- Track bandwidth usage

### Cost Calculator

**Free Tier**:
- Reads: 50K/day = 1.5M/month
- Writes: 20K/day = 600K/month

**Blaze Plan** (Pay-as-you-go):
- Reads: $0.06 / 100K documents
- Writes: $0.18 / 100K documents
- Deletes: $0.02 / 100K documents

**Example Cost** (moderate traffic):
- 500K reads/month: $0.30
- 100K writes/month: $0.18
- 50K deletes/month: $0.01
- **Total**: ~$0.50/month

**Tips to Reduce Costs**:
1. Use pagination (limit results)
2. Cache frequently accessed data
3. Use batch operations
4. Optimize queries with indexes
5. Clean up old data

---

## 🚀 Performance Targets

| Operation | Target | Optimized |
|-----------|--------|-----------|
| **Single Document Read** | < 50ms | < 20ms with cache |
| **Query (10 docs)** | < 100ms | < 50ms with index |
| **Write** | < 200ms | < 100ms with batch |
| **Listener Update** | < 500ms | < 200ms narrow scope |

---

## 📚 Best Practices Checklist

### Reads
- [ ] Use `.limit()` on all queries
- [ ] Implement cursor-based pagination
- [ ] Enable client-side caching
- [ ] Use cache-first strategy
- [ ] Narrow listener scopes

### Writes
- [ ] Use batch operations (> 5 writes)
- [ ] Denormalize for performance
- [ ] Update only changed fields
- [ ] Clean up old data regularly

### Indexes
- [ ] Create composite indexes for complex queries
- [ ] Monitor index usage
- [ ] Remove unused indexes

### Security
- [ ] Write restrictive security rules
- [ ] Validate data on write
- [ ] Test rules thoroughly

### Monitoring
- [ ] Set up usage alerts
- [ ] Track query performance
- [ ] Monitor costs monthly
- [ ] Review slow queries

---

## 🛠️ Tools & Resources

### Firebase CLI
```bash
# Install
npm install -g firebase-tools

# Login
firebase login

# Init project
firebase init

# Deploy
firebase deploy

# View logs
firebase functions:log
```

### Firebase Console
- **Firestore**: https://console.firebase.google.com/project/watchthis-b1602/firestore
- **Usage**: https://console.firebase.google.com/project/watchthis-b1602/usage
- **Indexes**: https://console.firebase.google.com/project/watchthis-b1602/firestore/indexes

### Documentation
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Query Optimization](https://firebase.google.com/docs/firestore/query-data/queries)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**Ready to optimize!** 🔥

Created: October 16, 2025  
Version: 1.0

