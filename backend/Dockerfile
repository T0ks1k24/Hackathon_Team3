# Base image
FROM python:3.13.3-slim

# Work directory inside container
WORKDIR /app

# Copy and install requirements
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy app code
COPY . .

# Run Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]