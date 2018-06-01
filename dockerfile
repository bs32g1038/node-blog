FROM node:8.11.1-alpine
RUN apk add vips-dev fftw-dev g++ make --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ \ 
&& mkdir -p /code
WORKDIR /code
COPY ./package.json /code
RUN npm install --production
COPY ./server /code/server
COPY ./static /code/static