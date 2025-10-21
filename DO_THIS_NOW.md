# 🚨 URADI OVO ODMAH - EmailJS Template Setup

## Problem
Oba mail-a idu na `busines.watch.this@gmail.com` jer trenutno koristiš **ISTI template** za oba emaila!

---

## ✅ REŠENJE - 10 Minuta Setup

### Korak 1: Login na EmailJS
Idi na: https://dashboard.emailjs.com/admin/templates

### Korak 2: Otvori Postojeći Template
- Otvori template sa ID: **`template_kqooxjc`**
- Ovo će biti **ADMIN template** (prima forme od korisnika)

### Korak 3: Proveri Admin Template Settings

**Ovo JE DOBRO** (ne menjaj):
- **To Email**: `busines.watch.this@gmail.com` (fiksiran)
- **From Name**: `{{from_name}}` (korisničko ime)
- **From Email**: `{{from_email}}` (korisnički email)
- **Subject**: `New Consultation Request from {{from_name}}`

### Korak 4: Kreiraj NOVI Template za User Confirmation

1. Klikni **"Create New Template"**
2. Ime: **"User Confirmation - Booking Received"**

### Korak 5: KRITIČNO - Template Settings

**To Email:** (KLJUČNO!)
```
{{to_email}}
```
☝️ **MORA biti `{{to_email}}` sa 2 vitičaste zagrade!**

**To Name:**
```
{{to_name}}
```

**From Name:**
```
WatchThis Team
```

**From Email:**
```
noreply@watchthis.com
```

**Reply To:**
```
busines.watch.this@gmail.com
```

**Subject:**
```
Consultation Request Received - WatchThis
```

### Korak 6: Template Body (copy-paste)

**Prebaci na "HTML" tab** i kopiraj ovo:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; background: #f5f5f7; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .details { background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0; border: 2px solid #e9ecef; }
    .row { padding: 12px 0; border-bottom: 1px solid #e9ecef; display: flex; }
    .row:last-child { border-bottom: none; }
    .label { font-weight: 600; color: #667eea; width: 150px; }
    .value { color: #1d1d1f; flex: 1; }
    .footer { background: #f5f5f7; padding: 30px; text-align: center; color: #6e6e73; font-size: 14px; }
    .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
      <h1 style="margin: 10px 0; font-size: 28px;">Thank You for Your Request!</h1>
      <p style="margin: 10px 0; opacity: 0.9;">We've received your consultation booking</p>
    </div>
    
    <div class="content">
      <p style="font-size: 16px;">Hello <strong>{{to_name}}</strong>,</p>
      
      <p style="font-size: 16px; line-height: 1.8;">
        Thank you for scheduling a consultation with <strong>WatchThis</strong>! 
        We have received your request and will get back to you within <strong>24 hours</strong>.
      </p>
      
      <div class="details">
        <h2 style="margin: 0 0 20px 0; font-size: 20px;">📋 Your Booking Details</h2>
        
        <div class="row">
          <div class="label">Service:</div>
          <div class="value">{{service}}</div>
        </div>
        
        <div class="row">
          <div class="label">Date:</div>
          <div class="value">{{preferred_date}}</div>
        </div>
        
        <div class="row">
          <div class="label">Time:</div>
          <div class="value">{{preferred_time}}</div>
        </div>
        
        <div class="row">
          <div class="label">Email:</div>
          <div class="value">{{to_email}}</div>
        </div>
        
        <div class="row">
          <div class="label">Phone:</div>
          <div class="value">{{phone}}</div>
        </div>
      </div>
      
      <div style="background: #e0e7ff; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #667eea;">
        <h3 style="margin: 0 0 10px 0; color: #4338ca;">📞 What's Next?</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Our team will review your request</li>
          <li>We'll confirm your time within 24 hours</li>
          <li>You'll receive meeting details via email</li>
        </ul>
      </div>
      
      <p style="text-align: center;">
        <a href="mailto:busines.watch.this@gmail.com" class="button">Contact Us</a>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>WatchThis Team</strong></p>
      <p><a href="mailto:busines.watch.this@gmail.com" style="color: #667eea;">busines.watch.this@gmail.com</a></p>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        This is an automated confirmation. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>
```

### Korak 7: SAVE Template

Klikni **"Save"** dugme!

### Korak 8: Kopiraj Template ID

Nakon što save-uješ, kopiraj **Template ID** (npr. `template_abc123xyz`)

### Korak 9: Ažuriraj Kod

U `consultation-frontend/src/config/email.ts` fajlu, promeni ovu liniju:

**Pre:**
```typescript
CONFIRMATION_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_kqooxjc',
```

**Posle:**
```typescript
CONFIRMATION_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'template_TVOJ_NOVI_ID',
```

Zameni `template_TVOJ_NOVI_ID` sa stvarnim ID-em novog template-a!

### Korak 10: Rebuild & Test

```bash
yarn nx build consultation-frontend --configuration=production
yarn nx serve consultation-frontend
```

Testraj na: http://localhost:5321/booking

---

## 🎯 Expected Results

Nakon toga:

### Email 1 - Admin (busines.watch.this@gmail.com)
- ✅ Stiže na: `busines.watch.this@gmail.com`
- ✅ Od: Korisničko ime
- ✅ Prikazuje: Sve podatke korisnika

### Email 2 - User Confirmation (korisnički email)
- ✅ Stiže na: **Email koji korisnik unese u formi**
- ✅ Od: WatchThis Team
- ✅ Prikazuje: Lepo formatiranu potvrdu sa booking detaljima

---

## 🔍 Check Console

Otvori Browser Console (F12):
```
✅ Admin email sent to: busines.watch.this@gmail.com
✅ Confirmation email sent to: user@email.com
```

---

## ❓ Ako Nešto Ne Radi

Proveri:
1. **To Email** u novom template-u MORA biti `{{to_email}}` (ne fiksiran email!)
2. Template ID u `email.ts` mora biti ispravan
3. Restart app nakon izmena
4. Check spam folder za user confirmation email

---

**Trajanje: 10 minuta setup** ⏱️

**Potvrda da radi: 2 emaila stižu na različite adrese** ✅

