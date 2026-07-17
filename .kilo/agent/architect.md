---
description: "Shining English FE"
mode: primary
---

# Shining English — Frontend Architecture

## Tech Stack

- **Next.js** 16 (App Router, React 19)
- **Tailwind CSS** v4 + `tw-animate-css`
- **shadcn/ui** (Radix primitives via `@radix-ui/*`)
- **Icons**: `lucide-react`
- **State**: `zustand` v5
- **Styling**: `class-variance-authority`, `tailwind-merge`, `clsx`
- **Forms**: `react-hook-form` + `zod` + `@hookform/resolvers`
- **HTTP**: custom `fetch`-based client + Next.js proxy
- **DI**: custom IoC container (no external DI library)
- **API Data**: `class-transformer` + `reflect-metadata`
- **Dates**: `date-fns` (locale `vi`)
- **Charts**: `recharts`
- **Animations**: `gsap`, `framer-motion` via `vaul`

## Directory Structure

```
app/                          # Next.js App Router pages & route handlers
├── api/proxy/[...path]/      # Proxy route — sole gateway to backend
├── dashboard/                # Student dashboard (with stores/)
├── notifications/            # Notification list page
├── profile/                  # User profile (with components/)
├── courses/                  # Course pages (with stores/, components/)
├── cart/ checkout/ orders/   # Shopping & order flow
├── settings/ notes/ blogs/   # Misc feature pages
├── layout.tsx                # Root layout: SiteHeader + SiteFooter
└── globals.css               # Tailwind v4 globals

data/                         # Data layer
├── models/                   # Class models with @Expose/@Type decorators
│   ├── base.model.ts         # BaseModel (id, createdAt, updatedAt)
│   └── *.model.ts            # Per-domain models
├── dtos/common/              # Shared response wrappers
│   ├── object-response.ts    # ObjectResponse<T>
│   ├── list-response.ts      # ListResponse<T>
│   ├── pagination-response.ts# PaginationResponse<T>
│   └── common-request.ts
├── repositories/remote/      # Repository interfaces + implementations
│   ├── <domain>/
│   │   ├── *.repository.interface.ts
│   │   └── *.repository.ts
│   ├── base.repository.ts    # BaseRepository — GET/POST/PUT/PATCH/DELETE helpers
│   └── access-token/         # Access token endpoints
└── types/
    ├── api-result.ts         # ApiResult<Success, Failure>
    └── api-exception.ts      # ApiException

infra/                        # Infrastructure layer
├── http/
│   ├── http-client.ts        # HttpClient abstraction interface
│   ├── client-side-http.client.ts  # Browser HTTP client
│   └── server-side-http.client.ts  # SSR HTTP client
├── backend/                  # Backend gateway helpers, token/cookie infra
├── security/                 # Proxy guard, request helpers
└── events/                   # EventBus, EventManager

shared/                       # Shared code
├── components/
│   ├── ui/                   # shadcn/ui primitives + domain composites
│   ├── auth/                 # Auth guards (client-auth-guard.tsx)
│   └── providers/            # IoC bootstrap, Google OAuth, reCAPTCHA
├── stores/                   # Global Zustand stores
│   ├── auth.store.ts         # Auth session state
│   ├── cart.store.ts         # Cart state (items, count)
│   ├── star.store.ts         # Star balance
│   ├── notification.store.ts # Notification list + unread count
│   └── city.store.ts         # City data
├── ioc/                      # IoC container
│   ├── tokens.ts             # IOC_TOKENS constants
│   ├── ioc-container.ts      # Container implementation
│   ├── client-container.ts   # Client-side bindings
│   └── server-container.ts   # Server-side bindings
├── constants/
│   └── app-endpoints.ts      # API endpoint paths
├── enums/
│   └── app-status.ts         # AppStatus (initial/loading/done/success/error)
├── mappers/
│   └── model.mapper.ts       # mapToModel / mapToModelList
├── validations/
│   └── auth-schemas.ts       # Zod schemas
└── utils/                    # Utility functions (currency, date, string, etc.)
```

## Data Flow (Unidirectional)

```
Page/Component
  → Zustand Store (action)
    → Repository Interface
      → Repository Implementation
        → HttpClient (ClientSideHttpClient)
          → /api/proxy/[...path]  (Next.js API route)
            → Backend Laravel API
```

- Pages NEVER call backend directly or use `fetch`.
- Pages NEVER instantiate repositories directly — go through IoC.
- Stores handle all async logic (loading, error, success states via `AppStatus`).

## Repository Pattern

1. **Interface** — `data/repositories/remote/<domain>/<name>.repository.interface.ts`
   - Defines method signatures returning `Promise<ApiResult<T, ApiException>>`
2. **Implementation** — `data/repositories/remote/<domain>/<name>.repository.ts`
   - Extends `BaseRepository`
   - Uses `AppEndpoints.<domain>.*` for URLs
   - Maps responses via `ObjectResponse.fromApiJson()` or `PaginationResponse.fromJson()`
3. **IoC Binding** — in `shared/ioc/client-container.ts`
4. **Token** — in `shared/ioc/tokens.ts`

## State Management (Zustand)

**Global stores** (in `shared/stores/`):
- `auth.store.ts` — current user, authenticated status, fetchMe, logout
- `cart.store.ts` — cart items, count, add/remove/clear
- `star.store.ts` — star balance, check-in, pay for course
- `notification.store.ts` — notification list, unread count, mark as read

**Domain stores** (in `app/<domain>/stores/`):
- `app/courses/stores/course/*.store.ts`
- `app/dashboard/stores/dashboard.store.ts`

Store pattern: `interface StoreProps` (state) + `interface StoreState` (state + actions) + `create<StoreState>()` — actions are async, set loading/done/error via `AppStatus`.

## Auth Rules

- **Developer token**: `Authorization` header (bearer token from backend `/access-token`)
- **User token**: `User-Authorization` header (Sanctum token from login/register)
- Auth store: `shared/stores/auth.store.ts`
- Guest guard: `shared/components/auth/client-auth-guard.tsx`
- All `/api/proxy/...` requests automatically include both tokens

## API Endpoints (shared/constants/app-endpoints.ts)

All backend paths are centralized here. When adding new API calls, add the path to this file first.

## Models & DTOs

```typescript
export class Course extends BaseModel {
  @Expose({ name: 'lessons_count' })
  lessonsCount?: number
  // class-transformer @Expose / @Type decorators
  serialize(): SerializedCourse { ... }
}
```

- Extend `BaseModel` for API models with `id`, `createdAt`, `updatedAt`.
- Use `@Expose({ name: 'backend_field_name' })` for snake_case to camelCase mapping.
- Use `@Type(() => RelatedModel)` for nested objects.
- `ObjectResponse<T>` wraps `{ status, status_code, data }`.
- `PaginationResponse<T>` extends `ObjectResponse` with `current_page`, `last_page`, etc.

## UI Conventions

- **Component library**: shadcn/ui primitives in `shared/components/ui/`
- **Icons**: lucide-react (`import { Bell } from 'lucide-react'`)
- **Tailwind v4**: uses `@import "tailwindcss"` in `globals.css`
- **Brand color**: `var(--brand-900)` CSS variable
- **Dark mode**: supported via `next-themes` + `class` strategy
- **Toast notifications**: `sonner` for app-level toasts
- **Buttons**: `AppButton` wrapper component in `shared/components/ui/app-button.tsx`

## Test / Verify Commands

```bash
npm run dev          # Start dev server
npx tsc --noEmit     # TypeScript type check (use this instead of eslint)
npm run build        # Production build
```

## Code Generation Rules

When adding a new feature:

1. Add endpoint to `shared/constants/app-endpoints.ts`
2. Add/update model in `data/models/*.model.ts`
3. Create repository interface in `data/repositories/remote/<domain>/`
4. Create repository implementation in `data/repositories/remote/<domain>/`
5. Bind in `shared/ioc/client-container.ts` + add token in `shared/ioc/tokens.ts`
6. Create Zustand store in `shared/stores/` (global) or `app/<domain>/stores/` (domain)
7. Create UI components in `shared/components/` (reusable) or `app/<domain>/components/` (domain)
8. Wire store into the page/component

Always check sibling files for existing patterns before introducing new ones.
