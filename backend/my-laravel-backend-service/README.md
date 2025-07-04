# Laravel Docker Content Management Project For orignx.dev

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
  - [Directory Structure](#directory-structure)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Usage](#usage)
- [Production Environment](#production-environment-1)
  - [Building and Running the Production Environment](#building-and-running-the-production-environment)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
  - [How to Contribute](#how-to-contribute)
- [License](#license)


## Overview

The **Laravel Docker Examples Project** offers practical and modular examples for Laravel developers to create efficient Docker environments for development and production. This project demonstrates modern Docker best practices, including multi-stage builds, modular configurations, and environment-specific customization. It is designed to be educational, flexible, and extendable, providing a solid foundation for Dockerizing Laravel applications.

## Tech Stack

**Backend:**

*   **Framework:** Laravel 12
*   **Language:** PHP 8.2
*   **Authentication:** JWT (JSON Web Tokens)
*   **Package Manager:** Composer
*   **Testing:**
    *   Pest
    *   Mockery
    *   Faker
*   **Development Tools:**
    *   Tinker
    *   Pail
    *   Pint
    *   Sail

**Frontend:**

*   **Build Tool:** Vite
*   **CSS Framework:** Tailwind CSS
*   **JavaScript Library:** Axios (for HTTP requests)
*   **Package Manager:** npm

**Development Environment:**

*   **Containerization:** Docker (using `docker-compose`)
*   **Web Server:** Nginx (likely, based on common Laravel Docker setups)
*   **Database:** SQLite (default, as seen in the `composer.json` setup script)

## Project Setup

This project is configured with a blog management system that includes user roles, JWT authentication, and a post management API. Here’s a summary of the key implementation details:

*   **UUIDs as Primary Keys:** All models use UUIDs instead of auto-incrementing integers for their primary keys. The `App\Models\Concerns\HasUuids` trait handles this automatically.
*   **JWT Authentication:** The application uses `tymon/jwt-auth` for API authentication. The configuration can be found in `config/jwt.php`, and the authentication guard is set to `api` in `config/auth.php`.
*   **User Roles:** The `users` table has a `role` column to distinguish between `admin` and `editor` users. Authorization is handled via the `PostPolicy` and gates defined in `app/Providers/AuthServiceProvider.php`.
*   **Blog Post API:** A full CRUD API for managing blog posts is available at `/api/v1/posts`. It supports Markdown content and is protected by JWT authentication and rate limiting.
*   **API Routes:** All API routes are defined in `routes/api.php` and are prefixed with `/api/v1`. This includes routes for authentication, posts, and webhooks.
*   **Database Seeding:** The database is seeded with an admin user (`admin@example.com`), several editor users, and sample blog posts.

## Project Structure

The project is organized as a typical Laravel application, with the addition of a `docker` directory containing the Docker configurations and scripts. These are separated by environments and services. There are two main Docker Compose projects in the root directory:

- **docker-compose.dev.yaml**: Orchestrates the development environment.
- **compose.prod.yaml**: Orchestrates the production environment.

### Directory Structure

```
project-root/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/V1/
│   │           ├── AuthController.php  # Handles JWT authentication
│   │           └── PostController.php    # Handles blog post CRUD operations
│   ├── Models/
│   │   ├── Concerns/
│   │   │   └── HasUuids.php        # Trait for using UUIDs as primary keys
│   │   ├── Post.php                # Eloquent model for posts
│   │   └── User.php                # Eloquent model for users
│   ├── Policies/
│   │   └── PostPolicy.php          # Authorization policy for posts
│   └── Providers/
│       ├── AppServiceProvider.php  # General application service provider
│       └── AuthServiceProvider.php # Registers authentication and authorization services
├── bootstrap/
│   ├── app.php                 # Initializes the Laravel application instance
│   └── providers.php           # Registers service providers
├── config/
│   ├── app.php                 # Core application configuration
│   ├── auth.php                # Authentication settings
│   ├── database.php            # Database connection settings
│   └── jwt.php                 # JWT authentication settings
├── database/
│   ├── factories/              # Model factories for testing and seeding
│   │   ├── PostFactory.php     # Factory for creating Post models
│   │   └── UserFactory.php     # Factory for creating User models
│   ├── migrations/             # Database schema migrations
│   └── seeders/                # Database seeders
│       └── DatabaseSeeder.php  # Main seeder to populate the database
├── resources/
│   ├── css/                    # Compiled CSS assets
│   ├── js/                     # JavaScript source files
│   └── views/                  # Blade templates
├── routes/
│   ├── api.php                 # API routes
│   ├── console.php             # Artisan console commands
│   └── web.php                 # Web routes
├── storage/
│   ├── app/                    # Application-specific files
│   ├── framework/              # Framework-generated files
│   └── logs/                   # Application logs
├── tests/
│   ├── Feature/                # Feature tests
│   └── Unit/                   # Unit tests
├── docker/
│   ├── common/ # Shared configurations
│   ├── development/ # Development-specific configurations
│   ├── production/ # Production-specific configurations
├── docker-compose.dev.yaml # Docker Compose for development
├── docker-compose.prod.yaml # Docker Compose for production
└── .env.example # Example environment configuration
```

This modular structure ensures shared logic between environments while allowing environment-specific customizations.


### Production Environment

The production environment is configured using the `compose.prod.yaml` file. It is optimized for performance and security, using multi-stage builds and runtime-only dependencies. It uses a shared PHP-FPM multi-stage build with the target `production`.

- **Optimized Images**: Multi-stage builds ensure minimal image size and enhanced security.
- **Pre-Built Assets**: Assets are compiled during the build process, ensuring the container is ready to serve content immediately upon deployment.
- **Health Checks**: Built-in health checks monitor service statuses and ensure smooth operation.
- **Security Best Practices**: Minimizes the attack surface by excluding unnecessary packages and users.
- **Docker Compose for Production**: Tailored for deploying Laravel applications with Nginx, PHP-FPM, Redis, and PostgreSQL.

This environment is designed for easy deployment to any Docker-compatible hosting platform.


### Development Environment

The development environment is configured using the `docker-compose.dev.yaml` file and is built on top of the production version. This ensures the development environment is as close to production as possible while still supporting tools like Xdebug and writable permissions.

Key features include:
- **Close Parity with Production**: Mirrors the production environment to minimize deployment issues.
- **Development Tools**: Includes Xdebug for debugging and writable permissions for mounted volumes.
- **Hot Reloading**: Volume mounts enable real-time updates to the codebase without rebuilding containers.
- **Services**: PHP-FPM, Nginx, Redis, PostgreSQL, and Node.js (via NVM).
- **Custom Dockerfiles**: Extends shared configurations to include development-specific tools.

To set up the development environment, follow the steps in the **Getting Started** section.


## Getting Started

Follow these steps to set up and run the project:

### Prerequisites
Ensure you have Docker and Docker Compose installed. You can verify by running:

```bash
docker --version
docker compose version
```

If these commands do not return the versions, install Docker and Docker Compose using the official documentation: [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### Setting Up the Development Environment

1.  **Copy the .env.example file to .env:**

    ```bash
    cp .env.example .env
    ```

    Hint: adjust the `UID` and `GID` variables in the `.env` file to match your user ID and group ID. You can find these by running `id -u` and `id -g` in the terminal.

2.  **Start the Docker Compose Services:**

    ```bash
    docker compose -f docker-compose.dev.yaml up -d --build
    ```

3.  **Install Dependencies:**

    ```bash
    docker compose -f docker-compose.dev.yaml exec workspace composer install
    docker compose -f docker-compose.dev.yaml exec workspace npm install
    ```

4.  **Generate Application Key and JWT Secret:**

    ```bash
    docker compose -f docker-compose.dev.yaml exec workspace php artisan key:generate
    docker compose -f docker-compose.dev.yaml exec workspace php artisan jwt:secret
    ```

5.  **Run Migrations and Seed the Database:**

    ```bash
    docker compose -f docker-compose.dev.yaml exec workspace php artisan migrate:fresh --seed
    ```

6.  **Access the Application:**

    The application will be running at [http://localhost](http://localhost). You can use the seeded users to test the API:
    *   **Admin:** `admin@example.com`
    *   **Password for all users:** `password`

## Usage

Here are some common commands and tips for using the development environment:

### Accessing the Workspace Container

The workspace sidecar container includes Composer, Node.js, NPM, and other tools necessary for Laravel development (e.g. assets building).

```bash
docker compose -f docker-compose.dev.yaml exec workspace bash
```

### Run Artisan Commands:

```bash
docker compose -f docker-compose.dev.yaml exec workspace php artisan migrate
```

### Rebuild Containers:

```bash
docker compose -f docker-compose.dev.yaml up -d --build
```

### Stop Containers:

```bash
docker compose -f docker-compose.dev.yaml down
```

### View Logs:

```bash
docker compose -f docker-compose.dev.yaml logs -f
```

For specific services, you can use:

```bash
docker compose -f docker-compose.dev.yaml logs -f web
```

## API Usage

This section provides detailed instructions on how to use the backend API.

### 1. Authentication (for Human Users)

To manage API keys and blog posts, you first need to authenticate with your email and password to get a JWT token.

- **Endpoint**: `POST /api/v1/auth/login`
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

You'll need to include this `access_token` in the `Authorization` header of subsequent requests as a Bearer token.

### 2. Blog Post Management

The API provides endpoints for managing blog posts. Reading posts is public, but writing or deleting requires authentication.

#### Public Routes (No Authentication Required)
- **Get all blog posts**: `GET /api/v1/posts`
- **Get a single blog post**: `GET /api/v1/posts/{post_id}`

#### Protected Routes (Requires JWT Authentication)
- **Create a new blog post**: `POST /api/v1/posts`
- **Update a blog post**: `PUT /api/v1/posts/{post_id}`
- **Delete a blog post**: `DELETE /api/v1/posts/{post_id}`

### 3. API Key Management (for Human Users)

You can create and manage API keys to allow third-party applications to authenticate with the API.

- **Get all API keys**: `GET /api/v1/api-keys`
- **Create a new API key**: `POST /api/v1/api-keys`
    - **Request Body**:
        ```json
        {
            "name": "My New App"
        }
        ```
    - **Response**:
        ```json
        {
            "token": "your_new_api_key"
        }
        ```
- **Delete an API key**: `DELETE /api/v1/api-keys/{token_id}`

### 4. Webhook (for Third-Party Apps)

Third-party applications can create blog posts by sending a `POST` request to the webhook endpoint, authenticated with a Sanctum API key.

- **Endpoint**: `POST /api/v1/webhook/posts`
- **Headers**:
    - `Authorization`: `Bearer your_new_api_key`
- **Request Body**:
    ```json
    {
        "title": "Post from Webhook",
        "content": "This post was created by a webhook."
    }
    ```

---

## Development Guidelines

To work effectively with this Laravel project, which is integrated with Docker, here are some suggestions:

1.  **Use Artisan Commands:** Most Laravel operations (migrations, seeding, creating controllers/models, etc.) are done via `php artisan`. Always run these commands inside the `workspace` Docker container:
    ```bash
    docker compose -f docker-compose.dev.yaml exec workspace php artisan <command>
    ```
2.  **Understand MVC:** Laravel follows the Model-View-Controller pattern.
    *   **Models** (`app/Models/`): Interact with your database (using Eloquent ORM).
    *   **Views** (`resources/views/`): Handle the presentation layer (using Blade templating).
    *   **Controllers** (`app/Http/Controllers/`): Process requests and interact with models and views.
3.  **Routing:** Define your application's routes in `routes/web.php` (for web) and `routes/api.php` (for APIs).
4.  **Database Migrations:** Manage your database schema changes using migrations (`database/migrations/`). Run them with `php artisan migrate`.
5.  **Frontend Assets:** For frontend development, `npm install` and `npm run dev` (or `npm run build` for production) are used, as Node.js is included in the development environment.
6.  **Debugging:** Leverage Xdebug, which is configured in the development environment, for easier debugging.
7.  **Refer to Laravel Documentation:** For in-depth understanding and specific features, the official [Laravel documentation](https://laravel.com/docs) is the best resource.

## Production Environment

The production environment is designed with security and efficiency in mind:

- **Optimized Docker Images**: Uses multi-stage builds to minimize the final image size, reducing the attack surface.
- **Environment Variables Management**: Sensitive data such as passwords and API keys are managed carefully to prevent exposure.
- **User Permissions**: Containers run under non-root users where possible to follow the principle of least privilege.
- **Health Checks**: Implemented to monitor the status of services and ensure they are functioning correctly.
- **HTTPS Setup**: While not included in this example, it's recommended to configure SSL certificates and use HTTPS in a production environment.


### Deploying

The production image can be deployed to any Docker-compatible hosting environment, such as AWS ECS, Kubernetes, or a traditional VPS.

## Technical Details

- **PHP**: Version **8.4 FPM** is used for optimal performance in both development and production environments.
- **Node.js**: Version **22.x** is used in the development environment for building frontend assets with Vite.
- **PostgreSQL**: Version **16** is used as the database in the examples, but you can adjust the configuration to use MySQL if preferred.
- **Redis**: Used for caching and session management, integrated into both development and production environments.
- **Nginx**: Used as the web server to serve the Laravel application and handle HTTP requests.
- **Docker Compose**: Orchestrates the services, simplifying the process of starting and stopping the environment.
- **Health Checks**: Implemented in the Docker Compose configurations and Laravel application to ensure all services are operational.


## Contributing

Contributions are welcome! Whether you find a bug, have an idea for improvement, or want to add a new feature, your input is valuable.

### How to Contribute

1. **Fork the Repository:**

   Click the "Fork" button at the top right of this page to create your own copy of the repository.

2. **Clone Your Fork:**

```bash
    git clone https://github.com/your-user-name/laravel-docker-examples.git
    cd laravel-docker-examples
```

3. Create a Branch:

```bash
    git checkout -b your-feature-branch
```

4. Make Your Changes.

    Implement your changes or additions.

5. Commit Your Changes:

```bash
git commit -m "Description of changes"
```

6. Push to Your Fork:

```bash
    git push origin feature-branch
```

7. Submit a Pull Request:
    - Go to the original repository.
    - Click on "Pull Requests" and then "New Pull Request."
    - Select your fork and branch, and submit your pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
