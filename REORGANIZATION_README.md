# Project Reorganization

This project has been reorganized to follow a clean architecture pattern with centralized logic in `libs/` and thin application shells.

## 📁 New Structure

```
consultation-booking/
├── apps/                          # Application shells (thin wrappers)
│   ├── consultation-frontend/     # Frontend app (React + Vite)
│   │   ├── src/
│   │   │   ├── app/              # Main app component
│   │   │   └── main.tsx          # Entry point
│   │   ├── index.html            # HTML template
│   │   └── vite.config.ts        # Build configuration
│   │
│   ├── consultation-backend/      # Backend app (NestJS)
│   │   ├── src/
│   │   │   └── main.ts           # Entry point
│   │   └── tsconfig.json         # TypeScript configuration
│   │
│   └── consultation-mobile/       # Mobile app (React Native)
│
├── libs/                          # Shared business logic
│   ├── shared/
│   │   └── firebase-config/      # Firebase configuration
│   │
│   └── consultation/             # Domain-specific logic
│       ├── frontend/             # Frontend logic
│       │   ├── components/       # UI components
│       │   ├── hooks/            # React hooks
│       │   ├── services/         # API services
│       │   ├── types/            # TypeScript types
│       │   ├── utils/            # Utility functions
│       │   └── pages/            # Page components
│       │
│       └── backend/              # Backend logic
│           ├── controllers/       # API controllers
│           ├── services/          # Business logic
│           ├── modules/           # NestJS modules
│           └── dto/               # Data transfer objects
│
├── tools/                        # Build tools
└── nx.json                       # Nx configuration
```

## 🔧 How It Works

### Frontend
- **Shell**: `consultation-frontend/` contains only entry points and configuration
- **Logic**: All components, hooks, services, and utilities are in `libs/consultation/frontend/`
- **Imports**: Use `@consultation-booking/consultation/frontend/*` paths

### Backend
- **Shell**: `consultation-backend/` contains only entry point and configuration
- **Logic**: All controllers, services, and modules are in `libs/consultation/backend/`
- **Imports**: Use `@consultation-booking/consultation/backend/*` paths

## 🚀 Running the Applications

### Frontend
```bash
# Development
yarn nx serve consultation-frontend

# Build
yarn nx build consultation-frontend
```

### Backend
```bash
# Development
yarn nx serve consultation-backend

# Build
yarn nx build consultation-backend
```

## 📦 Adding New Features

### Frontend Features
1. Create components in `libs/consultation/frontend/components/`
2. Create hooks in `libs/consultation/frontend/hooks/`
3. Create services in `libs/consultation/frontend/services/`
4. Create pages in `libs/consultation/frontend/pages/`
5. Import in your app shell using the `@consultation-booking/consultation/frontend/*` path

### Backend Features
1. Create controllers in `libs/consultation/backend/controllers/`
2. Create services in `libs/consultation/backend/services/`
3. Create modules in `libs/consultation/backend/modules/`
4. Create DTOs in `libs/consultation/backend/dto/`
5. Import in your backend shell using the `@consultation-booking/consultation/backend/*` path

## 🎯 Benefits

1. **Separation of Concerns**: Clear separation between application shells and business logic
2. **Reusability**: Logic can be easily shared between different applications
3. **Testability**: Easier to test business logic in isolation
4. **Maintainability**: Centralized logic makes it easier to maintain and refactor
5. **Scalability**: Easy to add new applications that reuse existing logic

## 🔄 Migration Guide

If you need to access existing logic:

### From Frontend App
**Before:**
```typescript
import { MyComponent } from './components/MyComponent';
```

**After:**
```typescript
import { MyComponent } from '@consultation-booking/consultation/frontend/components';
```

### From Backend App
**Before:**
```typescript
import { MyService } from './app/my.service';
```

**After:**
```typescript
import { MyService } from '@consultation-booking/consultation/backend/my.service';
```

## 📚 File Organization

### Components Structure
```
libs/consultation/frontend/components/
├── ui/              # Reusable UI components (Button, Input, etc.)
├── layout/          # Layout components (Header, Sidebar, etc.)
├── forms/           # Form components (BookingForm, etc.)
└── features/        # Feature-specific components (EmployeeCard, etc.)
```

### Backend Structure
```
libs/consultation/backend/
├── controllers/     # API endpoint controllers
├── services/        # Business logic services
├── modules/         # NestJS feature modules
└── dto/             # Data transfer objects
```

This reorganization provides a solid foundation for scalable and maintainable code! 🎉
