FROM node:18-slim AS build-stage

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/services/gallery

RUN npm run build:prod

FROM nginx:1.25.3-alpine

WORKDIR /app

COPY --from=build-stage /app/services/gallery/build ./
COPY --from=build-stage /app/services/gallery/nginx.conf /etc/nginx/conf.d/default.conf

ENV NGINX_PORT=3002

EXPOSE 3002


