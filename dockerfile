FROM node:8.10.0-stretch
RUN mkdir -p /code
WORKDIR /code
COPY ./package.json /code
RUN yarn install
COPY . /code
RUN npm run build
CMD npm run start