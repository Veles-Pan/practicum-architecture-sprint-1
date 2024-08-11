FROM node:18-slim

WORKDIR /app

COPY . .

RUN npm install

COPY . .

WORKDIR /services/profile

COPY . .

CMD [ "yarn", "start" ]

EXPOSE 3003


