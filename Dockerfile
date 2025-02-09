FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file from the host to the container
COPY backend/requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the files
COPY backend/ /app
