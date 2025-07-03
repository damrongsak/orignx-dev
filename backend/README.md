# Web Portfolio: Full Stack Developer Showcase

This project is a modern web portfolio designed to showcase a Full Stack Developer's skills. It features a decoupled architecture with a Next.js frontend, a Laravel PHP backend, and PostgreSQL as the database, all containerized using Docker. It includes functionalities like a blog with CRUD operations, JWT authentication, and a webhook for automated content posting.

---

## 🌟 Features

### About Me Section
- Dynamic display of developer profile, key skills, and professional experience.

### Projects Section
- Showcase of past projects with descriptions and technologies.

### Contact Form
- A simple contact interface.

### Blog Module
- **CRUD Operations**: Create, Read, Update, Delete blog posts.
- **RESTful API**: All blog operations are exposed via a clean RESTful API.
- **JWT Authentication**: Secure API access for authenticated users (e.g., for creating/editing posts).
- **Webhook Integration**: An endpoint compatible with tools like n8n for automated blog post creation.

### Modern Frontend
- Built with Next.js v15 for optimal performance, SEO, and developer experience.

### Robust Backend
- Developed with Laravel (PHP 8.3+) leveraging Eloquent ORM for database interactions.

### Database
- PostgreSQL for reliable data storage.

### Containerization
- Full application stack (Next.js, Nginx, PHP-FPM, PostgreSQL) managed with Docker and Docker Compose.

### Deployment Ready
- Configured for easy deployment on Google Cloud Platform (GCP) Compute Engine.

### Code Quality
- Adheres to clean code principles, includes unit/feature tests, and emphasizes security best practices (JWT, middleware).

### Version Control
- Managed with Git.

---

## 🚀 Architecture

The project follows a decoupled architecture:

- **Frontend (Next.js)**: A server-rendered React application responsible for the user interface and interacting with the backend API.
- **Backend (Laravel)**: A RESTful API that handles business logic, data persistence, authentication, and webhook processing.
- **Nginx**: Acts as a reverse proxy, serving the Next.js application and routing API requests to the Laravel PHP-FPM service.
- **PHP-FPM**: The FastCGI Process Manager that executes Laravel application code.
- **PostgreSQL**: The primary database for storing application data.
- **Docker**: Used to containerize all services, ensuring consistent environments and simplified deployment.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Git**: For cloning the repository.
- **Docker Desktop**: Includes Docker Engine and Docker Compose.
- **Node.js (v22+)**: For frontend development tools (though Docker handles the runtime).
- **Composer**: For managing PHP dependencies (optional, as Docker will handle it, but useful for local Laravel commands).

---

## 🛠️ Getting Started (Local Development)

Follow these steps to get the project up and running on your local machine for development.

### 1. Clone the Repository
```bash
git clone https://github.com/damrongsak/orignx-dev.git
cd orignx-dev
```

### 2. Configure Environment Variables

#### Backend (`backend/.env`)
Navigate into the backend directory and create a `.env` file by copying the example:
```bash
cd backend
cp .env.example .env
```
Now, open `backend/.env` and fill in the following:
- **APP_KEY**: Generate this by running `php artisan key:generate` (inside the Docker container later).
- **JWT_SECRET**: Generate this by running `php artisan jwt:secret` (also inside the Docker container).
- **Database Configuration**:
    ```plaintext
    DB_CONNECTION=pgsql
    DATABASE_URL=postgresql://lab:lab1234@postgres:5432/orignxdb
    ```
    (These values match the `docker-compose.dev.yml` for the postgres service.)
- **WEBHOOK_API_KEY**: Set a strong, secret key for your webhook (e.g., `WEBHOOK_API_KEY=your_secure_webhook_api_key_dev`).

#### Frontend (`frontend/.env.local`)
Navigate into the frontend directory and create a `.env.local` file:
```bash
cd ../frontend
touch .env.local
```
Add the API base URL to `frontend/.env.local`:
```plaintext
NEXT_PUBLIC_API_BASE_URL=http://localhost/api/v1
```
(This tells your Next.js app where to find the API when running locally via Nginx.)

### 3. Build and Run Docker Containers (Development)
From the project root directory:
```bash
cd .. # Go back to the project root if you are in frontend or backend
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up -d
```
- `docker-compose.dev.yml`: This specific file is used for development, enabling hot-reloading for Next.js and live code changes for Laravel.
- `build`: Builds the Docker images for Next.js and PHP-FPM.
- `up -d`: Starts the services in detached mode.

### 4. Install Laravel Dependencies & Run Migrations
Once the containers are running, you need to install Laravel's Composer dependencies and run database migrations:
```bash
docker-compose -f docker-compose.dev.yml exec php-fpm composer install
docker-compose -f docker-compose.dev.yml exec php-fpm php artisan key:generate
docker-compose -f docker-compose.dev.yml exec php-fpm php artisan jwt:secret
docker-compose -f docker-compose.dev.yml exec php-fpm php artisan migrate
docker-compose -f docker-compose.dev.yml exec php-fpm php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```
The `php artisan migrate` command will create the necessary tables in your `orignxdb` database, including a default admin user (`admin@example.com` with password `password`). **Remember to change this default password immediately in any production environment!**

### 5. Access the Application
Your portfolio should now be accessible at:
- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost/api/v1](http://localhost/api/v1)

You can log in to the blog section using the default admin credentials.

---

## 📂 Project Structure

```plaintext
├── frontend/                     # Next.js application
│   ├── public/                   # Static assets
│   ├── app/                      # App Router directory (main pages, blog, login)
│   ├── components/               # Reusable UI components
│   ├── lib/                      # Utility functions, API calls (e.g., api.js)
│   ├── package.json              # Frontend dependencies
│   ├── next.config.js            # Next.js configuration
│   └── tailwind.config.js        # Tailwind CSS configuration
│
├── backend/                      # Laravel application
│   ├── app/                      # Laravel core (Models, Controllers, Middleware)
│   ├── config/                   # Laravel configuration files
│   ├── database/                 # Migrations, seeders
│   ├── public/                   # Publicly accessible files (Laravel's entry point)
│   ├── routes/                   # API routes (api.php)
│   ├── tests/                    # Unit and feature tests
│   ├── .env.example              # Example environment variables
│   └── composer.json             # Backend dependencies
│
├── docker-compose.yml            # Docker Compose for Production deployment
├── docker-compose.dev.yml        # Docker Compose for Local Development (NEW)
├── Dockerfile.php                # Dockerfile for PHP-FPM service
├── Dockerfile.nextjs             # Dockerfile for Next.js service
├── nginx/                        # Nginx configuration files
│   ├── default.conf              # Nginx config for Production
│   └── default.dev.conf          # Nginx config for Local Development (NEW)
└── README.md                     # This file
```

---

## 💻 Frontend (Next.js)

The frontend is built with Next.js v15, utilizing the App Router for routing and server components for efficient data fetching and rendering.

### Technology Stack
- React, Next.js v15 (App Router), Tailwind CSS, JavaScript (ES6+), js-cookie for JWT handling.

### Key Directories
- `frontend/app/`: Contains all application routes and layouts.
- `frontend/components/`: Reusable UI components.
- `frontend/lib/api.js`: Centralized utility for making API calls to the backend.

### Running Tests
Frontend tests (if implemented) would typically use Jest/React Testing Library:
```bash
# From frontend directory
npm test
```

---

## ⚙️ Backend (Laravel)

The backend provides a RESTful API for the frontend and handles data persistence and business logic.

### Technology Stack
- PHP 8.3+, Laravel 10+, PostgreSQL, Eloquent ORM, JWT-Auth.

### Key Directories
- `backend/app/Models/`: Eloquent models (User, Post).
- `backend/app/Http/Controllers/`: API logic (AuthController, PostController, WebhookController).
- `backend/routes/api.php`: Defines all API endpoints.
- `backend/database/migrations/`: Database schema definitions.

### API Endpoints
- `POST /api/v1/login`: User login, returns JWT.
- `GET /api/v1/user`: Get authenticated user details (requires JWT).
- `GET /api/v1/posts`: Get all blog posts (public).
- `GET /api/v1/posts/{slug}`: Get a single blog post by slug (public).
- `POST /api/v1/posts`: Create a new blog post (requires JWT).
- `PUT /api/v1/posts/{slug}`: Update a blog post (requires JWT, only owner).
- `DELETE /api/v1/posts/{slug}`: Delete a blog post (requires JWT, only owner).
- `POST /api/v1/webhook/posts`: Webhook for automated post creation (requires `X-Webhook-Api-Key` header).

### Running Tests
Laravel uses PHPUnit for testing:
```bash
# From project root, inside the php-fpm container
docker-compose -f docker-compose.dev.yml exec php-fpm php artisan test
```

---

## 📖 API Usage

This section provides detailed instructions on how to use the backend API.

### 1. Authentication

To access protected endpoints, you first need to authenticate and get a JWT token.

- **Endpoint**: `POST /api/v1/login`
- **Request Body**:
    ```json
    {
        "email": "admin@example.com",
        "password": "password"
    }
    ```
- **Response**:
    ```json
    {
        "access_token": "your_jwt_token",
        "token_type": "bearer",
        "expires_in": 3600
    }
    ```

You'll need to include the `access_token` in the `Authorization` header of subsequent requests as a Bearer token:

```
Authorization: Bearer your_jwt_token
```

### 2. Blog Posts

You can perform CRUD operations on blog posts.

- **Get all blog posts**: `GET /api/v1/posts` (public)
- **Get a single blog post**: `GET /api/v1/posts/{slug}` (public)
- **Create a new blog post**: `POST /api/v1/posts` (requires authentication)
    - **Request Body**:
        ```json
        {
            "title": "My New Post",
            "content": "This is the content of my new post."
        }
        ```
- **Update a blog post**: `PUT /api/v1/posts/{slug}` (requires authentication, only owner)
    - **Request Body**:
        ```json
        {
            "title": "Updated Post Title",
            "content": "Updated content."
        }
        ```
- **Delete a blog post**: `DELETE /api/v1/posts/{slug}` (requires authentication, only owner)

### 3. Webhook

You can create blog posts by sending a `POST` request to the webhook endpoint.

- **Endpoint**: `POST /api/v1/webhook/posts`
- **Headers**:
    - `X-Webhook-Api-Key`: `your_secure_webhook_api_key`
- **Request Body**:
    ```json
    {
        "title": "Post from Webhook",
        "content": "This post was created by a webhook."
    }
    ```

---

## ☁️ Deployment (GCP Compute Engine)

The project is configured for deployment on GCP Compute Engine using the `docker-compose.yml` file (for production).

### GCP VM Setup
1. **Provision an Ubuntu VM instance** on GCP.
2. **Install Docker**: Install Docker and Docker Compose on the VM.
3. **Clone Repo**: Clone this repository onto your VM.

### Production `.env`
Copy `backend/.env.example` to `backend/.env` and configure it for production (strong passwords, correct `APP_URL`, `APP_KEY`, `JWT_SECRET`, `WEBHOOK_API_KEY`).

### Run Production Stack
```bash
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
docker-compose -f docker-compose.yml exec php-fpm php artisan migrate --force
```

### DNS Configuration
Point your domain (`www.orignx.dev`) to the external IP address of your GCP VM.

### HTTPS
Implement SSL/TLS (e.g., using Certbot with Let's Encrypt) for secure communication.

---

## 🤝 Contribution Guidelines

We welcome contributions to this project!

### Steps to Contribute
1. **Fork the Repository**: Start by forking the project to your GitHub account.
2. **Create a Feature Branch**: For each new feature or bug fix, create a new branch from `main` (or `develop` if applicable).
     ```bash
     git checkout main
     git pull origin main
     git checkout -b feature/your-feature-name
     ```
3. **Code and Test**:
     - Write clean, well-commented code following established coding standards.
     - Ensure all new features have corresponding unit and/or feature tests.
     - Run existing tests to ensure no regressions.
4. **Commit Changes**: Write clear and concise commit messages.
     ```bash
     git add .
     git commit -m "feat: Add new blog post creation"
     ```
5. **Push to Your Fork**:
     ```bash
     git push origin feature/your-feature-name
     ```
6. **Create a Pull Request (PR)**:
     - Open a pull request from your feature branch to the `main` branch of the original repository.
     - Provide a clear description of your changes.
     - Reference any related issues.
     - Ensure all automated checks (if any) pass.
7. **Code Review**: Your code will be reviewed by team members. Be open to feedback and make necessary adjustments.

---

## 📄 License

This project is open-sourced under the MIT License.

---

## 📧 Contact

For any questions or inquiries, please contact **Damrongsak Samanras** at **damrongsak.sam@gmail.com**.