FROM node:14-alpine3.12
WORKDIR /code
COPY ./package.json /code
RUN npm install
COPY . /code
RUN npm run build
FROM node:14-alpine3.12
COPY --from=0 /code .
RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*
EXPOSE 8080