FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install UV package manager
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Set working directory
WORKDIR /app

# Copy README.md first (needed for package build)
COPY README.md .

# Copy dependency files
COPY pyproject.toml .

# Copy application code
COPY backend/src ./src

# Install Python dependencies
RUN uv pip install --system .

# Start server using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--chdir", "src", "addismap.wsgi:application"]
