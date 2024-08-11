FROM node:18-slim

WORKDIR /app

COPY . .

RUN npm install

COPY . .

WORKDIR /services/gallery

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 3002


