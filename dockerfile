FROM node:8.10.0-alpine
RUN mkdir -p /code
WORKDIR /code
COPY . /code
RUN npm install && npm run build && npm run start