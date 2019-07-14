FROM node:10.16.0-alpine as builder
WORKDIR /code
COPY ./package.json /code
RUN yarn install
COPY . /code
RUN yarn run build

FROM node:10.16.0-alpine
WORKDIR /code
COPY --from=builder /code /code
EXPOSE 3002