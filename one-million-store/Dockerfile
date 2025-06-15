# Medusa backend Dockerfile for development
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies first to optimize cache
COPY package*.json ./

RUN npm install

# Copy all source code
COPY . .

# Expose Medusa default port
EXPOSE 9000

CMD ["npm", "run", "dev"]