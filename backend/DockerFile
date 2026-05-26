FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies first for better layer caching
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy application source
COPY . /app/

EXPOSE 8000

CMD ["gunicorn", "mooc_sphere.wsgi:application", "--bind", "0.0.0.0:8000"]