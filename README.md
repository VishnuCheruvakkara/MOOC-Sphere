# MOOCSphere

## About

MOOCSphere ( Massive Open Online Course Sphere ) is a MOOC-style course catalog application with a Django backend and a React frontend. Students can sign up, log in, view courses, enroll in courses, view lessons, and track lesson progress.

<p align="center">
  <img src="./assets/home.png" alt="Home page of MOOCSphere" width="100%" style="border-radius: 16px;" />
</p>

<p align="center">
  <a href="https://moocsphere.agriflow.space" target="_blank">
    <img alt="View Live Project" src="https://img.shields.io/badge/%20Live%20Demo-c45ae6?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
 
</p>

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

3. Open `backend/.env` and configure the values according to your project setup.

### Frontend .env setup
1. Go to the frontend folder:

```bash
cd frontend
```

2. Copy the example file:

```bash
copy .env.example .env
```

3. Open `frontend/.env` and add your configuration values.

4. Save the file.

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

---
MOOCSphere — A Massive Open Online Course Sphere
© 2026 MOOCSphere. All rights reserved.