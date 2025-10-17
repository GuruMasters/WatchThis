# WatchThis UI System

Ovaj dokument sažima design tokens, upotrebu Button komponente i guardrails.

## Tokens (sažetak)
- Brand yellow: #FBC314 → gradient primary #FBC314 → #EFAF13
- Brand orange: #DD5E23 → #C76A18
- Accent blue (focus/link): #0081C5
- Black/White: #111111 / #FFFFFF

CSS varijable: consultation-booking/consultation-frontend/src/styles/base/colors.css
Tailwind mape: consultation-booking/tailwind.config.js (primary/secondary skale i backgroundImage gradijenti).

## Button (React)
Import:
```ts
import { Button } from '@consultation-booking/consultation/frontend/components/ui/button';
```
Varijante: default (primary), secondary, neutral, inverse, outline, link, success, warning.
Primeri:
```tsx
<Button>Schedule a call</Button>
<Button variant="secondary">Schedule a call</Button>
<Button variant="inverse">Schedule a call</Button>
<Button variant="neutral">Cancel</Button>
```

## Button (React Native)
Import:
```ts
import { Button as RNButton } from 'consultation-booking/consultation-mobile/src/app/Button';
```
```tsx
<RNButton title="Schedule a call" variant="primary" />
```

## Guardrails
- Ne hardkodovati HEX u komponentama: koristite CSS varijable ili Tailwind klase.
- CTA tekst uvek bold/large (AA/AAA kontrast). Za žuto/narandžasto dugme – crni tekst.
- Fokus prsten je obavezan (--focus-ring / Tailwind focus utilities).
- Najviše 1–2 primarna CTA po ekranu; koristite secondary/neutral za ostalo.

## SectionAngle
- Reusable kose sekcije sa brend pozadinama.
- API: `color: 'yellow'|'blue'|'black'`, `cut: 'top'|'bottom'|'both'|'none'`, `paddingClass`, `container`.
```tsx
import { SectionAngle } from '@consultation-booking/consultation/frontend/components/layout/SectionAngle';

<SectionAngle color="yellow" cut="top">
  <h2>What We Do</h2>
  <p>Strategy, design, and engineering…</p>
</SectionAngle>
```

## Hero (Web)
- `HeroWT` (homepage) i `WTPageHero` (ostale strane). Slike koriste `decoding`, `sizes`; ninja u herou je eager sa `fetchPriority="high"`.

## Hero (React Native)
- `consultation-mobile/src/app/HeroWT.tsx` – plava pozadina, watermark, CTA, žuti kosi klin; korišćen u `App.tsx`.

## A11y/Perf
- Slike: `loading`/`decoding`/`sizes`; eager+high priority za heroe.
- Kontrast: bela/žuta na plavoj/crnoj, crna na žutoj.
