# Use the official Node.js 22 Alpine image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js runs on
EXPOSE 3000

# Set environment variable for Next.js
ENV NODE_ENV=development

# Start the development server
CMD ["npm", "run", "dev"]
