# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy app code
COPY . .

# Start React app
CMD ["npm", "start"]