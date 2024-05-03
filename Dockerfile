# Use an official Python runtime as a parent image
FROM python:1-3.11-bullseye

# Set the working directory in the container
WORKDIR /app

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Confirm installations
RUN python --version
RUN node --version
RUN npm --version

RUN apt-get install -y curl

# Copy the rest of your application's code
COPY . .

RUN pip install -r backend/requirements.txt
RUN cd frontend && npm install
RUN cd frontend && npm run build

EXPOSE 5000

RUN chmod +x /app/scripts/install.sh

WORKDIR /app/backend

# CMD ["gunicorn","-b","0.0.0.0:5000","app:app"]