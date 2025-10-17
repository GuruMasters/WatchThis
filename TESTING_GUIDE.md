# 🧪 Testing Guide - WatchThis Application

**Last Updated**: October 16, 2025  
**Status**: Foundation Setup - Ready for Tests

---

## 📋 Testing Strategy

### Test Pyramid

```
        /\
       /E2E\       <-- 10% (Critical user flows)
      /------\
     /Integration\ <-- 30% (API endpoints, services)
    /------------\
   /  Unit Tests  \ <-- 60% (Functions, components, utils)
  /----------------\
```

---

## 🎯 Testing Goals

- ✅ **70%+ Code Coverage** (minimum)
- ✅ **90%+ Critical Path Coverage**
- ✅ **Zero Regressions** (CI/CD enforcement)
- ✅ **Fast Feedback** (< 5 min test suite)

---

## 🛠️ Testing Stack

### Frontend

| Tool | Purpose | Status |
|------|---------|--------|
| **Jest** | Test runner | ✅ Configured |
| **Testing Library** | React component testing | ✅ Configured |
| **Vitest** | Vite-native testing | ✅ Alternative |
| **Cypress** | E2E testing | ⏳ To setup |
| **Playwright** | E2E alternative | ⏳ To setup |

### Backend

| Tool | Purpose | Status |
|------|---------|--------|
| **Jest** | Test runner | ✅ Configured |
| **Supertest** | HTTP testing | ⏳ To install |
| **Firebase Emulator** | Database testing | ⏳ Optional |

---

## 🏗️ Test Structure

### Frontend Tests

```
consultation-frontend/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Button.spec.tsx      ✅ Unit test
│   ├── pages/
│   │   └── home/
│   │       ├── HomePage.tsx
│   │       └── HomePage.spec.tsx    ✅ Integration test
│   └── utils/
│       ├── helpers.ts
│       └── helpers.spec.ts          ✅ Unit test
└── e2e/
    └── booking-flow.spec.ts         ✅ E2E test
```

### Backend Tests

```
consultation-backend/
├── src/
│   ├── ai/
│   │   ├── ai.service.ts
│   │   ├── ai.service.spec.ts       ✅ Unit test
│   │   └── ai.controller.spec.ts   ✅ Integration test
│   └── translation/
│       ├── translation.service.ts
│       └── translation.service.spec.ts
└── test/
    └── e2e/
        └── booking.e2e-spec.ts      ✅ E2E test
```

---

## 📝 Test Examples

### 1. Frontend Unit Test (Component)

**File**: `libs/consultation/frontend/components/ui/Button.spec.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('applies variant styles correctly', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-[var(--wt-accent)]');
  });
});
```

---

### 2. Frontend Integration Test (Page)

**File**: `libs/consultation/frontend/pages/home/HomePage.spec.tsx`

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('HomePage', () => {
  it('renders hero section', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/WatchThis/i)).toBeInTheDocument();
  });

  it('displays services overview', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
  });

  it('shows call-to-action buttons', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Book Consultation/i)).toBeInTheDocument();
  });

  it('navigates to booking page on CTA click', async () => {
    renderWithRouter(<HomePage />);
    const bookingButton = screen.getByText(/Book Consultation/i);
    
    fireEvent.click(bookingButton);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/booking');
    });
  });
});
```

---

### 3. Backend Unit Test (Service)

**File**: `consultation-backend/src/translation/translation.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationService],
    }).compile();

    service = module.get<TranslationService>(TranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('translateText', () => {
    it('returns original text when target language is same as source', async () => {
      const result = await service.translateText({
        text: 'Hello',
        targetLanguage: 'en',
        sourceLanguage: 'en',
      });

      expect(result.translatedText).toBe('Hello');
      expect(result.method).not.toBe('api');
    });

    it('uses manual translation when available', async () => {
      const result = await service.translateText({
        text: 'Hello! Welcome to WatchThis.',
        targetLanguage: 'sr',
        sourceLanguage: 'en',
      });

      expect(result.translatedText).toContain('Здраво');
      expect(result.method).toBe('manual');
    });

    it('caches translations', async () => {
      const request = {
        text: 'Test',
        targetLanguage: 'sr',
        sourceLanguage: 'en',
      };

      // First call
      await service.translateText(request);
      
      // Second call should use cache
      const result = await service.translateText(request);
      expect(result.method).toBe('cache');
    });
  });

  describe('getCacheStats', () => {
    it('returns cache size', () => {
      const stats = service.getCacheStats();
      expect(stats).toHaveProperty('size');
      expect(stats).toHaveProperty('maxSize');
      expect(stats.maxSize).toBe(1000);
    });
  });
});
```

---

### 4. Backend Integration Test (API)

**File**: `consultation-backend/src/ai/ai.controller.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AIModule } from './ai.module';
import { TranslationModule } from '../translation/translation.module';

describe('AIController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AIModule, TranslationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/ai/chat (POST)', () => {
    it('returns AI response', () => {
      return request(app.getHttpServer())
        .post('/api/ai/chat')
        .send({
          message: 'What services do you offer?',
          language: 'en',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('response');
          expect(res.body).toHaveProperty('language');
          expect(res.body.language).toBe('en');
        });
    });

    it('validates required fields', () => {
      return request(app.getHttpServer())
        .post('/api/ai/chat')
        .send({})
        .expect(400);
    });

    it('handles Serbian language', () => {
      return request(app.getHttpServer())
        .post('/api/ai/chat')
        .send({
          message: 'Koje usluge nudite?',
          language: 'sr',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.language).toBe('sr');
        });
    });
  });

  describe('/api/ai/health (GET)', () => {
    it('returns health status', () => {
      return request(app.getHttpServer())
        .get('/api/ai/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status');
          expect(res.body).toHaveProperty('api_configured');
        });
    });
  });
});
```

---

### 5. E2E Test (Cypress)

**File**: `consultation-frontend/e2e/booking-flow.cy.ts`

```typescript
describe('Booking Flow', () => {
  beforeEach(() => {
    cy.visit('/booking');
  });

  it('completes booking successfully', () => {
    // Step 1: Select service
    cy.contains('Web Development').click();
    cy.contains('Next').click();

    // Step 2: Select consultant
    cy.contains('John Doe').click();
    cy.contains('Next').click();

    // Step 3: Select date & time
    cy.get('[data-testid="calendar"]').click();
    cy.get('[data-date="2025-11-01"]').click();
    cy.contains('10:00 AM').click();
    cy.contains('Next').click();

    // Step 4: Fill details
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('+1234567890');
    cy.contains('Submit').click();

    // Verify success
    cy.contains('Booking Confirmed').should('be.visible');
  });

  it('validates required fields', () => {
    // Try to submit without filling
    cy.contains('Submit').click();
    
    // Should see validation errors
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible();
  });

  it('allows going back to previous steps', () => {
    cy.contains('Next').click();
    cy.contains('Back').click();
    
    // Should be on first step
    cy.contains('Select Service').should('be.visible');
  });
});
```

---

## 🚀 Running Tests

### Frontend Tests

```bash
# Run all tests
yarn nx test consultation-frontend

# Run in watch mode
yarn nx test consultation-frontend --watch

# Run with coverage
yarn nx test consultation-frontend --coverage

# Run specific test file
yarn nx test consultation-frontend --testFile=Button.spec.tsx
```

### Backend Tests

```bash
# Run all tests
yarn nx test consultation-backend

# Run with coverage
yarn nx test consultation-backend --coverage

# Run E2E tests
yarn nx e2e consultation-backend-e2e
```

### E2E Tests (Cypress)

```bash
# Open Cypress UI
yarn nx e2e consultation-frontend-e2e --watch

# Run headless
yarn nx e2e consultation-frontend-e2e
```

---

## 📊 Coverage Requirements

### Minimum Coverage Targets

| Type | Target | Current |
|------|--------|---------|
| **Statements** | 70% | TBD |
| **Branches** | 65% | TBD |
| **Functions** | 70% | TBD |
| **Lines** | 70% | TBD |

### Critical Path Coverage

| Feature | Target | Priority |
|---------|--------|----------|
| **Booking Flow** | 90% | HIGH |
| **AI Chat** | 85% | HIGH |
| **Translation** | 80% | MEDIUM |
| **Authentication** | 90% | HIGH |
| **Payment** | 95% | CRITICAL |

---

## 🔄 CI/CD Integration

Tests run automatically on:
- ✅ Every push to `main` or `develop`
- ✅ Every pull request
- ✅ Before deployment

**Pipeline checks**:
1. Lint
2. Unit tests
3. Integration tests
4. E2E tests (on main)
5. Coverage report

**Deployment blocked if**:
- ❌ Any test fails
- ❌ Coverage < 70%
- ❌ Linting errors

---

## 🎯 Best Practices

### 1. Test Naming
```typescript
// ✅ Good
it('returns 400 when email is invalid')

// ❌ Bad
it('test email validation')
```

### 2. Arrange-Act-Assert
```typescript
it('adds item to cart', () => {
  // Arrange
  const cart = new ShoppingCart();
  const item = { id: 1, name: 'Product' };

  // Act
  cart.addItem(item);

  // Assert
  expect(cart.items).toHaveLength(1);
  expect(cart.items[0]).toBe(item);
});
```

### 3. Mock External Dependencies
```typescript
jest.mock('../services/api');

it('fetches user data', async () => {
  const mockApi = api as jest.Mocked<typeof api>;
  mockApi.getUser.mockResolvedValue({ id: 1, name: 'John' });

  const user = await fetchUser(1);
  expect(user.name).toBe('John');
});
```

### 4. Test Edge Cases
```typescript
describe('divide', () => {
  it('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('throws when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  it('handles negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });
});
```

---

## 📚 Resources

### Documentation
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Cypress](https://www.cypress.io/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

### Example Tests
- Check `libs/consultation/frontend/components/ui/__tests__/` for examples
- Backend tests in `consultation-backend/src/**/*.spec.ts`

---

## 🎓 Testing Checklist

### Before Writing Tests
- [ ] Understand the feature requirements
- [ ] Identify critical paths
- [ ] List edge cases
- [ ] Plan test structure

### While Writing Tests
- [ ] Write descriptive test names
- [ ] Follow AAA pattern
- [ ] Mock external dependencies
- [ ] Test happy path first
- [ ] Then test edge cases
- [ ] Avoid test interdependencies

### After Writing Tests
- [ ] Run tests locally
- [ ] Check coverage report
- [ ] Review failing tests
- [ ] Refactor if needed
- [ ] Document complex tests

---

## 🚦 Test Maturity Levels

### Level 1: Basic (Current)
- Unit tests for utilities
- Component smoke tests
- Basic API tests

### Level 2: Intermediate (Goal)
- 70%+ coverage
- Integration tests
- E2E for critical flows
- CI/CD integration

### Level 3: Advanced (Future)
- 90%+ coverage
- Performance tests
- Visual regression tests
- Mutation testing
- Contract testing

---

**Ready to start testing!** 🧪

Created: October 16, 2025  
Version: 1.0

