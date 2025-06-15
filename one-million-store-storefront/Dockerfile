# Next.js frontend Dockerfile for development
FROM node:20

WORKDIR /app

# Install dependencies first
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Expose Next.js default port
EXPOSE 8000

# Run Next.js dev server
CMD ["npm", "run", "dev"]