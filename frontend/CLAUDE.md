# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website built with React 19, featuring authentication, blog functionality, and admin capabilities. The application uses Prisma with PostgreSQL for data persistence and NextAuth.js for authentication with both OAuth (Google) and credentials-based login.

## Architecture

### Core Technologies
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components and dark/light theme support
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with PrismaAdapter
- **State Management**: Zustand for client-side state
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest with Testing Library

### Project Structure
- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components organized by feature
- `lib/` - Utility functions, database connection, auth configuration
- `prisma/` - Database schema and seed files

### Key Models (Prisma Schema)
- **Users**: Authentication with role-based access (USER, ADMIN, EDITOR)
- **Posts**: Blog posts with author relationships
- **Projects**: Portfolio projects with metadata
- **Accounts/Sessions**: NextAuth.js integration tables

### Authentication Flow
- NextAuth.js configuration in `lib/auth.ts`
- Custom pages: `/auth/signin`, `/auth/signup`, `/auth/error`
- Role-based access control with USER, ADMIN, EDITOR roles
- JWT session strategy with custom callbacks

### Component Architecture
- UI components use shadcn/ui patterns
- Theme provider supports dark/light mode switching
- Responsive header with navigation
- Form components with validation using react-hook-form + Zod

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run Jest tests

### Database
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio
- `npm run seed` - Seed database with initial data

### Environment Setup
Ensure these environment variables are configured:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Application base URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth credentials

## Testing

The project uses Jest with a basic configuration. Tests should be written using Testing Library patterns for React components.

## Important Notes

- Always run `npx prisma generate` after schema changes
- Database migrations require `npx prisma db push` for development
- Authentication requires proper environment variables
- The application supports both light and dark themes via next-themes