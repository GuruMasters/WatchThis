# 📁 WatchThis Apple Redesign - File Structure Plan

Ovaj dokument pokazuje tačno koje fajlove treba editovati, kreirati, ili obrisati.

---

## 🎯 FILES TO CREATE (Novi Fajlovi)

```
consultation-booking/
└── consultation-frontend/
    └── src/
        └── styles/
            └── base/
                ├── design-tokens.css (✨ KREIRATI)
                └── effects.css (✨ KREIRATI - opciono)
```

**design-tokens.css:**
- Apple color palette
- Spacing tokens
- Shadow tokens
- Border radius tokens
- Sve CSS varijable

**effects.css:**
- Dodatni effects ako treba
- Ili merge u design-tokens.css

---

## ✏️ FILES TO EDIT (Postojeći Fajlovi Za Update)

### 1. Style Files

```
consultation-booking/
└── consultation-frontend/
    └── src/
        └── styles/
            ├── base/
            │   ├── colors.css (🔄 EDIT - replace sa neutral palette)
            │   ├── typography.css (🔄 EDIT - system fonts)
            │   ├── spacing.css (🔄 EDIT - 8px system)
            │   └── reset.css (✅ možda malo cleanup)
            │
            ├── components/
            │   ├── buttons.css (🔄 EDIT - remove yellow/orange styles)
            │   ├── cards.css (🔄 EDIT - clean white cards)
            │   ├── inputs.css (🔄 EDIT - clean borders, blue focus)
            │   └── modals.css (🔄 EDIT - clean styling)
            │
            ├── animations/
            │   ├── keyframes.css (🔄 EDIT - remove flashy animations)
            │   └── classes.css (🔄 EDIT - keep subtle ones)
            │
            ├── layout/
            │   ├── sections.css (🔄 EDIT - clean section spacing)
            │   └── containers.css (✅ minimal edits)
            │
            ├── utilities/
            │   ├── interactive.css (🔄 EDIT - update hover states)
            │   └── spacing.css (🔄 EDIT - 8px base system)
            │
            └── main.css (🔄 EDIT - import design-tokens.css)
```

### 2. Component Files

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            ├── components/
            │   ├── ui/
            │   │   ├── button.tsx (🔄 EDIT - Apple style blue buttons)
            │   │   ├── card.tsx (🔄 EDIT - clean white cards)
            │   │   └── input.tsx (🔄 EDIT - ako postoji)
            │   │
            │   └── layout/
            │       ├── header.tsx (🔄 EDIT - clean white header)
            │       ├── navigation.tsx (🔄 EDIT - ako postoji)
            │       └── footer.tsx (🔄 EDIT - light gray footer)
```

### 3. Page Files - Homepage

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            └── pages/
                └── home/
                    ├── hero-section.tsx (🔄 EDIT - remove ninja, white bg)
                    ├── services-overview.tsx (🔄 EDIT - clean cards)
                    ├── testimonials.tsx (🔄 EDIT - minimal quote cards)
                    ├── footer.tsx (🔄 EDIT - light gray, minimal)
                    └── home-page.tsx (✅ minimal edits - mostly layout)
```

### 4. Page Files - Services

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            └── pages/
                └── services/
                    ├── services-page.tsx (🔄 EDIT - simplified)
                    ├── application-development-page.tsx (🔄 EDIT - clean)
                    ├── digital-marketing-page.tsx (🔄 EDIT - clean)
                    ├── business-consulting-page.tsx (🔄 EDIT - clean)
                    └── support-maintenance-page.tsx (🔄 EDIT - clean)
```

### 5. Page Files - Other

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            └── pages/
                ├── about/
                │   └── about-page.tsx (🔄 EDIT - merge all about content)
                │
                ├── contact/
                │   └── contact-page.tsx (🔄 EDIT - clean form)
                │
                ├── faq/
                │   └── faq-page.tsx (🔄 EDIT - clean accordion)
                │
                ├── booking/
                │   └── booking-page.tsx (🔄 EDIT - clean wizard)
                │
                └── legal/
                    ├── privacy-policy-page.tsx (✅ minimal edits)
                    ├── terms-of-service-page.tsx (✅ minimal edits)
                    ├── cookie-policy-page.tsx (✅ minimal edits)
                    └── gdpr-page.tsx (✅ minimal edits)
```

### 6. Routing & Config

```
consultation-booking/
└── consultation-frontend/
    └── src/
        └── app/
            └── app.tsx (🔄 EDIT - remove unused routes)
```

---

## ❌ FILES TO DELETE

### 1. About Pages (Merge → Delete)

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            └── pages/
                └── about/
                    ├── ❌ about-us-page.tsx (DELETE)
                    ├── ❌ our-team-page.tsx (DELETE)
                    ├── ❌ blog-page.tsx (DELETE)
                    ├── ❌ careers-page.tsx (DELETE)
                    ├── ❌ case-studies-page.tsx (DELETE)
                    ├── ❌ mission-vision.tsx (DELETE)
                    ├── ❌ company-values.tsx (DELETE)
                    ├── ❌ team-section.tsx (DELETE)
                    ├── ❌ mission-vision.tsx.backup (DELETE)
                    └── ❌ company-values.tsx.backup (DELETE)
```

**Action:** Merge content into single `about-page.tsx`, then delete all others.

### 2. Resources Section (Complete Delete)

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            └── pages/
                └── ❌ resources/ (DELETE ENTIRE FOLDER)
                    ├── documentation-page.tsx
                    ├── api-reference-page.tsx
                    ├── help-center-page.tsx
                    └── community-page.tsx
```

### 3. Service Extra Pages (Delete)

```
consultation-booking/
└── libs/
    └── consultation/
        └── frontend/
            └── pages/
                └── services/
                    ├── ❌ service-categories.tsx (DELETE - prevelik)
                    ├── ❌ services-messaging.tsx (DELETE)
                    ├── ❌ services-portfolio.tsx (DELETE)
                    ├── ❌ services-price-calculator.tsx (DELETE)
                    ├── ❌ services-quick-actions.tsx (DELETE)
                    └── ❌ services-stats-overview.tsx (DELETE)
```

### 4. Backup CSS Files

```
consultation-booking/
└── consultation-frontend/
    └── src/
        ├── ❌ styles-old.css (DELETE)
        ├── ❌ styles-backup-20250926-172719.css (DELETE)
        └── backup/
            └── ❌ styles-original.css (DELETE ako nije potreban)
```

---

## 📦 FILES TO ARCHIVE (Ne brisati, samo move)

### 1. Ninja Images

```bash
# Kreirati archive folder
mkdir -p consultation-booking/dizajn/archive

# Move ninja images
mv consultation-booking/consultation-frontend/public/watchthis/ninja-hero.png \
   consultation-booking/dizajn/archive/

mv consultation-booking/consultation-frontend/public/watchthis/ninja-what.png \
   consultation-booking/dizajn/archive/

mv consultation-booking/consultation-frontend/public/watchthis/ninja-who.png \
   consultation-booking/dizajn/archive/

mv consultation-booking/consultation-frontend/public/watchthis/ninja-cta.png \
   consultation-booking/dizajn/archive/
```

**Takođe arhiviraj iz `/public/`:**
```bash
mv consultation-booking/public/watchthis/ninja-hero.png \
   consultation-booking/dizajn/archive/ 2>/dev/null || true

mv consultation-booking/public/watchthis/ninja-what.png \
   consultation-booking/dizajn/archive/ 2>/dev/null || true

mv consultation-booking/public/watchthis/ninja-who.png \
   consultation-booking/dizajn/archive/ 2>/dev/null || true

mv consultation-booking/public/watchthis/ninja-cta.png \
   consultation-booking/dizajn/archive/ 2>/dev/null || true
```

### 2. Design Assets

```bash
# Move design assets
mv consultation-booking/dizajn/Asset*.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/BGD*.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/Ninja*.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/*Button.png consultation-booking/dizajn/archive/
mv consultation-booking/dizajn/x.png consultation-booking/dizajn/archive/
```

---

## ✅ FILES TO KEEP (No Changes)

### Logo Files (Important!)

```
consultation-booking/
├── consultation-frontend/
│   └── public/
│       └── watchthis/
│           ├── ✅ logo-new.png (KEEP)
│           └── ✅ watch-this-logo.svg (KEEP - ako postoji)
│
└── dizajn/
    ├── ✅ watch-this-logo.svg (KEEP)
    ├── ✅ Logo-new.png (KEEP)
    └── ✅ BRAND_PALETTE.md (KEEP - reference)
```

### Config Files

```
consultation-booking/
├── ✅ package.json
├── ✅ yarn.lock
├── ✅ nx.json
├── ✅ tsconfig.*.json
└── consultation-frontend/
    ├── ✅ vite.config.ts
    ├── ✅ tsconfig.*.json
    └── ✅ index.html
```

---

## 📊 FILE EDIT SUMMARY

### By Action Type:

| Action | Count | Files |
|--------|-------|-------|
| ✨ CREATE | 2 | design-tokens.css, effects.css |
| 🔄 EDIT | ~35 | Styles, components, pages |
| ❌ DELETE | ~18 | About pages, Resources, Service extras |
| 📦 ARCHIVE | ~14 | Ninja images, design assets |
| ✅ KEEP | ~10 | Logo, config files |

### By Priority:

**🔴 Critical (Edit First):**
1. `design-tokens.css` (create)
2. `colors.css` (edit)
3. `typography.css` (edit)
4. `button.tsx` (edit)
5. `hero-section.tsx` (edit)

**🟡 High (Edit Soon):**
6. Service pages (4 files)
7. Homepage components (3 files)
8. Header/Footer (2 files)
9. About page (merge + edit)
10. Contact page (edit)

**🟢 Medium (Edit Later):**
11. FAQ page
12. Booking page
13. Legal pages (light touch)
14. CSS cleanup files

---

## 🗂️ FINAL FILE STRUCTURE (After Redesign)

```
consultation-booking/
├── consultation-frontend/
│   ├── public/
│   │   └── watchthis/
│   │       ├── logo-new.png ✅
│   │       └── watch-this-logo.svg ✅
│   │
│   └── src/
│       ├── app/
│       │   └── app.tsx (updated routes)
│       │
│       └── styles/
│           ├── base/
│           │   ├── design-tokens.css ✨ (NEW)
│           │   ├── colors.css (updated)
│           │   ├── typography.css (updated)
│           │   ├── spacing.css (updated)
│           │   └── reset.css
│           │
│           ├── components/
│           │   ├── buttons.css (clean)
│           │   ├── cards.css (clean)
│           │   └── inputs.css (clean)
│           │
│           ├── animations/ (minimal)
│           ├── layout/ (clean)
│           ├── utilities/ (updated)
│           └── main.css (imports design-tokens)
│
└── libs/
    └── consultation/
        └── frontend/
            ├── components/
            │   ├── ui/
            │   │   ├── button.tsx (Apple style)
            │   │   └── card.tsx (clean)
            │   │
            │   └── layout/
            │       ├── header.tsx (clean white)
            │       └── footer.tsx (light gray)
            │
            └── pages/
                ├── home/
                │   ├── hero-section.tsx (clean)
                │   ├── services-overview.tsx (clean)
                │   ├── testimonials.tsx (minimal)
                │   ├── footer.tsx (clean)
                │   └── home-page.tsx
                │
                ├── services/
                │   ├── services-page.tsx (simplified)
                │   ├── application-development-page.tsx (clean)
                │   ├── digital-marketing-page.tsx (clean)
                │   ├── business-consulting-page.tsx (clean)
                │   └── support-maintenance-page.tsx (clean)
                │
                ├── about/
                │   └── about-page.tsx (merged, unified)
                │
                ├── contact/
                │   └── contact-page.tsx (clean form)
                │
                ├── faq/
                │   └── faq-page.tsx (clean)
                │
                ├── booking/
                │   └── booking-page.tsx (clean)
                │
                └── legal/
                    ├── privacy-policy-page.tsx
                    ├── terms-of-service-page.tsx
                    ├── cookie-policy-page.tsx
                    └── gdpr-page.tsx

dizajn/
├── archive/ (ninja images moved here)
├── watch-this-logo.svg ✅
├── Logo-new.png ✅
└── BRAND_PALETTE.md ✅
```

---

## 🚀 EXECUTION PLAN (Step-by-Step)

### STEP 1: Backup
```bash
cd /Users/radomirpopovic/Documents/projects/WatchThis/consultation-booking
git checkout -b feature/apple-redesign
git add .
git commit -m "Backup before Apple redesign"
```

### STEP 2: Create Archive
```bash
mkdir -p dizajn/archive
# Don't move images yet - do after visual changes
```

### STEP 3: Create New Files
```bash
touch consultation-frontend/src/styles/base/design-tokens.css
```

### STEP 4: Edit Core Styles (Foundation)
**Order:**
1. `design-tokens.css` - add all tokens
2. `main.css` - import design-tokens
3. `colors.css` - replace with neutral palette
4. `typography.css` - system fonts
5. `spacing.css` - 8px system

**Test after each file!**

### STEP 5: Edit Components
**Order:**
1. `button.tsx` - blue Apple buttons
2. `card.tsx` - clean white cards
3. `header.tsx` - white blur header
4. `footer.tsx` - light gray footer

**Test after each!**

### STEP 6: Edit Homepage
**Order:**
1. `hero-section.tsx` - remove ninja, white bg
2. `services-overview.tsx` - clean cards
3. `testimonials.tsx` - minimal quotes

**Test homepage thoroughly!**

### STEP 7: Edit Service Pages
**Order:**
1. `services-page.tsx` - simplified overview
2. `application-development-page.tsx` - clean
3. `digital-marketing-page.tsx` - clean
4. `business-consulting-page.tsx` - clean
5. `support-maintenance-page.tsx` - clean

**Test each service page!**

### STEP 8: Edit Other Pages
**Order:**
1. Merge about pages → `about-page.tsx`
2. `contact-page.tsx` - clean form
3. `faq-page.tsx` - clean accordion
4. `booking-page.tsx` - clean wizard
5. Legal pages - light touch

### STEP 9: Delete Unnecessary Files
```bash
# About pages
rm libs/consultation/frontend/pages/about/about-us-page.tsx
rm libs/consultation/frontend/pages/about/our-team-page.tsx
rm libs/consultation/frontend/pages/about/blog-page.tsx
rm libs/consultation/frontend/pages/about/careers-page.tsx
rm libs/consultation/frontend/pages/about/case-studies-page.tsx
rm libs/consultation/frontend/pages/about/mission-vision.tsx
rm libs/consultation/frontend/pages/about/company-values.tsx
rm libs/consultation/frontend/pages/about/team-section.tsx
rm libs/consultation/frontend/pages/about/*.backup

# Resources
rm -rf libs/consultation/frontend/pages/resources/

# Service extras
rm libs/consultation/frontend/pages/services/service-categories.tsx
rm libs/consultation/frontend/pages/services/services-messaging.tsx
rm libs/consultation/frontend/pages/services/services-portfolio.tsx
rm libs/consultation/frontend/pages/services/services-price-calculator.tsx
rm libs/consultation/frontend/pages/services/services-quick-actions.tsx
rm libs/consultation/frontend/pages/services/services-stats-overview.tsx

# Backup CSS
rm consultation-frontend/src/styles-old.css
rm consultation-frontend/src/styles-backup-*.css
```

### STEP 10: Update Routes
```bash
# Edit consultation-frontend/src/app/app.tsx
# Remove routes for deleted pages
# Test routing!
```

### STEP 11: Archive Images
```bash
# Move ninja images to archive
mv consultation-frontend/public/watchthis/ninja-*.png dizajn/archive/
mv public/watchthis/ninja-*.png dizajn/archive/ 2>/dev/null || true

# Move design assets
mv dizajn/Asset*.png dizajn/archive/
mv dizajn/BGD*.png dizajn/archive/
mv dizajn/Ninja*.png dizajn/archive/
mv dizajn/*Button.png dizajn/archive/
```

### STEP 12: Final Testing
```bash
# Run dev server
yarn start:frontend

# Test:
# - All pages load
# - No ninja images showing
# - Clean Apple style
# - Mobile responsive
# - Cross-browser (Chrome, Safari, Firefox)
# - Accessibility (keyboard nav, contrast)
```

### STEP 13: Commit
```bash
git add .
git commit -m "Complete Apple redesign - neutral white palette"
```

---

## 📋 VERIFICATION CHECKLIST

Po završetku, proveri:

### Visual:
- [ ] No ninja images visible
- [ ] White/light-gray backgrounds only
- [ ] Blue accents (#0071E3) for CTAs/links
- [ ] Gray text (gray-900 headings, gray-600 body)
- [ ] System fonts throughout
- [ ] Clean cards with subtle shadows
- [ ] No colorful gradients
- [ ] Logo preserved with original colors

### Functional:
- [ ] All core pages work (8-10 pages)
- [ ] Navigation links correct
- [ ] Buttons clickable
- [ ] Forms submit
- [ ] Booking flow works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Fast load time

### Files:
- [ ] Ninja images in archive (not deleted)
- [ ] Unnecessary pages deleted
- [ ] design-tokens.css created
- [ ] All components updated
- [ ] Routes updated in app.tsx

---

## 🎯 COMPLETION ESTIMATE

**Total Files To Touch:** ~50-60 files
- Create: 2
- Edit: 35-40
- Delete: 18-20
- Archive: 14

**Time per file type:**
- CSS file: 15-30min each
- Component: 30-60min each
- Page: 30-90min each
- Simple page: 15-30min each

**Total estimated time:** 18-24 hours

---

**Ready to execute! Follow the step-by-step plan above. 🚀**

