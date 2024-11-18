FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY frontend/package.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && \
    npm install --legacy-peer-deps

# Copy source code
COPY frontend/src ./src
COPY frontend/public ./public

# Build the app with CI=false to prevent treating warnings as errors
RUN CI=false npm run build

# Install serve to run the built app
RUN npm install -g serve

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
