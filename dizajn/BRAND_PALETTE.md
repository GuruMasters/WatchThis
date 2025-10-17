# WatchThis – Brand Palette (Phase 0)

Ovaj dokument je izvor istine za boje, gradijente i pravila upotrebe. Nema implementacionih izmena u ovoj fazi – samo standardizacija i smernice za Fazu 1 (tokens) i dalje.

## 1) Primarna paleta (HEX)

- Primary Yellow: `#FBC314`  ← master žuta (zamenjuje varijante poput `#FEC20F` u assetima)
- Secondary Yellow: `#EFAF13`
- Primary Orange: `#DD5E23`
- Secondary Orange: `#C76A18`
- Primary Blue (link/focus): `#0081C5`
- Primary Black: `#111111`
- Primary White: `#FFFFFF`

Napomena: u `dizajn/watch-this-logo.svg` pojavljuje se i `#FEC20F`. Od ove tačke, standard je `#FBC314`. U kasnijoj fazi ćemo ujednačiti SVG na master žutu.

## 2) Gradijenti (spec)

- CTA Primary (yellow): `linear-gradient(90deg, #FBC314 0%, #EFAF13 100%)`
- CTA Secondary (orange): `linear-gradient(90deg, #DD5E23 0%, #C76A18 100%)`

Smer može biti 90° ili blagi dijagonalni (to će se rešiti tokenima u Fazi 1).

## 3) Uloge (semantic mapping)

- color.cta.primary.bg → gradijent žuti (iznad)
- color.cta.secondary.bg → gradijent narandžasti
- color.text.onYellow → `#111111`
- color.text.onOrange → `#111111` (large/bold), alternativa `#FFFFFF` za manje površine
- color.text.onBlack → `#FFFFFF`
- color.text.onWhite → `#111111`
- color.link / color.focus → `#0081C5`

## 4) Pristupačnost (WCAG kontrast – sažetak)

- `#111111` na `#FBC314` ≈ 15:1 → AAA (odlično za sve veličine)
- `#111111` na `#EFAF13` ≈ 13–14:1 → AAA
- `#111111` na `#DD5E23` ≈ ~5.4:1 → AA za normalan tekst, AAA za large/bold CTA (što jeste slučaj)
- `#FFFFFF` na `#111111` i obrnuto → AAA

Zaključak: CTA tekst ostaje „large/bold“ i prolazi AA/AAA. Za dugačke paragrafe izbegavati velike žute podloge; žuta se koristi kao akcenat i CTA, ne kao primarna tekstualna pozadina.

## 5) Focus ring

- Boja: `#0081C5`
- Spec: `outline: 2px solid; outline-offset: 2px;` (detaljna implementacija u Fazi 1)

## 6) Shadows (preporuka)

- CTA default: `0 4px 12px rgba(17,17,17,0.14)`
- CTA hover: `0 8px 20px rgba(17,17,17,0.18)`

## 7) Stanja CTA (vizuelna pravila)

- Hover: tamnija krajnja boja gradijenta za ~6–8%, blagi pojačan shadow
- Active: scale 0.98 i smanjen shadow
- Disabled: smanjena saturacija (~35–40%), tekst sa ~45% opacity (ili neutral-500), bez shadow-a
- Focus-visible: ring u `#0081C5` (vidljiv na žutoj, narandžastoj, crnoj i beloj)

## 8) Logo smernice

- Varijante: „na svetloj“ (tamni tekst), „na tamnoj“ (beli tekst), monohrom (bela/crna)
- Minimalna širina: ~128px (web), ~96px (mob). Ispod toga koristiti pojednostavljen simbol.
- Clear space: najmanje visina slova „W“ oko znaka.
- Paleta: žutu u assetima ujednačiti na `#FBC314` u Fazi 3.

## 9) Sledeći koraci (handoff u Fazu 1)

- Iz ovih vrednosti generisati design tokens (CSS varijable + Tailwind config)
- Definisati semantičke alias-e (`--color-cta-primary`, `--color-text-onBrand`, …)
- Omogućiti jedinstvenu upotrebu kroz web i RN (HEX paritet u RN theme-u)

Reference vizuala: `dizajn/Primary Button.png`, `dizajn/Secondary Button.png`, `dizajn/WT-color-palette.png`, `dizajn/watch-this-logo.svg`.


