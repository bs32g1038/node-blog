FROM node:8.11.1-alpine
RUN apk add vips-dev fftw-dev g++ make --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ \
  && rm -rf /var/cache/apk/*
WORKDIR /code
COPY ./package.json /code
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install --production
COPY . /code