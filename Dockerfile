FROM node:12.14.1-alpine3.9
WORKDIR /code
COPY ./package.json /code
RUN yarn install
COPY . /code
RUN yarn run build
RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*
EXPOSE 8080