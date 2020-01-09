FROM node:12.14.1-alpine3.9
WORKDIR /code
COPY ./package.json /code
RUN yarn install
COPY . /code
RUN yarn run build
EXPOSE 8080