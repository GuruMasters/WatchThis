# WatchThis - Apple-Style Professional Redesign Roadmap

## 🎯 Cilj Transformacije
Kreirati profesionalan, minimalistički dizajn inspirisan Apple-om sa neutralnom belom paletom, uklanjajući dekorativne elemente i nepotrebne stranice dok zadržavamo logo i reorganizujemo sadržaj za bolju UX.

---

## 📊 FAZA 1: AUDIT I PLANNING (2h)

### 1.1 Content Audit - Koje stranice zadržavamo
**ZADRŽATI (CORE):**
- ✅ Home (Homepage) - glavna landing stranica
- ✅ Services Overview - pregled svih usluga
- ✅ Contact - kontakt forma
- ✅ Booking - sistem za rezervacije
- ✅ FAQ - često postavljana pitanja

**POJEDNOSTAVITI:**
- 🔄 About Us - spojiti sve about stranice u jednu minimalistčku
  - Trenutno: about-page.tsx, about-us-page.tsx, our-team-page.tsx, mission-vision.tsx, company-values.tsx, team-section.tsx
  - NOVI: Jedna stranica "About" sa sekcijama

**UKLONITI (nepotrebne):**
- ❌ Blog Page - nije razvijen, nema sadržaja
- ❌ Careers Page - nije potrebno za consulting agenciju u ovoj fazi
- ❌ Case Studies (zasebna stranica) - integrisati u Services kao reference
- ❌ Documentation Page - internal/technical, ne za klijente
- ❌ API Reference Page - interno
- ❌ Help Center Page - integrisati u FAQ
- ❌ Community Page - nije relevantno
- ❌ Resources sekcija (kompletna) - nepotrebna za B2B consulting
- ❌ Dashboard (ako postoji za klijente) - pojednostaviti ili ukloniti

**OBAVEZNE (Legal):**
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Cookie Policy
- ✅ GDPR

### 1.2 Visual Elements Za Uklanjanje
**DEKORATIVNE SLIKE:**
- `/public/watchthis/ninja-hero.png` - ukloniti sa stranica
- `/public/watchthis/ninja-what.png` - ukloniti
- `/public/watchthis/ninja-who.png` - ukloniti
- `/public/watchthis/ninja-cta.png` - ukloniti
- Sve "Asset" PNG fajlove iz `/dizajn/` - ne koristiti

**IKONE I DEKORACIJE:**
- Strelice (ArrowRight) - zameniti sa minimalističkim alternativama ili ukloniti
- CheckCircle - zameniti sa jednostavnim checkmark-ovima
- Svi lucide-react ikoni - smanjiti upotrebu na minimum
- Animirane gradiјente - ukloniti
- Background watermark tekst ("SERVICES", "NINJA", itd.) - ukloniti

**GRADIJENTI:**
- Ukloniti sve colorful gradijente (plava→narandžasta→crna)
- Ukloniti orange/yellow gradient CTA-ove
- Ukloniti blue gradient cards

---

## 🎨 FAZA 2: NOVA COLOR PALETTE - APPLE STYLE (1h)

### 2.1 Primarna Paleta (Neutrals)
```css
/* Base Colors */
--white: #FFFFFF;              /* Glavna pozadina */
--off-white: #FAFAFA;          /* Blago svetlija za sections */
--light-gray: #F5F5F7;         /* Apple off-white */
--gray-50: #F9FAFB;            /* Kartice, hover */
--gray-100: #F3F4F6;           /* Borders, subtle containers */
--gray-200: #E5E7EB;           /* Dividers */
--gray-300: #D1D5DB;           /* Borders */
--gray-400: #9CA3AF;           /* Disabled text */
--gray-500: #6B7280;           /* Secondary text */
--gray-600: #4B5563;           /* Body text */
--gray-700: #374151;           /* Headings */
--gray-800: #1F2937;           /* Primary text */
--gray-900: #111827;           /* Darkest text, headers */
--black: #000000;              /* Pure black - rijetko */

/* Accent Colors - Minimalistički */
--accent-blue: #0071E3;        /* Apple blue - primarni akcent za linkove */
--accent-blue-hover: #0077ED;  /* Hover state */
--accent-green: #34C759;       /* Success states (bookings, confirmations) */
--accent-red: #FF3B30;         /* Errors, warnings */

/* Logo Colors - ZADRŽATI ORIGINALNE */
--logo-yellow: #FBC314;        /* Samo za logo */
--logo-orange: #DD5E23;        /* Samo za logo */
--logo-blue: #0081C5;          /* Samo za logo (može i kao link alternativa) */
```

### 2.2 Typografija - Apple Style
```css
/* Font Stack */
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
--font-display: "SF Pro Display", -apple-system, sans-serif;

/* Font Sizes - Responsive Scale */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### 2.3 Spacing - Consistent System
```css
/* Apple uses 8px base unit */
--spacing-1: 0.5rem;   /* 8px */
--spacing-2: 1rem;     /* 16px */
--spacing-3: 1.5rem;   /* 24px */
--spacing-4: 2rem;     /* 32px */
--spacing-5: 2.5rem;   /* 40px */
--spacing-6: 3rem;     /* 48px */
--spacing-8: 4rem;     /* 64px */
--spacing-10: 5rem;    /* 80px */
--spacing-12: 6rem;    /* 96px */
--spacing-16: 8rem;    /* 128px */
--spacing-20: 10rem;   /* 160px */
```

### 2.4 Shadows - Subtle Depth
```css
/* Apple-style subtle shadows */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### 2.5 Border Radius
```css
--radius-sm: 6px;      /* Buttons, small elements */
--radius-md: 12px;     /* Cards, containers */
--radius-lg: 18px;     /* Large cards */
--radius-xl: 24px;     /* Hero sections */
--radius-full: 9999px; /* Pills, tags */
```

---

## 🏗️ FAZA 3: COMPONENT REDESIGN (6-8h)

### 3.1 Navigation / Header
**TRENUTNO:** Colorful sa ninja slikama i multiple colors
**NOVO:**
```typescript
// Clean white header with subtle shadow
<header style={{
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--gray-200)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
}}>
  {/* Logo - ZADRŽATI ORIGINAL */}
  {/* Clean navigation links - gray-600 text, blue hover */}
  {/* Single CTA button - minimal blue */}
</header>
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/components/layout/header.tsx` (ili navigation.tsx)
- Boje: white background, gray-600 text, accent-blue za hover
- Logo: zadržati original watchthis logo (sa bojama)
- Linkovi: Services, About, FAQ, Contact, Booking
- CTA: "Get Started" button - blue outline ili solid blue

### 3.2 Hero Section - Homepage
**TRENUTNO:** Colorful gradient background, ninja characters, large typography
**NOVO:**
```typescript
// Apple-style hero: white background, large text, minimal
<section style={{
  background: 'var(--white)',
  padding: '120px 24px 80px',
  textAlign: 'center'
}}>
  <h1 style={{
    fontSize: 'clamp(40px, 6vw, 80px)',
    fontWeight: 700,
    color: 'var(--gray-900)',
    lineHeight: 1.1,
    marginBottom: '24px',
    letterSpacing: '-0.015em'
  }}>
    Transform Your Digital Presence
  </h1>
  <p style={{
    fontSize: '21px',
    color: 'var(--gray-600)',
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: 1.5
  }}>
    Expert consulting, development, and marketing solutions for modern businesses.
  </p>
  {/* Single blue CTA button */}
  {/* NO ninja images, NO colorful backgrounds */}
</section>
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/pages/home/hero-section.tsx`
- Ukloniti: ninja slike, gradient backgrounds, pill tags, accent bars
- Boje: white background, gray-900 headings, gray-600 body text
- CTA: Jedan button "Get Started" - blue

### 3.3 Services Overview
**TRENUTNO:** Colorful cards sa ninja slikama, gradients, icons
**NOVO:**
```typescript
// Clean service cards - white on light-gray background
<section style={{
  background: 'var(--light-gray)',
  padding: '80px 24px'
}}>
  <h2 style={{
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 700,
    color: 'var(--gray-900)',
    textAlign: 'center',
    marginBottom: '64px'
  }}>
    Our Services
  </h2>
  
  <div className="services-grid">
    {/* 3 ili 4 service cards */}
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      padding: '40px',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all 0.3s ease'
    }}>
      {/* Minimal icon (single color) or no icon */}
      <h3 style={{
        fontSize: '28px',
        fontWeight: 600,
        color: 'var(--gray-900)',
        marginBottom: '16px'
      }}>
        Web & App Development
      </h3>
      <p style={{
        fontSize: '17px',
        color: 'var(--gray-600)',
        lineHeight: 1.6,
        marginBottom: '24px'
      }}>
        Custom software solutions...
      </p>
      {/* Simple "Learn more →" link (blue) */}
    </div>
  </div>
</section>
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/pages/home/services-overview.tsx`
- Ukloniti: ninja images, colorful backgrounds, gradients, technology badges, checkmarks
- Grid: 2 kolone na desktop, 1 na mobile
- Cards: white sa subtle shadow, hover: slight lift + shadow increase
- Icons: Minimal ili bez njih
- Services:
  1. Web & App Development
  2. SEO & Paid Media
  3. Business Consulting
  4. Support & Maintenance

### 3.4 Service Detail Pages
**TRENUTNO:** Full-screen colorful sections, ninja images, watermarks
**NOVO:**
```typescript
// Clean detail page layout
<main style={{ background: 'var(--white)' }}>
  {/* Hero */}
  <section style={{
    padding: '120px 24px 60px',
    textAlign: 'center',
    borderBottom: '1px solid var(--gray-200)'
  }}>
    <h1>Web & App Development</h1>
    <p>Professional software solutions for your business</p>
  </section>
  
  {/* Features - Simple list */}
  <section style={{ padding: '80px 24px' }}>
    <h2>What We Offer</h2>
    <div className="features-grid">
      {/* Clean feature items - text only or with minimal icon */}
    </div>
  </section>
  
  {/* CTA */}
  <section style={{
    padding: '80px 24px',
    background: 'var(--light-gray)',
    textAlign: 'center'
  }}>
    <h2>Ready to start?</h2>
    <Button>Get in touch</Button>
  </section>
</main>
```

**Implementacija:**
- Fajlovi:
  - `application-development-page.tsx`
  - `digital-marketing-page.tsx`
  - `business-consulting-page.tsx`
  - `support-maintenance-page.tsx`
- Ukloniti: sve ninja images, colorful backgrounds, technology badges, watermarks
- Layout: Single column, white background, clean sections
- Typography: Large headings (gray-900), body text (gray-600)

### 3.5 Buttons
**TRENUTNO:** Yellow/orange gradients sa shadow-box style
**NOVO:**
```typescript
// Primary Button - Blue
const primaryButtonStyle = {
  background: 'var(--accent-blue)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '17px',
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    background: 'var(--accent-blue-hover)',
    transform: 'translateY(-1px)',
    boxShadow: 'var(--shadow-md)'
  }
};

// Secondary Button - Outline
const secondaryButtonStyle = {
  background: 'transparent',
  color: 'var(--accent-blue)',
  padding: '12px 24px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '17px',
  fontWeight: 600,
  border: '1px solid var(--accent-blue)',
  cursor: 'pointer'
};
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/components/ui/button.tsx`
- Varijante: primary (blue solid), secondary (blue outline), ghost (text only)
- Ukloniti: yellow/orange colors, shadow-box style, uppercase text
- Stil: Apple-style rounded, clean, subtle hover states

### 3.6 Stats/Numbers Section
**TRENUTNO:** Colorful gradient cards sa ikonama
**NOVO:**
```typescript
// Minimal stats - just numbers and labels
<section style={{
  padding: '80px 24px',
  background: 'var(--white)',
  borderTop: '1px solid var(--gray-200)',
  borderBottom: '1px solid var(--gray-200)'
}}>
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '48px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  }}>
    <div>
      <div style={{
        fontSize: '56px',
        fontWeight: 700,
        color: 'var(--gray-900)',
        marginBottom: '8px'
      }}>
        200+
      </div>
      <div style={{
        fontSize: '17px',
        color: 'var(--gray-600)'
      }}>
        Projects Completed
      </div>
    </div>
    {/* Repeat for other stats */}
  </div>
</section>
```

**Implementacija:**
- Ukloniti: ikone, colorful backgrounds, gradient cards
- Stil: Pure text, numbers bold and large, labels smaller
- Layout: Horizontal grid, clean dividers

### 3.7 Testimonials
**TRENUTNO:** Colorful cards sa slikama
**NOVO:**
```typescript
// Apple-style testimonials - minimal quote cards
<section style={{
  padding: '120px 24px',
  background: 'var(--light-gray)'
}}>
  <h2 style={{ textAlign: 'center', marginBottom: '80px' }}>
    What Our Clients Say
  </h2>
  
  <div className="testimonials-grid">
    <blockquote style={{
      background: 'white',
      padding: '48px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      fontSize: '21px',
      lineHeight: 1.6,
      color: 'var(--gray-800)'
    }}>
      <p>"Exceptional service and results..."</p>
      <footer style={{
        marginTop: '32px',
        fontSize: '17px',
        color: 'var(--gray-600)'
      }}>
        <strong>John Doe</strong>, CEO at Company
      </footer>
    </blockquote>
  </div>
</section>
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/pages/home/testimonials.tsx`
- Ukloniti: profile pictures, star ratings, colorful backgrounds
- Stil: Clean quote cards, white on light gray, simple attribution
- Layout: 2-3 columns on desktop, 1 on mobile

### 3.8 Contact Form
**TRENUTNO:** Colorful styling
**NOVO:**
```typescript
// Clean Apple-style form
<form style={{
  maxWidth: '600px',
  margin: '0 auto',
  padding: '48px',
  background: 'white',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)'
}}>
  <input style={{
    width: '100%',
    padding: '16px',
    fontSize: '17px',
    border: '1px solid var(--gray-300)',
    borderRadius: 'var(--radius-sm)',
    marginBottom: '16px',
    transition: 'all 0.2s ease',
    ':focus': {
      outline: 'none',
      borderColor: 'var(--accent-blue)',
      boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)'
    }
  }} />
  {/* More fields */}
  <button type="submit" style={primaryButtonStyle}>
    Send Message
  </button>
</form>
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/pages/contact/contact-page.tsx`
- Ukloniti: colorful inputs, gradients
- Stil: Clean white form, subtle borders, blue focus states
- Validation: Inline errors in red (--accent-red)

### 3.9 Footer
**TRENUTNO:** Colorful multi-section footer
**NOVO:**
```typescript
// Minimal Apple-style footer
<footer style={{
  background: 'var(--light-gray)',
  borderTop: '1px solid var(--gray-200)',
  padding: '80px 24px 40px'
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {/* Logo */}
    <div style={{ marginBottom: '48px' }}>
      <img src="/watchthis/logo.svg" alt="WatchThis" style={{ height: '32px' }} />
    </div>
    
    {/* Links grid - minimal sections */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '48px',
      marginBottom: '64px'
    }}>
      <div>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--gray-900)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px'
        }}>
          Services
        </h3>
        <ul>
          <li><a href="/services/development">Development</a></li>
          <li><a href="/services/marketing">Marketing</a></li>
          {/* ... */}
        </ul>
      </div>
      {/* More sections */}
    </div>
    
    {/* Copyright */}
    <div style={{
      paddingTop: '32px',
      borderTop: '1px solid var(--gray-200)',
      fontSize: '14px',
      color: 'var(--gray-500)',
      textAlign: 'center'
    }}>
      © 2025 WatchThis. All rights reserved.
    </div>
  </div>
</footer>
```

**Implementacija:**
- Fajl: `libs/consultation/frontend/pages/home/footer.tsx`
- Ukloniti: colorful backgrounds, icons, social media icons (ili minimal)
- Sekcije: Services, Company (About, Contact), Legal
- Stil: Light gray background, minimal sections, clean typography

---

## 📄 FAZA 4: PAGE CLEANUP & ORGANIZATION (4h)

### 4.1 Pages To Delete
**Action: DELETE FILES**
```bash
# About pages - merge into one
rm libs/consultation/frontend/pages/about/blog-page.tsx
rm libs/consultation/frontend/pages/about/careers-page.tsx
rm libs/consultation/frontend/pages/about/case-studies-page.tsx
rm libs/consultation/frontend/pages/about/mission-vision.tsx
rm libs/consultation/frontend/pages/about/company-values.tsx
rm libs/consultation/frontend/pages/about/team-section.tsx
rm libs/consultation/frontend/pages/about/mission-vision.tsx.backup
rm libs/consultation/frontend/pages/about/company-values.tsx.backup

# Resources pages - not needed
rm libs/consultation/frontend/pages/resources/documentation-page.tsx
rm libs/consultation/frontend/pages/resources/api-reference-page.tsx
rm libs/consultation/frontend/pages/resources/help-center-page.tsx
rm libs/consultation/frontend/pages/resources/community-page.tsx
rm -rf libs/consultation/frontend/pages/resources/

# Dashboard - if client-facing
# Evaluate: rm -rf libs/consultation/frontend/pages/dashboard/

# Admin - if unused
# rm -rf libs/consultation/frontend/pages/admin/

# Chat - if not implemented
# rm -rf libs/consultation/frontend/pages/chat/
```

### 4.2 Pages To Merge/Simplify
**About Page - Single Unified Page**
- Fajl: `libs/consultation/frontend/pages/about/about-page.tsx`
- Sadržaj:
  1. Hero: "About WatchThis"
  2. Mission/Vision (2-3 paragrafa)
  3. Team (opciono - 3-4 key people sa slikama)
  4. Contact CTA
- Stil: White background, clean sections, minimal

**Services Page**
- Fajl: `libs/consultation/frontend/pages/services/services-page.tsx`
- Sadržaj: Grid of 4 services sa linkom na detail pages
- Ukloniti: service-categories.tsx (prevelik i colorful)
- Ukloniti: services-messaging.tsx, services-portfolio.tsx, services-price-calculator.tsx, services-quick-actions.tsx, services-stats-overview.tsx (nepotrebno)

### 4.3 Update Routing
**Fajl: `consultation-frontend/src/app/app.tsx`**
```typescript
// Remove routes:
- /about/our-team
- /about/case-studies
- /about/blog
- /about/careers
- /resources/* (all)

// Keep routes:
- / (home)
- /services
- /services/:serviceId (4 detail pages)
- /about (single page)
- /faq
- /contact
- /booking
- /legal/* (all 4)
```

### 4.4 Update Navigation
**Header links:**
```typescript
const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
];
```

**Footer links:**
```typescript
const footerSections = [
  {
    title: 'Services',
    links: [
      { label: 'Web & App Development', href: '/services/application-development' },
      { label: 'SEO & Paid Media', href: '/services/digital-marketing' },
      { label: 'Business Consulting', href: '/services/business-consulting' },
      { label: 'Support & Maintenance', href: '/services/support-maintenance' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
      { label: 'Terms of Service', href: '/legal/terms-of-service' },
      { label: 'Cookie Policy', href: '/legal/cookie-policy' },
      { label: 'GDPR', href: '/legal/gdpr' }
    ]
  }
];
```

---

## 🎨 FAZA 5: CSS SYSTEM UPDATE (3h)

### 5.1 Update Color Tokens
**Fajl: `consultation-frontend/src/styles/base/colors.css`**
```css
:root {
  /* Neutrals */
  --white: #FFFFFF;
  --off-white: #FAFAFA;
  --light-gray: #F5F5F7;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  --black: #000000;
  
  /* Accents */
  --accent-blue: #0071E3;
  --accent-blue-hover: #0077ED;
  --accent-green: #34C759;
  --accent-red: #FF3B30;
  
  /* Logo colors - preserve */
  --logo-yellow: #FBC314;
  --logo-orange: #DD5E23;
  --logo-blue: #0081C5;
  
  /* Semantic tokens */
  --color-background: var(--white);
  --color-background-secondary: var(--light-gray);
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-500);
  --color-border: var(--gray-200);
  --color-border-strong: var(--gray-300);
  
  /* Interactive */
  --color-link: var(--accent-blue);
  --color-link-hover: var(--accent-blue-hover);
  --color-button-primary-bg: var(--accent-blue);
  --color-button-primary-text: white;
  --color-button-secondary-bg: transparent;
  --color-button-secondary-text: var(--accent-blue);
  --color-button-secondary-border: var(--accent-blue);
  
  /* Feedback */
  --color-success: var(--accent-green);
  --color-error: var(--accent-red);
}
```

### 5.2 Update Typography
**Fajl: `consultation-frontend/src/styles/base/typography.css`**
```css
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
  --font-display: "SF Pro Display", -apple-system, sans-serif;
  
  /* Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;
  
  /* Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
  letter-spacing: -0.015em;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
}

h2 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

h3 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
}

p {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

a {
  color: var(--color-link);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-link-hover);
}
```

### 5.3 Update Spacing
**Fajl: `consultation-frontend/src/styles/base/spacing.css`**
```css
:root {
  --spacing-1: 0.5rem;   /* 8px */
  --spacing-2: 1rem;     /* 16px */
  --spacing-3: 1.5rem;   /* 24px */
  --spacing-4: 2rem;     /* 32px */
  --spacing-5: 2.5rem;   /* 40px */
  --spacing-6: 3rem;     /* 48px */
  --spacing-8: 4rem;     /* 64px */
  --spacing-10: 5rem;    /* 80px */
  --spacing-12: 6rem;    /* 96px */
  --spacing-16: 8rem;    /* 128px */
  --spacing-20: 10rem;   /* 160px */
  
  /* Semantic spacing */
  --spacing-section-sm: var(--spacing-10);
  --spacing-section-md: var(--spacing-12);
  --spacing-section-lg: var(--spacing-16);
  --spacing-section-xl: var(--spacing-20);
}

/* Container */
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-3);
  padding-right: var(--spacing-3);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
}
```

### 5.4 Update Shadows & Effects
**Fajl: `consultation-frontend/src/styles/utilities/interactive.css` (ili novi effects.css)**
```css
:root {
  /* Shadows */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}

/* Card hover effect */
.card-hover {
  transition: all var(--transition-base);
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### 5.5 Remove Old Styles
**DELETE or CLEAN:**
```bash
# Remove animations that are too flashy
# Edit: consultation-frontend/src/styles/animations/classes.css
# Remove: bounce-gentle, pulse, gradient animations

# Clean component styles
# Edit: consultation-frontend/src/styles/components/buttons.css
# Remove: all yellow/orange gradient styles, shadow-box styles

# Clean card styles
# Edit: consultation-frontend/src/styles/components/cards.css
# Remove: colorful backgrounds, gradient cards
```

---

## 🗑️ FAZA 6: ASSET CLEANUP (1h)

### 6.1 Images To Remove/Archive
```bash
# Archive ninja images (don't delete, just move out of public)
mkdir -p consultation-booking/dizajn/archive
mv consultation-booking/consultation-frontend/public/watchthis/ninja-*.png consultation-booking/dizajn/archive/
mv consultation-booking/public/watchthis/ninja-*.png consultation-booking/dizajn/archive/

# Archive design assets
mv consultation-booking/dizajn/Asset*.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/BGD*.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/Ninja*.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/*Button.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/x.png consultation-booking/dizajn/archive/
```

### 6.2 Logo - Keep Original
**ZADRŽATI:**
- `consultation-frontend/public/watchthis/logo-new.png`
- `dizajn/watch-this-logo.svg`
- `dizajn/Logo-new.png`

**KORISTITI:**
- Logo sa original bojama (#FBC314 yellow, #DD5E23 orange, #0081C5 blue)
- Bela varijanta za dark backgrounds (ako postoji ili kreirati)

---

## ✅ FAZA 7: TESTING & REFINEMENT (2h)

### 7.1 Cross-Browser Testing
- Chrome
- Safari
- Firefox
- Edge

### 7.2 Responsive Testing
- Mobile (375px - 414px)
- Tablet (768px - 1024px)
- Desktop (1280px+)
- Large Desktop (1920px+)

### 7.3 Accessibility Check
- Keyboard navigation
- Screen reader compatibility
- Color contrast (WCAG AA minimum)
- Focus visible states

### 7.4 Performance
- Remove unused CSS
- Optimize loading (no heavy images)
- Check font loading

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Foundation (2-3h)
- [ ] Create new color tokens CSS file
- [ ] Update typography CSS
- [ ] Update spacing CSS
- [ ] Update button component
- [ ] Archive ninja images
- [ ] Create new header/navigation component

### Phase 2: Core Pages (4-5h)
- [ ] Redesign Homepage hero section
- [ ] Redesign Services overview
- [ ] Redesign Stats section
- [ ] Redesign Testimonials
- [ ] Redesign Footer
- [ ] Update Contact page form

### Phase 3: Service Pages (3-4h)
- [ ] Redesign Application Development page
- [ ] Redesign Digital Marketing page
- [ ] Redesign Business Consulting page
- [ ] Redesign Support & Maintenance page

### Phase 4: Content Cleanup (2-3h)
- [ ] Merge About pages into single page
- [ ] Delete Blog, Careers, Case Studies pages
- [ ] Delete Resources section entirely
- [ ] Update routing in app.tsx
- [ ] Update navigation links
- [ ] Update footer links

### Phase 5: Polish (2h)
- [ ] Review all pages for consistency
- [ ] Test responsive behavior
- [ ] Check accessibility
- [ ] Remove unused CSS files
- [ ] Update README with new design system

---

## 📊 BEFORE/AFTER COMPARISON

### Before:
- ❌ Colorful gradients (blue → orange → black)
- ❌ Ninja character images everywhere
- ❌ Multiple decorative elements (arrows, badges, watermarks)
- ❌ 15+ pages (many unused/unnecessary)
- ❌ Inconsistent color usage
- ❌ "Playful ninja" branding

### After:
- ✅ Clean white/gray neutral palette
- ✅ No decorative images (logo only)
- ✅ Minimal icons and elements
- ✅ 8 core pages (streamlined)
- ✅ Consistent Apple-style design system
- ✅ Professional, enterprise-ready branding

---

## 🎯 SUCCESS METRICS

1. **Visual Consistency:** All pages follow same color/typography system
2. **Load Performance:** < 2s initial load (no heavy images)
3. **Accessibility:** WCAG AA compliance minimum
4. **Mobile First:** Perfect mobile experience
5. **Professional Feel:** Comparable to Apple, Stripe, Linear design quality

---

## 📚 REFERENCE INSPIRATION

**Apple.com:**
- Clean white backgrounds
- Large, bold typography
- Subtle shadows and depth
- Generous white space
- Minimal navigation

**Stripe.com:**
- Professional blue accent
- Clean product cards
- Simple animations
- Clear hierarchy

**Linear.app:**
- Modern minimalist
- Subtle gradients (but much more minimal than current)
- Perfect typography
- Clean layouts

---

## 🔗 NEXT STEPS AFTER ROADMAP

1. **Review & Approve:** Korisnik pregleda plan i daje zeleno svetlo
2. **Start Implementation:** Kreće se od Phase 1 (Foundation)
3. **Iterative Development:** Phase by phase sa review nakon svake
4. **Testing:** Cross-browser i device testing
5. **Launch:** Deploy nove verzije

---

**Estimated Total Time:** 18-22 hours
**Priority:** High - Complete visual overhaul
**Impact:** Professional, enterprise-ready appearance

---

_Created: October 15, 2025_
_Version: 1.0_
_Status: READY FOR IMPLEMENTATION_






