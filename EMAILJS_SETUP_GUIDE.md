# 🚨 EmailJS Setup - 2 Template-a (Admin + User Confirmation)

## Problem
- ❌ Oba mail-a se šalju na `busines.watch.this@gmail.com`
- ❌ User confirmation mail pokazuje POGREŠNE podatke (WatchThis Team umesto korisničkog imena)
- ❌ Koristi se ISTI template za oba mail-a

## Rešenje: 2 Odvojena Template-a

---

## 📧 Template 1: ADMIN NOTIFICATION

### Korak 1: Kreiraj Novi Template
1. Idi na https://dashboard.emailjs.com/admin/templates
2. Klikni **"Create New Template"**
3. Ime template-a: **"Admin Notification - New Booking"**

### Korak 2: Template Settings

**To Email:**
```
busines.watch.this@gmail.com
```
☝️ **FIKSIRAN EMAIL** - uvek će ići na admin email

**From Name:**
```
{{from_name}}
```

**From Email:**
```
{{from_email}}
```

**Reply To:**
```
{{reply_to}}
```

**Subject:**
```
New Consultation Request from {{from_name}}
```

### Korak 3: Template Content (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #e0e0e0; }
    .label { font-weight: bold; color: #667eea; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px; }
    .value { margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px; }
    .priority { background: #fee2e2; color: #dc2626; padding: 8px 16px; border-radius: 5px; display: inline-block; font-weight: bold; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 New Consultation Request</h1>
      <p>Received from your website contact form</p>
      <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; font-size: 12px;">NEW</span>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 style="color: #333; margin-top: 0;">Client Information</h2>
        
        <div class="label">Full Name:</div>
        <div class="value">{{from_name}}</div>
        
        <div class="label">Email Address:</div>
        <div class="value"><a href="mailto:{{from_email}}" style="color: #667eea;">{{from_email}}</a></div>
        
        <div class="label">Phone Number:</div>
        <div class="value">{{phone}}</div>
        
        <div class="label">Company:</div>
        <div class="value">{{company}}</div>
      </div>
      
      <div class="section">
        <h2 style="color: #333; margin-top: 0;">Project Details</h2>
        
        <div class="label">Service Interest:</div>
        <div class="value">{{service}}</div>
        
        <div class="label">Budget Range:</div>
        <div class="value">{{budget}}</div>
        
        <div class="label">Timeline:</div>
        <div class="value">{{timeline}}</div>
        
        <div class="label">Preferred Date:</div>
        <div class="value">{{preferred_date}}</div>
        
        <div class="label">Preferred Time:</div>
        <div class="value">{{preferred_time}}</div>
      </div>
      
      <div class="section">
        <h2 style="color: #333; margin-top: 0;">Project Description</h2>
        <span class="priority">HIGH PRIORITY</span>
        <div class="value" style="white-space: pre-wrap; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px;">{{message}}</div>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: #e0e7ff; border-radius: 8px; border-left: 4px solid #667eea;">
        <p style="margin: 0; font-weight: bold; color: #4338ca;">Reply To:</p>
        <p style="margin: 5px 0 0 0;"><a href="mailto:{{reply_to}}" style="color: #667eea; font-size: 16px;">{{reply_to}}</a></p>
        
        <p style="margin: 15px 0 0 0; font-weight: bold; color: #4338ca;">Status:</p>
        <p style="margin: 5px 0 0 0;">New Request</p>
      </div>
    </div>
  </div>
</body>
</html>
```

### Korak 4: Sačuvaj Template
- Klikni **"Save"**
- **Kopiraj Template ID** (npr. `template_admin_xyz`)

---

## 📧 Template 2: USER CONFIRMATION

### Korak 1: Kreiraj Novi Template
1. Idi na https://dashboard.emailjs.com/admin/templates
2. Klikni **"Create New Template"**
3. Ime template-a: **"User Confirmation - Booking Received"**

### Korak 2: Template Settings

**To Email:**
```
{{to_email}}
```
☝️ **DINAMIČKI EMAIL** - koristi `{{to_email}}` varijablu!

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

### Korak 3: Template Content (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', Arial, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
    .content { background: #ffffff; padding: 40px 30px; }
    .booking-details { background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0; border: 2px solid #e9ecef; }
    .detail-row { display: flex; padding: 12px 0; border-bottom: 1px solid #e9ecef; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-weight: 600; color: #667eea; width: 150px; flex-shrink: 0; }
    .detail-value { color: #1d1d1f; flex: 1; }
    .footer { background: #f5f5f7; padding: 30px; text-align: center; color: #6e6e73; font-size: 14px; }
    .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .icon { font-size: 48px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="icon">✅</div>
      <h1 style="margin: 10px 0; font-size: 28px; font-weight: 600;">Thank You for Your Request!</h1>
      <p style="margin: 10px 0; font-size: 16px; opacity: 0.9;">We've received your consultation booking</p>
    </div>
    
    <div class="content">
      <p style="font-size: 16px; color: #1d1d1f;">Hello <strong>{{to_name}}</strong>,</p>
      
      <p style="font-size: 16px; line-height: 1.8;">
        Thank you for scheduling a consultation with <strong>WatchThis</strong>! 
        We have received your request and will get back to you within <strong>24 hours</strong> to confirm your consultation.
      </p>
      
      <div class="booking-details">
        <h2 style="margin: 0 0 20px 0; color: #1d1d1f; font-size: 20px;">📋 Your Booking Details</h2>
        
        <div class="detail-row">
          <div class="detail-label">Service:</div>
          <div class="detail-value">{{service}}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Preferred Date:</div>
          <div class="detail-value">{{preferred_date}}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Preferred Time:</div>
          <div class="detail-value">{{preferred_time}}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Email:</div>
          <div class="detail-value">{{to_email}}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Phone:</div>
          <div class="detail-value">{{phone}}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Company:</div>
          <div class="detail-value">{{company}}</div>
        </div>
      </div>
      
      <div style="background: #e0e7ff; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #667eea;">
        <h3 style="margin: 0 0 10px 0; color: #4338ca; font-size: 16px;">📞 What's Next?</h3>
        <ul style="margin: 10px 0; padding-left: 20px; color: #1d1d1f;">
          <li>Our team will review your request</li>
          <li>We'll confirm your consultation time within 24 hours</li>
          <li>You'll receive a calendar invite with meeting details</li>
        </ul>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">
        If you have any questions or need to make changes, please contact us at:
      </p>
      
      <p style="text-align: center;">
        <a href="mailto:busines.watch.this@gmail.com" class="button">Contact Us</a>
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 10px 0;"><strong>WatchThis Team</strong></p>
      <p style="margin: 10px 0;">
        <a href="mailto:busines.watch.this@gmail.com" style="color: #667eea; text-decoration: none;">busines.watch.this@gmail.com</a>
      </p>
      <p style="margin: 20px 0 10px 0; font-size: 12px; color: #999;">
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
```

### Korak 4: Sačuvaj Template
- Klikni **"Save"**
- **Kopiraj Template ID** (npr. `template_confirmation_xyz`)

---

## ⚙️ Update Code - Dodaj Template ID-eve

Nakon što kreiraš oba template-a, dodaj njihove ID-eve u `.env` fajl:

### Kreiraj/Ažuriraj `.env` fajl:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_3892fcn
VITE_EMAILJS_TEMPLATE_ID=template_ADMIN_ID_OVDE     # Admin notification template
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_CONFIRMATION_ID_OVDE  # User confirmation template
VITE_EMAILJS_PUBLIC_KEY=XQBwyBlw250dxXyjd
VITE_CONSULTATION_EMAIL=busines.watch.this@gmail.com
```

**Zameni:**
- `template_ADMIN_ID_OVDE` sa template ID-em za admin notification
- `template_CONFIRMATION_ID_OVDE` sa template ID-em za user confirmation

---

## 🧪 Test

### 1. Restart App
```bash
# Stop app (Ctrl+C)
yarn nx serve consultation-frontend
```

### 2. Test Booking Form
1. Idi na http://localhost:5321/booking
2. Popuni formu sa **SVOJIM email-om**
3. Submit

### 3. Expected Results

**Email 1 - Admin Notification** (busines.watch.this@gmail.com):
- ✅ To: busines.watch.this@gmail.com
- ✅ From: Radomir Popovic (korisničko ime)
- ✅ Shows: Svi korisnički podaci
- ✅ Reply-To: korisnikov email

**Email 2 - User Confirmation** (tvoj email):
- ✅ To: **tvoj-email@gmail.com** ← DINAMIČKI!
- ✅ From: WatchThis Team
- ✅ Shows: Booking details (service, date, time)
- ✅ Reply-To: busines.watch.this@gmail.com

---

## 🔍 Debugging

### Proveri Console Logs:

```javascript
// Admin email
📧 Sending admin notification to: busines.watch.this@gmail.com
✅ Admin email sent successfully!

// User confirmation
🔔 Sending confirmation email to user: tvoj-email@gmail.com
📧 Confirmation email params: {to: "tvoj-email@gmail.com", ...}
✅ Confirmation email sent successfully!
✉️  Email should arrive at: tvoj-email@gmail.com
```

### Proveri EmailJS Activity Log:
1. Idi na https://dashboard.emailjs.com/admin/activity
2. Trebalo bi da vidiš **2 poziva**:
   - Prvi: `template_admin_xyz` → busines.watch.this@gmail.com
   - Drugi: `template_confirmation_xyz` → tvoj-email@gmail.com

---

## 📝 Checklist

- [ ] Kreiran Template 1: Admin Notification
- [ ] Template 1 "To Email" = `busines.watch.this@gmail.com` (fiksiran)
- [ ] Kopiran Template 1 ID
- [ ] Kreiran Template 2: User Confirmation
- [ ] Template 2 "To Email" = `{{to_email}}` (dinamički)
- [ ] Kopiran Template 2 ID
- [ ] Ažuriran `.env` fajl sa oba template ID-a
- [ ] Restartovan app
- [ ] Testiran booking form
- [ ] Admin email stiže na busines.watch.this@gmail.com
- [ ] User confirmation stiže na korisnički email
- [ ] Oba emaila pokazuju ispravne podatke

---

## ✅ Kada Sve Radi

Trebalo bi da dobiješ:
1. **Admin email** na `busines.watch.this@gmail.com` sa svim korisničkim podacima
2. **User confirmation** na **email koji korisnik unese u formi** sa lepim confirmation message-om

---

**Ovo je jedino pravilno rešenje jer EmailJS ne može da koristi ISTI template za različite recipient email-ove!** 🎯

