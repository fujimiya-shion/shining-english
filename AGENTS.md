# FE Agent Guide

Scope: this file applies to the frontend repo rooted here.

## Architecture Overview

This frontend follows a layered structure:

- `app/`
  - routes, page-level UI, domain components, domain stores
- `data/`
  - models, DTOs, repository contracts, repository implementations, API result types
- `infra/`
  - backend gateway helpers, HTTP clients, proxy/security helpers
- `shared/`
  - reusable UI, providers, constants, enums, IoC, mappers, global stores, shared utilities

When adding new code, place it in the correct layer instead of creating cross-cutting shortcuts.

## Core Direction

- Prefer `client-first`.
- Only use SSR auth checks for pages that are truly server-side by nature.
- For normal app pages, auth gating should be handled on the client with Zustand store + Next router.
- Do not introduce ad hoc patterns when a repo pattern already exists.

## State Management

- Use Zustand, not raw `useState`, for meaningful UI state and page/domain state.
- Treat Zustand stores like `cubit` in `flutter_bloc`:
  - state shape is explicit
  - actions live in the store
  - page components bind to store state and call store actions
- Avoid scattered `setState` UI logic for forms such as login, register, forgot password, reset password, filters, paginated lists, etc.
- Tiny ephemeral UI-only state is acceptable with React state only when it is truly local and not worth promoting. Default bias is still toward store-based state.

## Store Placement

- Global shared state goes in `shared/stores`.
- Domain/page-local state goes in `app/<domain>/stores`.
- Follow the course module as the reference pattern:
  - `app/courses/stores/course/course.store.ts`
  - `app/courses/stores/course/course-filter.store.ts`

Examples:

- auth session store: `shared/stores/auth.store.ts`
- login form store: `app/login/stores/login.store.ts`
- register form store: `app/register/stores/register.store.ts`

## Data Flow

- UI/page/component should not call backend APIs directly.
- Go through repository contracts.
- Preferred flow:
  1. page/component
  2. Zustand store
  3. repository interface
  4. repository implementation
  5. HTTP client
  6. `/api/proxy/...`
  7. backend

- Do not call backend directly from browser code.
- Use the Next proxy layer for API access.

## App Router Conventions

- Prefer App Router conventions already used by the repo.
- Keep page files thin.
- If a page is mostly interactive, move the implementation into a client component under the same domain and keep the page as a small entry point.
- Do not force SSR just for auth gating on pages that should stay client-first.
- Use `server-only` boundaries intentionally when code is truly server-side.
- Use `"use client"` only where interactivity/state/router hooks are actually needed.

## Repository Pattern

- Define contract first in `data/repositories/remote/**/**.repository.interface.ts`.
- Implement contract in `data/repositories/remote/**/**.repository.ts`.
- Bind implementation in IoC:
  - `shared/ioc/client-container.ts`
  - `shared/ioc/server-container.ts` when needed
- Resolve repositories via `resolveClient(...)` or `resolveServer(...)`, never by manual `new` inside pages/components.

Repository conventions:

- Repository interface defines the contract the rest of the app depends on.
- Repository implementation is responsible for calling the HTTP client and mapping responses into DTO/model classes.
- Return `ApiResult<SuccessType, ApiException>`.
- Prefer reusing existing DTOs such as `ObjectResponse<T>` instead of inventing inconsistent response wrappers.

## HTTP / Proxy Rules

- Frontend API calls must go through `/api/proxy/...`.
- Reuse shared HTTP clients:
  - `infra/http/client-side-http.client.ts`
  - `infra/http/server-side-http.client.ts`
- Keep auth/token handling centralized in proxy and infra helpers, not duplicated in pages.
- Avoid hardcoded auth cookie names, header names, and TTLs when a shared helper/config exists.

HTTP conventions:

- `ClientSideHttpClient` is for browser-side repository usage.
- `ServerSideHttpClient` is for true server-side repository usage.
- Use the shared `HttpClient` abstraction from `infra/http/http-client.ts`.
- Do not bypass these clients with custom `fetch` wrappers unless the architecture itself is being intentionally extended.
- When no request body exists, do not force JSON body/content-type semantics.

## Auth Rules

- Developer token and user token are different flows. Do not mix them.
- `Authorization` is reserved for the developer access token.
- User auth uses `User-Authorization`.
- On app bootstrap and all normal proxy/backend calls, the frontend transport layer must still provide the developer access token via `Authorization`.
- User access token is additional context on top of the developer token, not a replacement for it.
- User session state belongs in the global auth store.
- Page-specific auth actions belong in the page/domain store:
  - `login()` in login store
  - `register()` in register store
  - `forgotPassword()` in forgot-password store
  - `resetPassword()` in reset-password store
- On auth success, sync global auth store from the page/domain flow instead of duplicating user state locally.
- Prefer Next router APIs over browser navigation APIs for app navigation.

Auth routing conventions:

- Guest-only pages should use a client-side guest guard when they are client-first pages.
- Auth-required pages should use a client-side auth guard when they are client-first pages.
- SSR auth guards are reserved for pages that are truly server-rendered for other reasons, not as the default.

## Component Responsibilities

- Page components should stay thin.
- Stores handle page logic, async actions, loading state, error state, and success state.
- Shared components should not own domain business logic.
- Header/auth UI should consume the global auth store instead of receiving duplicated auth props through many layers.

Component boundaries:

- Domain-specific components stay under their domain in `app/<domain>/components`.
- Reusable components stay under `shared/components`.
- Shared components should remain generic and not import domain stores unless they are intentionally app-global concerns.

## Models / DTOs

- Map API data into existing models/DTOs instead of passing raw JSON through the app.
- This repo uses class-based model/DTO mapping with `reflect-metadata`.
- When defining or extending models/DTOs, follow the existing mapping approach used by the repo. Do not silently downgrade to loose plain-object typing.
- If a new field comes from backend, update the class model/DTO and its mapping path deliberately.
- Preserve decorator/metadata-based transformation compatibility where the repo already relies on it.
- If backend response changes, update the model/DTO mapping first.

Mapping conventions:

- Use `class-transformer` mapping through shared mapper utilities.
- Reuse `mapToModel(...)` and `mapToModelList(...)` from `shared/mappers/model.mapper.ts`.
- Base date normalization already happens in the mapper layer. Do not duplicate date parsing randomly in pages/components.
- Extend `BaseModel` where appropriate for API models with `id`, `createdAt`, `updatedAt`.
- Keep serialization/mapping concerns out of page components.

## API Result / Error Handling

- Reuse `ApiResult` and `ApiException`.
- Repository implementations should normalize transport/API errors into `ApiException`.
- Stores should handle `success/error` branches and expose UI-ready state.
- Components should render store state, not parse transport errors directly.

## Folder Discipline

- Keep shared reusable code under `shared/`.
- Keep domain-specific code under `app/<domain>/`.
- Do not place page/domain stores into `shared/stores`.
- Do not place global stores into domain folders.

Additional folder rules:

- `infra/backend/`
  - backend-facing helpers, token/cookie/proxy-related infra
- `infra/http/`
  - HTTP abstraction and concrete clients
- `infra/security/`
  - request/cookie/proxy guard security helpers
- `shared/ioc/`
  - container, tokens, bindings
- `shared/mappers/`
  - transformation/mapping helpers
- `shared/server/`
  - server-only helpers used intentionally by server-side flows

## IoC Rules

- IoC is part of the architecture, not optional sugar.
- Register repositories in the container and resolve by token.
- Use `IOC_TOKENS` for bindings, not ad hoc symbols or string keys.
- Keep client bindings in `shared/ioc/client-container.ts`.
- Keep server bindings in `shared/ioc/server-container.ts`.
- If a new repository or service abstraction is added, update bindings in the proper container.
- Pages/components/stores should depend on contracts/tokens, not concrete implementations where avoidable.

## Infra Rules

- `infra` code is the boundary to external systems and transport concerns.
- Backend URL construction, header forwarding, token/cookie persistence, and proxy guard logic belong in `infra`, not in pages or stores.
- The API proxy route is part of infra architecture. Keep it as the single browser-facing gateway to backend APIs.
- If auth/session transport rules change, update infra/proxy helpers first and then adjust repositories/stores.

## Implementation Bias

When adding a new feature, default sequence is:

1. add/update model or DTO
2. add/update repository interface
3. add/update repository implementation
4. bind through IoC if needed
5. add/update Zustand store
6. connect page/component to the store
7. ensure requests go through proxy

If the feature touches infrastructure, use this sequence instead:

1. update env/config/constants if needed
2. update infra helper or proxy behavior
3. update repository contract/implementation
4. update model/DTO mapping
5. update store
6. update UI

## Server / Client Boundary Rules

- Files that import `server-only` helpers must stay server-side.
- Client components/stores must not import server-only modules.
- If a feature needs both server and client access, expose it through proper repository + HTTP layers rather than leaking server helpers into client code.
- Use server-side repositories only when there is a genuine server-side rendering/data need.

## Avoid

- raw `fetch` inside pages/components
- direct backend URLs in UI code
- duplicated API logic across multiple components
- pushing form business logic into JSX
- mixing global auth state with page form state
- SSR auth checks on pages that should remain client-first
- `window.location` style navigation for normal app routing
- bypassing IoC and instantiating repositories ad hoc in random layers
- writing transport/header/cookie logic inside components
- returning raw backend JSON deep into the UI tree
- creating new architectural patterns when an existing repo pattern already solves the same problem

## Current Reference Files

- `shared/stores/auth.store.ts`
- `shared/components/auth/client-auth-guard.tsx`
- `app/login/stores/login.store.ts`
- `app/register/stores/register.store.ts`
- `app/forgot-password/stores/forgot-password.store.ts`
- `app/reset-password/stores/reset-password.store.ts`
- `data/repositories/remote/user/user.repository.interface.ts`
- `data/repositories/remote/user/user.repository.ts`
- `shared/ioc/client-container.ts`
- `shared/ioc/server-container.ts`
- `shared/ioc/tokens.ts`
- `infra/http/client-side-http.client.ts`
- `infra/http/server-side-http.client.ts`
- `infra/backend/http.ts`
- `infra/backend/user-access-token.ts`
- `infra/security/proxy-guard.ts`
- `shared/mappers/model.mapper.ts`
- `data/types/api-result.ts`
- `data/types/api-exception.ts`
- `app/api/proxy/[...path]/route.ts`

If a new change conflicts with these rules, prefer aligning the code with these rules rather than introducing another pattern.
