FROM node:8.12.0-jessie
WORKDIR /code
COPY ./package.json /code
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install --production
COPY . /code