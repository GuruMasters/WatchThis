# 🎨 WATCHTHIS CSS REDESIGN - DETALJAN ROADMAP

## 📊 ANALIZA TRENUTNOG STANJA

### ❌ PROBLEMI:
1. **Bele pozadine** umesto brand plavih (#0081C5)
2. **Nedostaju watermark tekstovi** ("watch" velika slova u pozadini)
3. **Nema ninja ilustracija** sa soft glow efektima
4. **Dijagonalni iseci** (yellow/blue wedges) nisu dovoljno izraženi
5. **Button stilovi** nisu u skladu sa Figma dizajnom
6. **Tipografija** ne koristi bold uppercase stil
7. **Scribble arrows** (bele strelice) nisu implementirane

---

## 🎯 FIGMA DIZAJN - KLJUČNI ELEMENTI

### 1. **HERO SEKCIJA** (Glavna Stranica)
```
├── Pozadina: #0081C5 (Primary Blue) + radial-gradient overlay
├── Watermark: "WATCH" - veliki, transparent, rotated -10deg
├── Naslov: "WATCH YOUR BRAND GOES WHOOSH!"
│   ├── Font: Bold/Black, Uppercase
│   ├── "YOUR" / "GOES" = White
│   └── "BRAND" / "WHOOSH!" = #FBC314 (Yellow)
├── Ninja: ninja-hero.png (desno), yellow circle bg, soft blue glow
├── CTA Button: Primary yellow (#FBC314), rounded-full, shadow
└── Dijagonalni isek: Yellow wedge na dnu (clip-path)
```

### 2. **FAQ SEKCIJA** (Žuta Pozadina)
```
├── Pozadina: #FBC314 (Primary Yellow)
├── Watermark: "FAQ" - veliki, crn, transparent
├── Naslov: "FAQ" - Bold, Black (#111111)
├── Scribble Arrow: White curved arrow (asset-3@4x-1.png)
├── Dijagonalni iseci: 
│   ├── Plavi wedge gore (clip-path polygon top)
│   └── Crni wedge dole (clip-path polygon bottom)
└── Content: Black text on yellow
```

### 3. **SERVICES GRID** (Mix Sekcija)
```
├── Orange Block (#DD5E23): "NEED A FRESH DIGITAL PRESENCE?"
├── Yellow Block (#FBC314): "WANT TO DISRUPT YOUR INDUSTRY?"
├── Blue Block (#0081C5): "WHO ARE WE?" + Ninja illustration
├── Black Block (#111111): "BRANDING & CREATIVE"
└── Svaki blok: Uppercase bold text, scribble arrows, ninja ilustracije
```

### 4. **CTA SEKCIJA** (Black Background)
```
├── Pozadina: #111111 (Primary Black)
├── Ninja: ninja-cta.png (toilet ninja) sa yellow circle
├── Naslov: "READY TO TRANSFORM YOUR BRAND?"
│   ├── "YOUR BRAND?" = #FBC314 (Yellow)
│   └── Ostalo = White
├── Button: Primary Yellow, rounded, shadow
└── Scribble arrows: White decorative arrows
```

---

## 🚀 IMPLEMENTACIONI PLAN - 6 KORAKA

### **KORAK 1: AŽURIRANJE TAILWIND @THEME** ✅ (Već uradjeno)
Tailwind v4 konfiguracija sa WatchThis bojama.

**Status:** ✅ Kompletiran

---

### **KORAK 2: TIPOGRAFIJA & FONT SIZES**

#### 2.1 Font Family Setup
```css
/* main.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

@theme {
  /* Dodaj font family */
  --font-family-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

body {
  font-family: var(--font-family-body);
}
```

#### 2.2 Heading Styles (Figma Matching)
```css
/* Utility klase za hero naslove */
.wt-heading-hero {
  font-family: var(--font-family-display);
  font-size: clamp(2.5rem, 7vw, 5rem); /* 40px → 80px */
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.wt-heading-section {
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 5vw, 3.5rem); /* 32px → 56px */
  font-weight: 800;
  line-height: 1.2;
  text-transform: uppercase;
}

.wt-heading-card {
  font-family: var(--font-family-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem); /* 24px → 36px */
  font-weight: 700;
  line-height: 1.3;
  text-transform: uppercase;
}

.wt-body-lg {
  font-size: 1.125rem; /* 18px */
  font-weight: 400;
  line-height: 1.7;
}
```

**Gde primjeniti:**
- `hero-section.tsx` → Dodaj `.wt-heading-hero` na `<h1>`
- `WTPageHero.tsx` → Dodaj `.wt-heading-hero`
- Sve sekcije → Dodaj `.wt-heading-section` na `<h2>`

---

### **KORAK 3: BUTTON KOMPONENTE - FIGMA EXACT MATCH**

#### 3.1 Primary Button (Yellow)
```tsx
// libs/consultation/frontend/components/ui/button.tsx

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-base font-black uppercase tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: [
          // Primary Yellow Button (Figma: primary-button.png)
          "bg-wt-yellow text-wt-black",
          "shadow-[0_6px_0_0_#EFAF13,0_10px_20px_-5px_rgba(251,195,20,0.5)]", // 3D shadow
          "hover:shadow-[0_4px_0_0_#EFAF13,0_8px_16px_-3px_rgba(251,195,20,0.6)]",
          "hover:translate-y-[2px]", // Push down effect
          "active:translate-y-[6px]",
          "active:shadow-[0_0_0_0_#EFAF13]",
        ],
        secondary: [
          // Black Button (Figma: secondary-button.png top)
          "bg-wt-black text-white",
          "shadow-[0_6px_0_0_#000000,0_10px_20px_-5px_rgba(17,17,17,0.4)]",
          "hover:shadow-[0_4px_0_0_#000000,0_8px_16px_-3px_rgba(17,17,17,0.5)]",
          "hover:translate-y-[2px]",
          "active:translate-y-[6px]",
          "active:shadow-[0_0_0_0_#000000]",
        ],
        inverse: [
          // White Button (Figma: secondary-button.png bottom)
          "bg-white text-wt-black border-2 border-gray-200",
          "shadow-[0_6px_0_0_#E5E7EB,0_10px_20px_-5px_rgba(0,0,0,0.15)]",
          "hover:shadow-[0_4px_0_0_#E5E7EB,0_8px_16px_-3px_rgba(0,0,0,0.2)]",
          "hover:translate-y-[2px]",
          "active:translate-y-[6px]",
          "active:shadow-[0_0_0_0_#E5E7EB]",
        ],
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**Rezultat:** Dugmad će imati **3D pressed effect** kao na Figma slikama!

---

### **KORAK 4: WATERMARK TEXT KOMPONENTA**

#### 4.1 Kreiranje Watermark Component
```tsx
// libs/consultation/frontend/components/ui/Watermark.tsx
import React from 'react';

interface WatermarkProps {
  text: string;
  color?: 'white' | 'black' | 'yellow';
  rotation?: number; // degrees
  className?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({
  text,
  color = 'white',
  rotation = -10,
  className,
}) => {
  const colorClasses = {
    white: 'text-white',
    black: 'text-wt-black',
    yellow: 'text-wt-yellow',
  };

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
    >
      <div
        className={`text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none opacity-5 ${colorClasses[color]}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Watermark;
```

#### 4.2 Alternativa: Watermark Image (bgd-text-hero.png)
```tsx
// Upotreba postojeće slike
<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
  <img 
    src="/watchthis/bgd-text-hero.png" 
    alt="" 
    aria-hidden
    className="opacity-10 max-w-none w-[1200px]"
    style={{ transform: 'rotate(-10deg)' }}
    loading="lazy"
    decoding="async"
  />
</div>
```

**Gde koristiti:**
- Hero sekcija → `bgd-text-hero.png` ili tekst "WATCH"
- FAQ sekcija → Tekst "FAQ" (crn, rotiran)
- Services → Tekst "SERVICES" (bel, rotiran)

---

### **KORAK 5: SCRIBBLE ARROWS - DEKORATIVNI ELEMENTI**

#### 5.1 Ažuriranje Scribble Component
```tsx
// libs/consultation/frontend/components/ui/Scribble.tsx
import React from 'react';

type ScribbleVariant = 'arrow-curve' | 'arrow-down' | 'arrow-right';
type Position = 'tl' | 'tr' | 'bl' | 'br' | 'custom';

interface ScribbleProps {
  variant?: ScribbleVariant;
  position?: Position;
  className?: string;
  rotateDeg?: number;
  width?: number;
  customStyle?: React.CSSProperties; // Za custom positioning
}

const variantToSrc: Record<ScribbleVariant, string> = {
  'arrow-curve': '/watchthis/asset-3@4x-1.png',
  'arrow-down': '/watchthis/asset-4@4x-2.png',
  'arrow-right': '/watchthis/asset-5@4x-1.png',
};

const posToStyle: Record<Position, React.CSSProperties> = {
  tl: { top: '5%', left: '5%' },
  tr: { top: '5%', right: '5%' },
  bl: { bottom: '5%', left: '5%' },
  br: { bottom: '5%', right: '5%' },
  custom: {}, // Use customStyle prop
};

export const Scribble: React.FC<ScribbleProps> = ({
  variant = 'arrow-curve',
  position = 'br',
  className,
  rotateDeg = 0,
  width = 120,
  customStyle,
}) => {
  const src = variantToSrc[variant];
  const baseStyle = position === 'custom' ? customStyle : posToStyle[position];
  
  const style: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    width,
    zIndex: 10,
    ...baseStyle,
    ...(rotateDeg ? { transform: `rotate(${rotateDeg}deg)` } : {}),
  };

  return (
    <img 
      src={src} 
      alt="" 
      aria-hidden 
      style={style} 
      className={`drop-shadow-lg ${className || ''}`}
      loading="lazy"
      decoding="async"
    />
  );
};

export default Scribble;
```

**Primjeri upotrebe:**
```tsx
{/* FAQ sekcija - curved arrow */}
<Scribble variant="arrow-curve" position="bl" width={140} rotateDeg={15} />

{/* Services - down arrow */}
<Scribble variant="arrow-down" position="tr" width={100} />

{/* CTA - right arrow */}
<Scribble variant="arrow-right" position="custom" customStyle={{ top: '30%', right: '10%' }} />
```

---

### **KORAK 6: SECTION BACKGROUNDS & DIAGONAL CUTS**

#### 6.1 Ažuriranje SectionAngle Component
```tsx
// libs/consultation/frontend/components/layout/SectionAngle.tsx
import React from 'react';
import { Watermark } from '../ui/Watermark';

type SectionColor = 'yellow' | 'blue' | 'black' | 'orange' | 'white';
type SectionCut = 'top' | 'bottom' | 'both' | 'none';

interface SectionAngleProps {
  children: React.ReactNode;
  color?: SectionColor;
  cut?: SectionCut;
  watermark?: string; // Text za watermark
  watermarkColor?: 'white' | 'black' | 'yellow';
  paddingClass?: string;
  container?: boolean;
  id?: string;
  className?: string;
}

const colorToClasses: Record<SectionColor, string> = {
  yellow: 'bg-wt-yellow text-wt-black',
  blue: 'bg-wt-blue text-white',
  black: 'bg-wt-black text-white',
  orange: 'bg-[#DD5E23] text-white', // Primary Orange
  white: 'bg-white text-wt-black',
};

function cutToClasses(cut: SectionCut, aggressive = false): string {
  if (aggressive) {
    // Više agresivni iseci za Figma stil
    switch (cut) {
      case 'top':
        return 'wt-diagonal-top-aggressive';
      case 'bottom':
        return 'wt-diagonal-bottom-aggressive';
      case 'both':
        return 'wt-diagonal-both-aggressive';
      default:
        return '';
    }
  }
  
  switch (cut) {
    case 'top':
      return 'wt-diagonal-top';
    case 'bottom':
      return 'wt-diagonal-bottom';
    case 'both':
      return 'wt-diagonal-both';
    default:
      return '';
  }
}

export const SectionAngle: React.FC<SectionAngleProps> = ({
  children,
  color = 'yellow',
  cut = 'top',
  watermark,
  watermarkColor = 'white',
  paddingClass = 'py-20',
  container = true,
  id,
  className,
}) => {
  const bgClasses = colorToClasses[color];
  const diagonalClasses = cutToClasses(cut, true); // aggressive = true

  return (
    <section 
      id={id} 
      className={`relative overflow-hidden ${bgClasses} ${diagonalClasses} ${paddingClass} ${className || ''}`.trim()}
    >
      {/* Radial gradient overlay za blue sekcije */}
      {color === 'blue' && (
        <div className="absolute inset-0 bg-wt-hero-radial opacity-100 pointer-events-none" aria-hidden></div>
      )}
      
      {/* Watermark tekst */}
      {watermark && (
        <Watermark text={watermark} color={watermarkColor} />
      )}
      
      {/* Content */}
      {container ? (
        <div className="container mx-auto px-4 relative z-10">{children}</div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </section>
  );
};

export default SectionAngle;
```

#### 6.2 Agresivniji Dijagonalni Iseci (main.css)
```css
/* Više aggressive cuts za Figma matching */
.wt-diagonal-top-aggressive {
  clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
}

.wt-diagonal-bottom-aggressive {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
}

.wt-diagonal-both-aggressive {
  clip-path: polygon(0 8%, 100% 0, 100% 92%, 0 100%);
}

/* Za VRLO aggressive style (kao na Figma) */
.wt-diagonal-top-extreme {
  clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%);
}

.wt-diagonal-bottom-extreme {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}
```

---


### **FAQ PAGE** (faq-page.tsx)

#### PRZED:
## 📄 PRIMJENE PO STRANICAMA

### **HOME PAGE** (hero-section.tsx)

#### PRIJE:
```tsx
<div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
  <h1 className="text-4xl lg:text-5xl font-black">
    Transform Your Business
  </h1>
</div>
```

#### POSLIJE:
```tsx
<HeroWT
  titleTop="WATCH YOUR"
  titleAccent="BRAND"
  titleBottom="GOES WHOOSH!"
  description="We blend creativity and strategy to make your brand impossible to ignore. Ready to take down the competition?"
/>

<SectionAngle 
  color="yellow" 
  cut="top" 
  watermark="SERVICES"
  watermarkColor="black"
  className="wt-diagonal-top-aggressive"
>
  <Scribble variant="arrow-curve" position="bl" width={140} />
  
  <h2 className="wt-heading-section text-center mb-12">
    STRUGGLING TO <span className="text-wt-black">STAND OUT</span>?
  </h2>
  
  {/* Stats content */}
</SectionAngle>

<SectionAngle 
  color="black" 
  cut="both"
  watermark="TRANSFORM"
  className="wt-diagonal-both-aggressive"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="wt-heading-hero">
        READY TO <span className="text-wt-yellow">TRANSFORM</span><br />
        YOUR BRAND?
      </h2>
      <Button size="xl" className="mt-8">
        YES, LET'S DO THIS!
      </Button>
    </div>
    <div className="relative">
      <Ninja variant="cta" width={480} />
      <Scribble variant="arrow-right" position="br" />
    </div>
  </div>
</SectionAngle>
```

---
```tsx
<PageLayout title="FAQ">
  <FAQ />
</PageLayout>
```

#### POSLIJE:
```tsx
<PageLayout title="">
  {/* Hero sa plavom pozadinom */}
  <SectionAngle 
    color="blue" 
    cut="bottom"
    watermark="QUESTIONS"
    className="wt-diagonal-bottom-aggressive"
  >
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="wt-heading-hero mb-6">
        GOT <span className="text-wt-yellow">QUESTIONS</span>?<br />
        WE'VE GOT ANSWERS!
      </h1>
      <p className="wt-body-lg text-white/90">
        Everything you need to know about working with WatchThis
      </p>
    </div>
  </SectionAngle>

  {/* FAQ Content sa žutom pozadinom */}
  <SectionAngle 
    color="yellow" 
    cut="both"
    watermark="FAQ"
    watermarkColor="black"
    className="wt-diagonal-both-aggressive"
  >
    <Scribble variant="arrow-curve" position="tl" width={160} rotateDeg={-15} />
    
    <h2 className="wt-heading-section text-center mb-16">
      FREQUENTLY ASKED <span className="text-wt-black">QUESTIONS</span>
    </h2>
    
    <FAQ />
    
    <Scribble variant="arrow-down" position="br" width={140} />
  </SectionAngle>

  {/* CTA sa crnom pozadinom */}
  <SectionAngle 
    color="black" 
    cut="top"
    className="wt-diagonal-top-aggressive"
  >
    <div className="text-center max-w-3xl mx-auto relative">
      <Ninja variant="cta" width={380} className="mx-auto mb-8" />
      
      <h2 className="wt-heading-hero mb-6">
        STILL HAVE <span className="text-wt-yellow">QUESTIONS</span>?
      </h2>
      
      <Button asChild size="xl">
        <Link to="/contact">SCHEDULE A CALL</Link>
      </Button>
      
      <Scribble variant="arrow-right" position="br" width={120} />
    </div>
  </SectionAngle>
</PageLayout>
```

---

### **SERVICES PAGE** (services-page.tsx)

Implementirati **grid layout** kao na Figma:

```tsx
<SectionAngle color="blue" cut="bottom" watermark="SERVICES">
  <h1 className="wt-heading-hero text-center mb-16">
    WHAT CAN WE DO FOR <span className="text-wt-yellow">YOUR BRAND</span>?
  </h1>
</SectionAngle>

{/* Services Grid - Mix sekcija */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
  {/* Orange Block */}
  <SectionAngle color="orange" cut="none" paddingClass="py-16 px-8">
    <h3 className="wt-heading-card mb-6">
      NEED A FRESH<br />DIGITAL PRESENCE?
    </h3>
    <p className="wt-body-lg mb-6">
      Enter the digital arena with a presence that strikes fast and leaves an impression.
    </p>
    <Button variant="default">LEARN MORE</Button>
    <Scribble variant="arrow-right" position="br" />
  </SectionAngle>

  {/* Yellow Block */}
  <SectionAngle color="yellow" cut="none" paddingClass="py-16 px-8">
    <Scribble variant="arrow-curve" position="tl" width={100} />
    <h3 className="wt-heading-card mb-6">
      WANT TO DISRUPT<br />YOUR INDUSTRY?
    </h3>
    <p className="wt-body-lg mb-6">
      A ninja moves differently. Our out-of-the-box marketing strategies help you disrupt.
    </p>
    <Button variant="secondary">LEARN MORE</Button>
  </SectionAngle>

  {/* Blue Block with Ninja */}
  <SectionAngle color="blue" cut="none" paddingClass="py-16 px-8">
    <div className="flex items-center gap-8">
      <div className="flex-1">
        <h3 className="wt-heading-card mb-6">
          WHO<br />ARE WE?
        </h3>
        <p className="wt-body-lg mb-6">
          We are a team of digital ninjas—experts in stealth branding, precise targeting, and innovative strategies.
        </p>
        <Button variant="default">OUR STORY</Button>
      </div>
      <div className="flex-shrink-0">
        <Ninja variant="who" width={280} />
      </div>
    </div>
  </SectionAngle>

  {/* Black Block */}
  <SectionAngle color="black" cut="none" paddingClass="py-16 px-8">
    <h3 className="wt-heading-card mb-6">
      BRANDING &<br /><span className="text-wt-yellow">CREATIVE</span>
    </h3>
    <p className="wt-body-lg mb-6">
      Our branding ninjas craft bold, unique identities that resonate.
    </p>
    <Button variant="default">LEARN MORE</Button>
    <Scribble variant="arrow-down" position="br" />
  </SectionAngle>
</div>
```

---

## 🎨 NINJA ILLUSTRATIONS - IMPLEMENTACIJA

### Ažuriranje Ninja Component
```tsx
// libs/consultation/frontend/components/ui/Ninja.tsx
import React from 'react';

type NinjaVariant = 'hero' | 'cta' | 'what' | 'who' | 'none';

const variantToSrc: Record<NinjaVariant, string> = {
  hero: '/watchthis/ninja-hero.png',
  cta: '/watchthis/ninja-cta.png',
  what: '/watchthis/ninja-what.png',
  who: '/watchthis/ninja-who.png',
  none: '',
};

interface NinjaProps {
  variant?: NinjaVariant;
  width?: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  showGlow?: boolean; // Yellow circle + blue glow
}

export const Ninja: React.FC<NinjaProps> = ({
  variant = 'hero',
  width = 520,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '(max-width: 1024px) 100vw, 520px',
  showGlow = true,
}) => {
  const src = variantToSrc[variant];
  if (variant === 'none' || !src) {
    return null;
  }
  
  return (
    <div className={`relative inline-block ${className || ''}`}>
      {/* Yellow circle background */}
      {showGlow && (
        <div 
          className="absolute inset-0 bg-wt-yellow rounded-full blur-sm opacity-80"
          style={{
            width: width * 0.85,
            height: width * 0.85,
            margin: 'auto',
            zIndex: -1,
          }}
          aria-hidden
        />
      )}
      
      {/* Ninja image */}
      <img
        src={src}
        width={width}
        height={width}
        alt=""
        aria-hidden
        className="drop-shadow-[0_0_40px_rgba(0,129,197,0.4)] animate-wt-float relative z-10"
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    </div>
  );
};

export default Ninja;
```

**Upotreba:**
```tsx
<Ninja variant="hero" width={520} loading="eager" fetchPriority="high" />
<Ninja variant="cta" width={380} showGlow={true} />
<Ninja variant="what" width={280} />
<Ninja variant="who" width={280} />
```

---

## 📋 FINALNI CHECKLIST - IMPLEMENTACIJA

### ✅ **FAZA 1: CORE CSS** (1-2h)
- [ ] Dodaj nove button variants sa 3D shadow
- [ ] Dodaj `.wt-heading-*` utility klase
- [ ] Dodaj `.wt-body-*` utility klase
- [ ] Dodaj aggressive diagonal cuts
- [ ] Testaj Tailwind v4 generisanje klasa

### ✅ **FAZA 2: KOMPONENTE** (2-3h)
- [ ] Kreiraj `Watermark.tsx` komponentu
- [ ] Ažuriraj `Scribble.tsx` sa custom positioning
- [ ] Ažuriraj `Ninja.tsx` sa glow efektom
- [ ] Ažuriraj `SectionAngle.tsx` sa watermark prop
- [ ] Ažuriraj `Button.tsx` sa novim variants

### ✅ **FAZA 3: STRANICE** (3-4h)
- [ ] **Home Page** → Primijeni HeroWT + services grid
- [ ] **FAQ Page** → Blue hero + yellow content + black CTA
- [ ] **Services Page** → 4-block grid (orange/yellow/blue/black)
- [ ] **About Page** → Integriši ninja ilustracije
- [ ] **Contact Page** → CTA sa ninja-cta.png
- [ ] **Blog Page** → Yellow sections sa scribble arrows

### ✅ **FAZA 4: POLISH & REFINE** (1-2h)
- [ ] Dodaj scribble arrows na sve relevantne sekcije
- [ ] Dodaj watermark tekstove svugde
- [ ] Testiraj responsive breakpoints
- [ ] Optimizuj loading performanse (lazy loading)
- [ ] Proveri accessibility (kontrast, ARIA)

### ✅ **FAZA 5: TESTING** (1h)
- [ ] Desktop Chrome/Firefox/Safari
- [ ] Mobile iOS/Android
- [ ] Tablet landscape/portrait
- [ ] Dark mode (ako koristiš)
- [ ] Performance audit (Lighthouse)

---

## 🚨 KRITIČNE IZMJENE - PRIORITET

### **TOP 3 HITNE IZMJENE:**

1. **BUTTON SHADOWS** (Najviši prioritet)
   - Trenutno: Flat buttons
   - Potrebno: 3D shadow kao na `primary-button.png`
   - Fajl: `libs/consultation/frontend/components/ui/button.tsx`

2. **DIAGONAL CUTS** (Srednji prioritet)
   - Trenutno: Blagi iseci (5%)
   - Potrebno: Agresivni iseci (8-12%)
   - Fajl: `consultation-frontend/src/styles/main.css`

3. **WATERMARK TEKSTOVI** (Srednji prioritet)
   - Trenutno: Nedostaju
   - Potrebno: Veliki, transparent tekstovi u pozadini
   - Fajl: Kreirati `Watermark.tsx` komponentu

---

## 📊 PRIJE VS POSLIJE - OČEKIVANI REZULTAT

### PRIJE:
- ❌ Bele pozadine
- ❌ Flat buttons bez shadow-a
- ❌ Blagi dijagonalni iseci
- ❌ Nedostaju watermark tekstovi
- ❌ Nema ninja ilustracija
- ❌ Nema scribble arrows

### POSLIJE:
- ✅ Brand plave (#0081C5), žute (#FBC314), crne (#111111) pozadine
- ✅ 3D buttons sa pressed effect
- ✅ Agresivni dijagonalni iseci (8-12%)
- ✅ Veliki watermark tekstovi u pozadini
- ✅ Ninja ilustracije sa yellow circle + blue glow
- ✅ Scribble arrows kao dekorativni elementi
- ✅ Bold uppercase naslovi kao na Figma
- ✅ Perfektno matching sa Figma dizajnom

---

## 🛠️ ALATI & RESURSI

### Figma Link:
https://www.figma.com/design/Bg7iLPoijzUZxXqN16KhFt/WatchThis--Web?node-id=10-40&t=cfW0G4GAcJ03qidb-0

### Asset Lokacija:
`/Users/radomirpopovic/Documents/projects/WatchThis/consultation-booking/consultation-frontend/public/watchthis/`

### Design Tokens Reference:
`/Users/radomirpopovic/Documents/projects/WatchThis/TAILWIND_V4_FIX.md`

---

**UKUPNO VRIJEME:** 8-11 sati rada
**PRIORITET:** ⚡ KRITIČAN - Brand identitet zavisi od ovoga!
**STATUS:** 📝 Roadmap spreman - Čeka implementaciju

---

## 💡 DODATNI SAVJETI

1. **Rad u iteracijama:** Prvo implementiraj buttons + diagonal cuts, pa onda watermarks i ninja
2. **Testiraj na svaki korak:** Nakon svake izmjene refreshuj browser da vidiš rezultat
3. **Koristi Figma Inspect:** Klikni na elemente u Figma da vidiš exact CSS values
4. **Responsive First:** Svaki element testiraj na mobile (375px) i desktop (1920px)
5. **Git Commit After Each Phase:** Commit nakon svake faze da imaš rollback opciju

---

**KREIRAO:** AI Assistant
**DATUM:** 2025-10-13
**VERSION:** 1.0 - Comprehensive CSS Roadmap

