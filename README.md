# node-blog

A simple, fast and easy-to-use blog

[![Build Status](https://travis-ci.org/bs32g1038/node-blog.svg?branch=master)](https://travis-ci.org/bs32g1038/node-blog) ![David](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/bs32g1038/node-blog.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bs32g1038/node-blog/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bs32g1038/node-blog.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bs32g1038/node-blog/context:javascript) 
[![codecov](https://codecov.io/gh/bs32g1038/node-blog/branch/master/graph/badge.svg)](https://codecov.io/gh/bs32g1038/node-blog) ![GitHub](https://img.shields.io/github/license/bs32g1038/node-blog.svg)

**Demo :**

[http://www.lizc.me](http://www.lizc.me "blog")

**Screenshot :**

![screenshot-home](https://github.com/bs32g1038/node-blog/blob/master/scrdeenshots/home.png?raw=true)

![screenshot-admin](https://github.com/bs32g1038/node-blog/blob/master/scrdeenshots/admin.png?raw=true)

## Project introduction

* Node-blog through Nodejs and express provide the Restful API
* Data stored in Mongodb，Driven by Mongoose
* Front-End and Back-End use of the React
* Use powerful webpack to build projects
* Ant design
* Support server-side render
* Responsive layout for mobile-side
* ......

## Project structure

* nginx: used as gateway, unified port;
* node-blog-api: provide blog server api, based one nodejs, mongodb;
* react-blog: front-end ui;
* react-admin: admin ui;
* react-music-app: a simple music web app
* docker-compose.yml: docker-compose config file

## Todo
- [ ] Article tags (I not  think it is a very useful function,but you can realize it easily by yourself) 
- [x] Writing new article in browser
- [x] Comments
- [x] Search support
- [x] Mobile web support
- [x] Other support ...

## Development

**1，clone code**
```
git clone https://github.com/bs32g1038/node-blog.git
```

**2，install**
```
cd **
npm install
```

**3，run app**
```
npm run dev     // development mode
```

**4, build dist**
```
npm run build   // build dist for frontend
```

## Deploy

The project has integrated related suites, such as nginx dockerfile, docker-compose.yml. So you can easy to deploy the project.

* First: I recommend that you debug locally and make changes to configuration information, such as database information and personal information.

* Secondly: you can choice the docker to deploy this project. It is very esay. you only ```pull``` the project to your server and install ```docker```, and run ```docker-compose build``` command, and run ```docker-compose up -d``` command

**However!!!⚠**

If you don't want to use docker, you must to ```cd``` the relative item and run ```npm install or yarn install``` command.

At the same, When finish install, you need to run ```npm run start:prod``` command.

Finally start nginx, before you may need to modify several areas of nginx config.

for example:

```nginx
upstream server {
    server api:8080;
}
upstream blog {
    server blog:3000;
}
upstream admin {
    server admin:3002;
}
upstream music {
    server music:7000;
}

# change the ```api,blog,admin,music``` to localhost or 127.0.0.1
```

## Environment dependence

Operating System: Linux, OS X or Windows.

Node.js Runtime: 8.x or newer; it is recommended that you use LTS Releases.

database: mongdb 4.x or newer;

## Thank you：

If you think these contents are useful to you, please add a "Star" at the top right. This is the encouragement to me, thank you!

# License
MIT