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

## 🚀 Features

### Core Functionality

- Next.js 15 App Router with RSC
- PostgreSQL with Prisma ORM
- NextAuth.js with JWT sessions
- Role-based access control (RBAC)
- Markdown/MDX blog system
- Responsive dark/light theme
- Auth (Google & Credentials via NextAuth.js)
- Production deploy: Docker, Nginx, Google Cloud

### Infrastructure

- Dockerized deployment (Node.js 22 + PostgreSQL)
- Nginx reverse proxy with TLS 1.3
- Google Cloud Engine (Ubuntu 24.04 LTS)
- Automated SSL with Certbot
- CI/CD with GitHub Actions

## 🛠️ Tech Stack

| Component          | Technology                          |
|--------------------|-------------------------------------|
| Frontend           | Next.js 15, Tailwind CSS, shadcn/ui |
| Backend            | Next.js API Routes                  |
| Database           | PostgreSQL 16                       |
| ORM                | Prisma                              |
| Authentication     | NextAuth.js (Google + Credentials)  |
| Deployment         | Docker, Nginx, Google Cloud         |
| Monitoring         | Prometheus + Grafana                |

## 📂 Project Structure

orignx.dev/
├── app/
│ ├── about/ # About page
│ ├── projects/ # Projects page
│ ├── contact/ # Contact page
│ ├── dashboard/ # Admin panel (RBAC)
│ └── blog/ # MDX blog
├── prisma/
│ └── schema.prisma # DB schema
├── components/ # UI components
├── lib/ # Utils (auth, db, helpers)
├── docker/
│ ├── nginx.conf
│ └── postgres/
├── middleware.ts # Auth + role protection
├── .env.example # Env config
└── deploy.sh # Deployment automation

## 🚀 Deployment Guide

### 1. Prerequisites

- Google Cloud account
- Ubuntu 24.04 VM
- Domain name (orignx.dev) with DNS configured
- Docker and Docker Compose installed

### 2. Production Setup

```bash
# Clone repository
git clone https://github.com/yourusername/orignx.dev.git
cd orignx.dev

# Set environment variables
cp .env.example .env
nano .env  # Fill in your values

# Initialize SSL (run on host)
sudo certbot --nginx -d orignx.dev -d www.orignx.dev

# Start services
docker-compose -f docker-compose.prod.yml up -d --build

# Apply database migrations
docker exec orignx_app npx prisma migrate deploy
```

### 3. CI/CD Automation

Create .github/workflows/deploy.yml:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install SSH key
        uses: webfactory/ssh-agent@v0.7.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Deploy to Server
        run: |
          ssh deploy@orignx.dev "cd /var/www/orignx.dev && git pull && ./deploy.sh"
```

🔒 Security Features
Rate limiting via Nginx

CSP headers

Database connection pooling

Regular security updates with:

```bash
sudo apt update && sudo apt upgrade -y
docker-compose pull
```

📄 Example: .env.example

```env
DATABASE_URL="postgresql://postgres:password@db:5432/orignx"
NEXTAUTH_SECRET="your-long-secret"
NEXTAUTH_URL="https://orignx.dev"

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

🎯 Example: prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  role      Role     @default(USER)
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
model Project {
  id        String   @id @default(cuid())
  title     String
  description String?
  createdAt DateTime @default(now())
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}
```

🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Generate Prisma client
npx prisma generate

# Run tests
npm test
```

## 📖 SSL Certificate Setup with Certbot

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain Certificate (Nginx plugin)
sudo certbot --nginx -d orignx.dev -d www.orignx.dev

# Set up auto-renewal
sudo certbot renew --dry-run
```

## 📈 Monitoring Setup

docker-compose.monitoring.yml

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

## 📝 Implementation Checklist

- **Domain Verification**: Configure domain in Google Cloud DNS.
- **SSL Certificates**: Set up SSL using Certbot.
- **Reverse Proxy**: Use Nginx with TLS 1.3 for secure routing.
- **Dockerized Environment**: Deploy Node.js 22 and Next.js 15 in Docker containers.
- **Database Setup**: Configure PostgreSQL with persistent volumes.
- **CI/CD Automation**: Implement GitHub Actions for automated deployment.
- **Security Enhancements**: Add security headers and rate limiting via Nginx.
- **Monitoring**: Set up Prometheus and Grafana for system monitoring.

## 📜 License

MIT License - See LICENSE for details.
