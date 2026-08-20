# React TypeScript Movie App

This project is an educational React and TypeScript application for working with movies, actors, reviews, filtering, routing, API communication, authentication, and frontend security.

The application uses the separate ASP.NET Core **MovieApi** backend.

[MovieApi](https://github.com/wach78/lexicon-MovieApi)

## Technologies

- React
- TypeScript
- Vite
- React Router
- Bootstrap
- Fetch API
- HTTPS development server
- ASP.NET Core MovieApi backend

## Features

The application currently supports:

- Displaying a list of movies
- Adding movies
- Editing movies
- Deleting movies
- Viewing movie details
- Viewing actors and reviews
- Adding reviews to movies
- Filtering movies by genre
- Searching for movies
- Adding actors to movies
- Navigation with React Router
- Login and logout
- Protected routes
- Automatic authentication checks
- Automatic access-token refresh
- CSRF protection for authentication requests

## Authentication

Authentication is handled by the separate ASP.NET Core MovieApi backend.

The application uses cookie-based authentication:

```text
accessToken  -> HttpOnly cookie
refreshToken -> HttpOnly cookie
```

The React application does not read or store the JWT access token or refresh token directly.

Authentication cookies are sent automatically by the browser using:

```ts
credentials: "include";
```

The backend uses the access token to authenticate protected API requests.

## Login Flow

The login flow is:

```text
GET /api/auth/csrf
        ↓
Receive CSRF request token
        ↓
POST /api/auth/login
        ↓
X-CSRF-TOKEN header
        ↓
Backend creates authentication cookies
        ↓
GET /api/auth/csrf
        ↓
Create a new CSRF token for the authenticated user
```

The CSRF request token is stored only in frontend memory.

The authentication cookies are `HttpOnly`, so JavaScript cannot read them.

## CSRF Protection

The frontend retrieves a CSRF request token from:

```text
GET /api/auth/csrf
```

The token is then sent to protected authentication endpoints using:

```text
X-CSRF-TOKEN: <token>
```

CSRF protection is currently used for:

- Login
- Refresh token requests
- Logout

The ASP.NET Core backend validates the request token together with its antiforgery cookie.

## Automatic Token Refresh

API requests are made through a shared `authFetch()` function.

If an API request returns:

```text
401 Unauthorized
```

the frontend automatically attempts to refresh the authentication session.

The flow is:

```text
API request
    ↓
401 Unauthorized
    ↓
Get CSRF token
    ↓
POST /api/auth/refresh
    ↓
Backend rotates refresh token
    ↓
New authentication cookies
    ↓
Retry original API request
```

The frontend uses a shared refresh promise so that multiple simultaneous `401` responses do not cause multiple refresh requests.

This helps prevent race conditions when refresh-token rotation is used.

## Protected Routes

Protected pages use a `ProtectedRoute` component.

Instead of checking a token in browser storage, the frontend asks the backend whether the current user is authenticated:

```text
GET /api/auth/me
```

The route has three states:

```text
loading
authenticated
not authenticated
```

If the user is not authenticated, React redirects to:

```text
/login
```

Protected routes currently include:

```text
/
/movies/:id
```

## Logout

Logout sends a CSRF-protected request to:

```text
POST /api/auth/logout
```

The backend then removes the authentication cookies and invalidates the refresh token.

The frontend then redirects the user to:

```text
/login
```

## HTTPS Development

The Vite development server runs over HTTPS.

HTTPS support is provided by:

```text
@vitejs/plugin-basic-ssl
```

The development server runs at:

```text
https://localhost:5173
```

Because the development certificate is self-signed, the browser may display a certificate warning the first time the site is opened.

## MovieApi

This frontend requires the separate MovieApi project to be running.

Repository:

[MovieApi](https://github.com/wach78/lexicon-MovieApi)

The frontend currently connects to:

```text
https://localhost:7030/api
```

The API provides endpoints for:

- Authentication
- Movies
- Movie details
- Actors
- Reviews
- Movie and actor relationships

## Project Structure

The project is organized into separate areas for components, pages, DTOs, services, and constants.

Example structure:

```text
src/
├── components/
│   ├── movies/
│   ├── reviews/
│   └── ProtectedRoute.tsx
├── constants/
├── dtos/
│   ├── movie/
│   ├── review/
│   ├── actor/
│   └── auth/
├── pages/
│   ├── MoviesPage.tsx
│   ├── MovieDetailsPage.tsx
│   └── LoginPage.tsx
├── services/
│   ├── MovieService.ts
│   ├── ReviewService.ts
│   ├── ActorService.ts
│   └── AuthService.ts
├── App.tsx
└── main.tsx
```

## Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
https://localhost:5173
```

The MovieApi backend must also be running.

## Available Commands

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Format files with Prettier:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Purpose

The purpose of this project is to practice:

- React components
- React state with `useState`
- Side effects with `useEffect`
- TypeScript interfaces and DTOs
- React Router
- Forms and validation
- API communication with `fetch`
- Query parameters and filtering
- Working with relationships between API resources
- Authentication flows
- HttpOnly authentication cookies
- Refresh-token rotation
- Automatic token refresh
- Protected routes
- CSRF protection
- HTTPS development
- Separation of API services

## Security Notes

This project is an educational exercise and not a production-ready authentication system.

The current implementation demonstrates several important security concepts:

- Authentication tokens are not stored in `localStorage` or `sessionStorage`
- Access and refresh tokens are stored in HttpOnly cookies
- HTTPS is used by both frontend and backend during development
- CSRF tokens protect state-changing authentication requests
- Authentication status is verified by the backend
- Refresh tokens are automatically rotated by the backend
- Concurrent refresh requests are prevented in the frontend

Production applications may require additional security controls depending on deployment architecture and requirements.

## Note

This project was created as a learning exercise for React, TypeScript, ASP.NET Core API integration, and web application security.
