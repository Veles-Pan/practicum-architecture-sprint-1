FROM node:18-slim as build-stage

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM nginx:1.25.3-alpine

WORKDIR /app

COPY --from=build-stage /app/build ./
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

ENV NGINX_PORT=3000

EXPOSE 3000
