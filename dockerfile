FROM node:8.9.4-alpine
RUN mkdir -p /code
WORKDIR /code
COPY . /code
RUN npm install && npm install -g pm2 && npm run build && pm2 start ./server/app.js