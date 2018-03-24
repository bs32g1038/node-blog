FROM node:8.10.0-stretch
RUN mkdir -p /code
WORKDIR /code
COPY ./package.json /code
RUN npm install 
COPY . /code
CMD npm run start