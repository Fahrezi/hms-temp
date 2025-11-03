# Use Node.js as the base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Declare build-time args for every Vite var you need
ARG VITE_SECRET_KEY
ARG VITE_ENABLE_SMALL_CONTAINER
ARG VITE_API_URL

# Make them available to Vite
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY
ENV VITE_ENABLE_SMALL_CONTAINER=$VITE_ENABLE_SMALL_CONTAINER
ENV VITE_API_URL=$VITE_API_URL

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Second stage: production environment
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]