## AGENTS.md

This file provides guidelines for agentic coding agents.

### Frontend (Next.js)

- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Run a single test:** `npm test -- <path_to_test_file>`
- **Run all tests:** `npm test`

### Backend (Laravel)

- **Directory:** `backend/my-laravel-backend-service`
- **Run tests:** `php artisan test`
- **Run a single test:** `php artisan test --filter <test_name>`
- **Lint:** `./vendor/bin/pint`

### Code Style

- **Imports:** Use absolute paths for imports.
- **Formatting:** Use Prettier for formatting.
- **Types:** Use TypeScript for type safety.
- **Naming Conventions:** Use camelCase for variables and functions.
- **Error Handling:** Use try/catch blocks for error handling.
