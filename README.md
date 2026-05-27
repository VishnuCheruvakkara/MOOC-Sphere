# MOOCSphere

MOOCSphere is a full-stack online course platform built with a Django REST backend and a Vite + React frontend. The repository contains separate `backend` and `frontend` apps, with the root README documenting both sides.

## Features

- User authentication and registration
- JWT-based authentication with refresh tokens
- Course listing and course detail views
- Enrollment and lesson progress tracking
- Protected user routes for authenticated experience
- Responsive frontend built with React, React Router, and Tailwind CSS
- Django admin dashboard with Jazzmin theme

## Tech Stack

### Backend
- Python 3.x
- Django 6.0.5
- Django REST Framework
- psycopg2 / PostgreSQL
- djangorestframework-simplejwt
- django-cors-headers
- django-environ
- Jazzmin UI

### Frontend
- React 19
- Vite 8
- React Router DOM 7
- Redux Toolkit
- Tailwind CSS 4
- Axios
- react-hook-form
- zod
- react-hot-toast

## Repository Structure

- `backend/` - Django backend application
  - `apps/accounts/` - authentication and user management
  - `apps/courses/` - course and lesson APIs
  - `docker-compose.yml` - local Docker configuration
  - `Dockerfile` - backend container image definition
  - `.env.example` - backend environment variable template
- `frontend/` - React SPA frontend
  - `src/` - application source code
  - `package.json` - frontend dependencies and scripts
  - `vercel.json` - Vercel SPA rewrite config

## Backend Setup

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv env
# Windows PowerShell
env\Scripts\Activate.ps1
# Windows CMD
env\Scripts\activate.bat
```

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Copy the example environment file and update values:

```bash
copy .env.example .env
```

Then set values for:
- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

5. Run database migrations:

```bash
python manage.py migrate
```

6. Start the backend server:

```bash
python manage.py runserver
```

7. The API will be available at:

```text
http://127.0.0.1:8000/api/v1/
```

### Backend Docker Option

To run the backend with PostgreSQL using Docker Compose:

```bash
cd backend
docker-compose up -d
```

## Frontend Setup

1. Open a terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Create or update `.env` for API base URL.

Example `.env` contents:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser at the local URL shown by Vite.

### Build for Production

```bash
npm run build
```

## Deployment Notes

- Frontend can be deployed on Vercel. The `frontend/vercel.json` file is included to rewrite SPA routes to `index.html`.
- Backend can be deployed as a Django app with PostgreSQL. Use the `.env` variables and a production-safe `SECRET_KEY`.

## Notes

- The backend uses cookie-based JWT authentication for secure token handling.
- The frontend is configured as a single-page application using React Router.
- If using Vercel for frontend hosting, ensure the project root is set to `frontend` or move the `vercel.json` config to the deployment root.

## Helpful Commands

### Backend
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
npm run build
```

---

This README is the main project documentation for both backend and frontend. For details inside each app, inspect the files under `backend/` and `frontend/`.
