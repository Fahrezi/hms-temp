# Docker Guidelines

## Overview

This project includes a production-ready Docker configuration for containerization. It uses a multi-stage build process to create an optimized production image.

## Quick Start

### Build the Image

```bash
# Build from project root
docker build -t react-app .
```

### Run the Container

```bash
# Run on port 8080
docker run -p 8080:80 react-app
```

Visit `http://localhost:8080` to view your containerized application.

## Configuration Details

### Multi-Stage Build Process

The Dockerfile uses a two-stage build process for optimal production deployment:

1. **Build Stage**

   - Uses Node.js 20 Alpine as base image
   - Installs dependencies using `npm ci`
   - Builds production assets
   - Optimizes for production

2. **Production Stage**
   - Uses Nginx Alpine as base image
   - Serves static files efficiently
   - Handles React Router paths
   - Optimized for performance

### Environment Variables

Environment variables are handled during the build process:

```bash
# Development
cp .env.example .env

# Production
docker run -p 8080:80 -e VITE_API_URL=http://api.prod my-react-app
```

### Nginx Configuration

The included `nginx.conf` provides:

- React Router support via URL rewriting
- Static file caching optimization
- Gzip compression
- Security headers

## Project Structure

```
├── Dockerfile          # Multi-stage build configuration
├── nginx.conf          # Nginx server configuration
└── .env                # Environment variables
```

## Best Practices

1. **Image Building**

   - Always use multi-stage builds
   - Keep base images updated
   - Use `.dockerignore` to exclude unnecessary files
   - Tag images appropriately

2. **Environment Variables**

   - Never commit sensitive values
   - Use `.env.example` for documentation
   - Override values at runtime when needed

3. **Security**
   - Use specific image versions
   - Implement security headers
   - Scan images for vulnerabilities
   - Keep dependencies updated

## Common Commands

```bash
# Build with no cache (force rebuild)
docker build --no-cache -t react-app .

# Run with different port
docker run -p 3000:80 react-app

# Check container logs
docker logs react-app

# Stop container
docker stop react-app

# Remove container
docker rm react-app

# List running containers
docker ps

# List all containers
docker ps -a
```

## Troubleshooting

### Common Issues

1. **Build Fails**

   - Check Node.js version compatibility
   - Verify all required files are present
   - Clear Docker build cache

2. **Runtime Errors**

   - Check environment variables
   - Verify Nginx configuration
   - Review container logs

3. **Performance Issues**
   - Monitor container resources
   - Check Nginx caching settings
   - Optimize build output

## Development Workflow

For detailed project guidelines, return to:

- [Development Guidelines](./DEVELOPMENT-GUIDELINES.md)
