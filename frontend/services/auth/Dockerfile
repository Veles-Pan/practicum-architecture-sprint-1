FROM node:18-slim AS build-stage

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/services/auth

RUN npm run build:prod

FROM nginx:1.25.3-alpine

WORKDIR /app

COPY --from=build-stage /app/services/auth/build ./
COPY --from=build-stage /app/services/auth/nginx.conf /etc/nginx/conf.d/default.conf

ENV NGINX_PORT=3004

EXPOSE 3004


