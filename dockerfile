FROM node:8.10.0-stretch
RUN mkdir -p /code
WORKDIR /code
COPY . /code
RUN npm install && npm run build
CMD npm run start