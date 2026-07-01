# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project
COPY . .

# Expose Vite port
EXPOSE 5173

# Start Vite
CMD ["npm", "run", "dev", "--", "--host"]