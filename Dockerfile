# 1️⃣ Build aşaması
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2️⃣ Servis aşaması (nginx üzerinden yayına alma)
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx default config yerine kendi config’imizi kopyalayabiliriz (isteğe bağlı)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]