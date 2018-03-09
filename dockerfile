FROM node:8.9.4-alpine
ADD . /code
WORKDIR /code
RUN npm install && npm run build && npm run start