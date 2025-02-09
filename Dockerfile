FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file from the host to the container
COPY backend/requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the files
COPY backend/ /app


# Expose the port that Flask runs on
EXPOSE 5000

# Command to run the Flask app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]