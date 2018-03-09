FROM node:8.10.0-stretch
RUN mkdir -p /code
WORKDIR /code
COPY . /code
RUN npm install && npm install -g pm2 && npm run build
CMD npm run start