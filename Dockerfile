# syntax=docker/dockerfile:1

# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:1.27-alpine

# Copy built static files to Nginx html dir
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Use custom nginx.conf to serve library files (no index.html) and enable directory listing
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
