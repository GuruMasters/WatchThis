# UI System & Styling Guide

Ovaj projekat koristi moderni, skalabilni UI sistem sa čistim CSS-om i centralizovanim reusable komponentama.

## 🎨 CSS Setup

### Konfiguracija
- **Čisti CSS** sa CSS varijablama za consistent dizajn
- **Custom CSS variables** za design tokens
- **Responsive dizajn** sa media queries
- **Responsive design** utilities

### Global CSS
Svi globalni stilovi su centralizovani u:
```
consultation-frontend/src/styles.css
```

Sadrži:
- CSS varijable za boje, spacing, shadows
- Typography stilovi
- Form elementi
- Utility klase
- Dark mode support
- Responsive breakpoints
- Print stilovi

## 🧩 Reusable UI Komponente

### Struktura
```
libs/consultation/frontend/components/
├── ui/              # Bazne UI komponente
│   ├── button.tsx   # Button sa varijantama
│   ├── input.tsx    # Input sa error state-ima
│   ├── card.tsx     # Card sa varijantama
│   ├── modal.tsx    # Modal dialog
│   ├── alert.tsx    # Alert/Notification
│   ├── loading.tsx  # Loading indikatori
│   └── ...
├── layout/          # Layout komponente
│   ├── layout.tsx   # Glavni layout
│   └── admin-layout.tsx
└── features/        # Feature-specifične komponente
    └── employee-card.tsx
```

## 🚀 Korišćenje Komponenti

### Button Komponenta
```tsx
import { Button } from '@consultation-booking/consultation/frontend/components/ui';

// Basic button
<Button>Click me</Button>

// Sa varijantama
<Button variant="destructive" size="lg">
  Delete
</Button>

// Sa ikonama i loading state-om
<Button
  variant="success"
  size="sm"
  leftIcon={<CheckIcon />}
  loading={isLoading}
>
  Save Changes
</Button>
```

### Input Komponenta
```tsx
import { Input } from '@consultation-booking/consultation/frontend/components/ui';

<Input
  placeholder="Enter your email"
  type="email"
  leftIcon={<MailIcon />}
  error={errors.email?.message}
  helperText="We'll never share your email"
/>
```

### Card Komponenta
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@consultation-booking/consultation/frontend/components/ui';

<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>This is a description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Layout Komponenta
```tsx
import { Layout, Container, Header, Sidebar, Footer } from '@consultation-booking/consultation/frontend/components/layout';

<Layout type="sidebar" padding="md">
  <Header>
    <h1>Application Header</h1>
  </Header>

  <Sidebar>
    <nav>Navigation items</nav>
  </Sidebar>

  <Container>
    <main>Main content area</main>
  </Container>

  <Footer>
    <p>© 2024 Company</p>
  </Footer>
</Layout>
```

### Modal Komponenta
```tsx
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from '@consultation-booking/consultation/frontend/components/ui';

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>

  <ModalContent size="lg">
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>Modal description</ModalDescription>
    </ModalHeader>

    <ModalBody>
      <p>Modal content goes here...</p>
    </ModalBody>

    <ModalFooter>
      <ModalClose asChild>
        <Button variant="outline">Cancel</Button>
      </ModalClose>
      <Button>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Alert Komponenta
```tsx
import { Alert, AlertTitle, AlertDescription } from '@consultation-booking/consultation/frontend/components/ui';

<Alert variant="success" closable onClose={() => setShowAlert(false)}>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>
```

### Loading Komponenta
```tsx
import { Loading, LoadingOverlay, LoadingSkeleton } from '@consultation-booking/consultation/frontend/components/ui';

// Spinner
<Loading size="lg" variant="spinner" text="Loading..." />

// Loading overlay
<LoadingOverlay loading={isLoading}>
  <div>Content that might be loading...</div>
</LoadingOverlay>

// Skeleton loader
<LoadingSkeleton lines={3} />
```

## 🎨 Design Tokens

### Boje
```css
/* Primary colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

/* Semantic colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Spacing & Layout
```css
/* Spacing */
--radius: 0.5rem;
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

/* Container max widths */
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-3xl { max-width: 48rem; }
```

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Grid System
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## 🌓 Dark Mode

Automatski podržava dark mode koristeći `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }

  body {
    color: hsl(210 40% 98%);
    background-color: hsl(222.2 84% 4.9%);
  }
}
```

## 🎭 Custom Utilities

### Glass Effect
```tsx
<div className="glass">Glass morphism effect</div>
<div className="glass-dark">Dark glass effect</div>
```

### Text Balance
```tsx
<p className="text-balance">This text will be balanced across lines</p>
```

### Custom Animations
```tsx
<div className="animate-shimmer">Shimmer effect</div>
```

## 📐 Best Practices

### 1. Component Composition
```tsx
// Dobro - koristi komponente
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Loše - inline stilovi
<div style={{ padding: '1rem', background: 'white' }}>
  <h3>Title</h3>
  <p>Content</p>
</div>
```

### 2. Consistent Spacing
```tsx
// Koristi gap utilities
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Koristi padding/margin utilities
<div className="p-6">
  <div className="mb-4">Content</div>
</div>
```

### 3. Responsive Design
```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

### 4. Loading States
```tsx
// Uvijek dodaj loading state
{isLoading ? (
  <Loading />
) : (
  <div>Data loaded</div>
)}
```

### 5. Error Handling
```tsx
// Koristi error state u komponentama
<Input
  error={errors.email?.message}
  helperText="Enter a valid email"
/>
```

## 🚀 Performance Tips

1. **Koristi lazy loading** za velike komponente
2. **Optimizuj slike** sa proper sizing
3. **Koristi CSS Grid/Flexbox** umjesto float-ova
4. **Minimizuj bundle size** sa tree shaking
5. **Koristi CSS variables** umjesto hardkodovanih vrijednosti

## 📚 Available Components

### UI Components
- ✅ Button (sa loading, icons, variants)
- ✅ Input (sa error states, icons, helper text)
- ✅ Card (sa variants, padding options)
- ✅ Modal (full featured modal system)
- ✅ Alert (notifications sa auto-close)
- ✅ Loading (spinners, skeletons, overlays)
- ✅ Badge, Avatar, Calendar, Popover, Select, Textarea, Label

### Layout Components
- ✅ Layout (main layout wrapper)
- ✅ Container (max-width container)
- ✅ Header, Sidebar, Footer

### Feature Components
- ✅ EmployeeCard (za employee profiles)
- ✅ EmployeeGrid (za listu employe-a)
- ✅ BookingForm (za zakazivanje)
- ✅ AdminLayout (za admin panel)

Ovaj UI sistem pruža consistent, accessible i performant komponentu za cijelu aplikaciju! 🎉
