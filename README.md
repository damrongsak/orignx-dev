# orignx.dev - Modern Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.0.0-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-blue.svg)](https://www.postgresql.org/)

A high-performance portfolio and blog system for a system architect, featuring:

- Project showcase with ETL/POS/Logistics examples  
- Technical blog with MDX support  
- Admin dashboard with analytics  
- Secure authentication (Google + Credentials)  
- Production-ready deployment on Google Cloud  

---

## 🧠 Project Overview

> A modern portfolio & project site for a system architect and full-stack developer — designed to scale, impress, and handle real production use.

---

## ✅ Features Summary

### 🔹 Public Pages

- `/` – Landing Page พร้อม Hero, CTA, Feature Cards  
- `/about` – แนะนำตัวจากประสบการณ์จริง  
- `/projects` – Showcase โปรเจกต์ (ETL, POS, Logistics ฯลฯ)  
- `/contact` – ช่องทางติดต่อ + ปุ่มอีเมล  
- `/blog` – Blog สำหรับผู้ใช้งานทั่วไป  

### 🔐 Protected Pages (Auth + Role-based)

- `/dashboard` – ต้อง Login (USER, EDITOR, ADMIN)  
- `/dashboard/admin` – เฉพาะ ADMIN  
- `/blog/edit` – สำหรับ EDITOR, ADMIN  
- `/blog/admin` – เฉพาะ ADMIN  

### 🔐 Auth System

- ✅ Login ผ่าน Email/Password และ Google OAuth  
- ✅ Role-based Access Control (`USER`, `EDITOR`, `ADMIN`)  
- ✅ Middleware ป้องกัน route + Redirect  
- ✅ Session management with JWT  
- ✅ `/unauthorized` page สำหรับผู้ที่ไม่มีสิทธิ์  

---

## 🧩 Global Components & UX/UI

| Component         | Feature                                           |
|------------------|---------------------------------------------------|
| ✅ Navbar         | Responsive + Role-aware Links                     |
| ✅ Theme          | Light/Dark toggle (next-themes)                   |
| ✅ Hero Section   | Framer Motion Animated                            |
| ✅ Card Layout    | Tailwind + shadcn/ui                              |
| ✅ CTA Buttons    | Modern design                                     |
| ✅ Avatar/Profile | Sign in/out + Role dropdown (พร้อมเพิ่ม menu)     |

---

## 🛠️ Tech Stack

| Layer       | Tool/Library                          | Purpose                              |
|-------------|----------------------------------------|--------------------------------------|
| Frontend    | Next.js 15 App Router                  | File-based routing + SSR             |
| Styling     | TailwindCSS + shadcn/ui                | UI Component + Utility styling       |
| Auth        | next-auth + JWT                        | Google/Auth login & Role control     |
| ORM         | Prisma                                 | Type-safe DB Access                  |
| DB          | PostgreSQL 16                          | Structured relational storage        |
| Icons       | Lucide-react                           | Icon Set                             |
| Animation   | Framer Motion                          | Section transitions                  |
| Themes      | next-themes                            | Dark/Light/System toggle             |
| Middleware  | next-auth/jwt                          | Route-level protection               |

---

## 📂 Project Structure

```
orignx.dev/
├── frontend/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Shared React components
│   ├── lib/             # Helper functions (auth, db)
│   ├── prisma/          # Prisma schema and migrations
│   ├── public/          # Static assets
│   └── middleware.ts    # Authentication middleware
├── backend/
│   ├── app/             # Laravel application code
│   ├── bootstrap/       # Laravel bootstrap scripts
│   ├── config/          # Laravel configuration files
│   ├── database/        # Database migrations and seeds
│   ├── public/          # Laravel public directory
│   ├── routes/          # API routes
│   └── storage/         # File storage
├── nginx/
│   └── nginx.conf       # Nginx configuration
├── deploy.sh
├── docker-compose.prod.yml
└── Dockerfile.prod
```

---

## 🚀 Deployment Guide

### 1. Prerequisites

- Google Cloud VM (Ubuntu 24.04)
- Docker + Docker Compose
- DNS for `orignx.dev`

### 2. Setup

```bash
git clone https://github.com/damrongsak/orignx-dev.git
cd orignx.dev

cp .env.example .env
nano .env

sudo certbot --nginx -d orignx.dev -d www.orignx.dev

docker-compose -f docker-compose.prod.yml up -d --build

docker exec orignx_app npx prisma migrate deploy
```

---

## 🔐 Security Features

- ✅ Role-based route guard via middleware  
- ✅ JWT session token  
- ✅ Rate limiting via Nginx  
- ✅ Security headers (CSP, TLS 1.3)  
- ✅ Automated SSL with Certbot  
- ✅ Auto upgrade & image pull

```bash
sudo apt update && sudo apt upgrade -y
docker-compose pull
```

---

## 📄 .env.example

```env
DATABASE_URL="postgresql://postgres:password@db:5432/orignx"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://orignx.dev"

GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

---

## 🔧 prisma/schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String    @id @default(cuid())
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  role           Role      @default(USER)
  hashedPassword String?
  accounts       Account[]
  sessions       Session[]
  Post           Post[]
}

enum Role {
  USER
  ADMIN
  EDITOR
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  String?
}

model Project {
  id          String     @id @default(uuid())
  title       String
  description String     @db.Text
  imageUrl    String?    @map("image_url")
  githubUrl   String?    @map("github_url")
  liveUrl     String?    @map("live_url")
  tags        String[]
  createdAt   DateTime   @default(now()) @map("created_at")
  
  @@map("projects")
}
```

---

## 🔧 Using Prisma

All Prisma commands should be run from the `frontend` directory.

### Generate Prisma Client

To regenerate the Prisma Client after schema changes:

```bash
cd frontend
npx prisma generate
```

### Database Migrations

To create a new migration after changing the schema:

```bash
cd frontend
npx prisma migrate dev --name <migration_name>
```

To apply migrations to the database:

```bash
cd frontend
npx prisma migrate deploy
```

### Seed the Database

To seed the database with initial data (from `prisma/seed.js`):

```bash
cd frontend
npx prisma db seed
```

### Prisma Studio

To open the Prisma Studio to view and edit data in the database:

```bash
cd frontend
npx prisma studio
```

---

## 📈 Monitoring

`docker-compose.monitoring.yml`

```yaml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    depends_on:
      - prometheus
```

---

## 📝 Checklist

- ✅ Domain + SSL setup via Certbot
- ✅ Middleware auth + role guard
- ✅ Login with Google/Credentials
- ✅ Blog & Dashboard with RBAC
- ✅ Responsive design with Dark/Light theme
- ✅ CI/CD deploy script
- ✅ Monitoring with Prometheus + Grafana

---

## 📜 License

MIT License - See LICENSE for details.
