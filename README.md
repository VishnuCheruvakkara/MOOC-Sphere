# MOOCSphere

## App Introduction

MOOCSphere is a MOOC-style course catalog application with a Django backend and a React frontend. Students can sign up, log in, view courses, enroll in courses, view lessons, and track lesson progress.

## Features

- Sign up and log in with JWT-based authentication
- Course list page showing all available courses
- Course detail page with course description and lesson list
- Enroll in courses for logged-in users
- My Courses view for enrolled course tracking
- Lesson progress tracking (visited lessons)
- Protected user routes for authenticated users
- Admin panel for course and lesson management

## Tools Used

### Frontend tools
- React 19 — used with Vite for fast SPA development and quick iteration
- Vite 8 — provides a fast development server and optimized production build
- React Router DOM 7 — handles routing, protected routes, and page navigation
- Redux Toolkit — manages app state like auth, user data, and course state
- Tailwind CSS 4 — enables quick, utility-first styling without a large UI framework
- Axios — performs API requests to the backend
- react-hook-form — simplifies form state management for login and enrollment
- zod — provides validation schemas for form inputs and API payloads
- react-hot-toast — shows user-friendly toast notifications
- react-icons — provides scalable icons used across the UI for buttons and menus

### Backend tools
- Python 3.x — runtime for the Django backend
- Django 6.0.5 — framework for authentication, APIs, and admin management
- Django REST Framework — builds and exposes REST API endpoints
- PostgreSQL — production-ready database for course and user data
- djangorestframework-simplejwt — handles JWT authentication and refresh tokens
- django-cors-headers — enables secure cross-origin requests from the frontend
- django-environ — loads environment variables from `.env` files safely
- Jazzmin — improves the Django admin UI for course and lesson management
- gunicorn — production WSGI server for deploying the Django app

## Setup .env Files

### Backend .env setup
1. Go to the backend folder:

```bash
cd backend
```

2. Copy the example file:

```bash
copy .env.example .env
```

3. Add your project values to `backend/.env`:

```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:5173
DB_NAME=mooc_sphere_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=5432
```

### Frontend .env setup
1. Go to the frontend folder:

```bash
cd frontend
```

2. Create a new `.env` file and add the API base URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

3. Save the file.

## Docker Setup for Backend

This project includes Docker support for backend deployment.

To run the backend with Docker Compose:

```bash
cd backend
docker-compose up -d
```

This command starts Django and PostgreSQL in containers.

Once the backend is running, check the API in your browser at:

```text
http://localhost:8000
```
or

```text
http://127.0.0.1:8000
```

## Frontend Installation

1. Open a terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal.

Common local frontend URLs are:

```text
http://localhost:5173
```
or

```text
http://127.0.0.1:5173
```

### Build frontend for production

```bash
npm run build
```
