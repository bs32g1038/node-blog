FROM node:10.16.0-alpine
WORKDIR /code
COPY ./package.json /code
RUN yarn install
COPY . /code
RUN yarn run build
EXPOSE 7000