# EmailJS Setup - Instrukcije za Confirmation Emails

## 🎯 Cilj
Sistem treba da šalje **2 emaila** kada korisnik pošalje formu:
1. **Admin email** → `busines.watch.this@gmail.com` (detalji rezervacije)
2. **User confirmation** → Korisnički email (potvrda prijema)

## ⚠️ Trenutni Problem
EmailJS šalje samo **jedan email** koristeći jedan template. Da bi poslali 2 različita emaila, potrebna su **2 odvojena poziva** EmailJS-u.

## ✅ Rešenje - Podešavanje EmailJS Template-a

### Template Variables (Obavezno!)

Tvoj EmailJS template **MORA** da ima sledeće variable-e:

```
{{to_email}}         - Email primaoca (može biti admin ili user)
{{to_name}}          - Ime primaoca
{{from_name}}        - Ime pošiljaoca
{{from_email}}       - Email pošiljaoca
{{reply_to}}         - Reply-to email
{{subject}}          - Subject line
{{message}}          - Glavna poruka (može biti dugačak tekst)
{{service}}          - Tip servisa
{{preferred_date}}   - Željeni datum
{{preferred_time}}   - Željeno vreme
{{phone}}            - Telefon
{{company}}          - Kompanija
{{user_message}}     - Korisnička poruka/opis projekta
```

### Preporučeni Template Format

#### Option 1: Jednostavan Text Template
```
To: {{to_email}}
From: {{from_name}}
Reply-To: {{reply_to}}

Hello {{to_name}},

{{message}}

---
Service: {{service}}
Preferred Date: {{preferred_date}}
Preferred Time: {{preferred_time}}
Phone: {{phone}}
Company: {{company}}

Customer Message:
{{user_message}}

---
Best regards,
WatchThis Team
```

#### Option 2: HTML Template (Lepši)
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: white; padding: 20px; border-radius: 10px; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 10px; }
        .detail { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #8B5CF6; }
        .footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>WatchThis Consultation</h2>
        </div>
        
        <div class="content">
            <p>Hello <strong>{{to_name}}</strong>,</p>
            
            <p>{{message}}</p>
            
            <div class="detail">
                <strong>📋 Booking Details:</strong><br>
                Service: {{service}}<br>
                Preferred Date: {{preferred_date}}<br>
                Preferred Time: {{preferred_time}}<br>
                Phone: {{phone}}<br>
                Company: {{company}}
            </div>
            
            {{#if user_message}}
            <div class="detail">
                <strong>💬 Customer Message:</strong><br>
                {{user_message}}
            </div>
            {{/if}}
        </div>
        
        <div class="footer">
            <p>WatchThis - Professional Consulting Services</p>
            <p>Questions? Contact us at: busines.watch.this@gmail.com</p>
        </div>
    </div>
</body>
</html>
```

## 📝 Korak-po-Korak Setup

### 1. Login na EmailJS
https://dashboard.emailjs.com/

### 2. Proveri Email Service
- Idi na **Email Services**
- Proveri da li postoji servis sa ID: `service_3892fcn`
- Ako ne postoji, kreiraj novi i ažuriraj ID u kodu

### 3. Proveri/Ažuriraj Template
- Idi na **Email Templates**
- Otvori template sa ID: `template_kqooxjc`
- **Proveri da template ima SVE variable iz liste gore!**

### 4. Test Template
Klikni na "Test it" dugme i proveri sa ovim test podacima:

```json
{
  "to_email": "your-test-email@gmail.com",
  "to_name": "Test User",
  "from_name": "WatchThis Team",
  "from_email": "noreply@watchthis.com",
  "reply_to": "busines.watch.this@gmail.com",
  "subject": "Test Consultation Request",
  "message": "Thank you for scheduling a consultation!\n\nYour booking details are below.",
  "service": "Web Development",
  "preferred_date": "2025-01-15",
  "preferred_time": "14:00",
  "phone": "+123456789",
  "company": "Test Company",
  "user_message": "I need a website for my business."
}
```

### 5. Proveri da Email Stiže
- Proveri inbox
- Proveri spam folder
- Proveri da sve variable-e imaju vrednosti

## 🔍 Debugging

### Check Browser Console
Otvori DevTools (F12) → Console tab

Trebalo bi da vidiš:
```
🔔 Sending confirmation email to user: user@email.com
📧 Sending confirmation email with data: {to: "user@email.com", name: "John Doe", ...}
✅ Confirmation email sent successfully to user: {status: 200, ...}
```

Ako vidiš error:
```
❌ Failed to send confirmation email: Error: ...
```

### Česti Problemi

#### Problem: Email se ne šalje
**Rešenje:**
1. Proveri EmailJS credentials u `email.ts`
2. Proveri da li je template aktivan
3. Proveri quota limit na EmailJS dashboard-u

#### Problem: Email stiže ali je prazan
**Rešenje:**
1. Template ne koristi variable pravilno
2. Proveri da template ima `{{message}}`, `{{service}}`, itd.
3. Ne koristi `{{{variable}}}` (3 brackets) već `{{variable}}` (2 brackets)

#### Problem: Stigne samo jedan email (admin ili user)
**Rešenje:**
1. Kod šalje 2 odvojena poziva - proveri console log
2. Prvi poziv: `to_email: busines.watch.this@gmail.com` (admin)
3. Drugi poziv: `to_email: formData.email` (user)
4. Ako vidiš samo jedan poziv, proveri da `sendConfirmationEmail()` se poziva

## 🧪 Kako Testirati

### Test 1: Booking Form
```bash
# Pokreni aplikaciju
yarn nx serve consultation-frontend

# Otvori u browseru
http://localhost:5321/booking

# Popuni formu sa SVOJIM email-om
# Submit formu
# Check email - trebalo bi da stignu 2 emaila:
#   1. Na busines.watch.this@gmail.com (admin)
#   2. Na tvoj email (confirmation)
```

### Test 2: Contact Form
```bash
# Otvori contact stranu
http://localhost:5321/contact

# Popuni formu sa SVOJIM email-om
# Submit formu
# Check email - trebalo bi da stignu 2 emaila:
#   1. Na busines.watch.this@gmail.com (admin)  
#   2. Na tvoj email (confirmation)
```

## 📊 Expected Results

### Admin Email (1st email)
```
To: busines.watch.this@gmail.com
From: John Doe (user@email.com)
Subject: (depends on template)

[Details of booking/contact request]
Service: Web Development
Date: 2025-01-15
Time: 14:00
Message: [User's message]
```

### User Confirmation Email (2nd email)
```
To: user@email.com
From: WatchThis Team
Reply-To: busines.watch.this@gmail.com
Subject: Consultation Request Received

Thank you for scheduling a consultation with WatchThis!

Your Booking Details:
- Service: Web Development
- Preferred Date: 2025-01-15
- Preferred Time: 14:00
- Email: user@email.com
- Phone: +123456789

We have received your request and will get back to you 
within 24 hours to confirm your consultation.

Questions? Contact us at: busines.watch.this@gmail.com

Best regards,
The WatchThis Team
```

## 🚀 Production Checklist

- [ ] EmailJS template ima SVE potrebne variable
- [ ] Test poslao formu sa svojim email-om
- [ ] Primio oba email-a (admin + user confirmation)
- [ ] Email nije u spam folderu
- [ ] Reply-to radi ispravno
- [ ] Message formatting je čitljiv
- [ ] Nema praznih variable-a u email-u

## 💡 Pro Tips

1. **Koristi HTML template** za lepši izgled
2. **Dodaj company logo** u email template
3. **Test sa različitim email providerima** (Gmail, Outlook, Yahoo)
4. **Check spam score** - koristi https://www.mail-tester.com
5. **Setup proper "From" email** - Koristi pravi domain (ne gmail)

## 📞 Support

Ako i dalje ne radi:
1. Check EmailJS dashboard za error logs
2. Check browser console za error messages
3. Verifikuj da su environmental variables postavljene
4. Proveri quota limit na EmailJS account-u

