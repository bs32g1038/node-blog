# node-blog

A simple, fast and easy-to-use blog

[![Build Status](https://travis-ci.org/bs32g1038/node-blog.svg?branch=master)](https://travis-ci.org/bs32g1038/node-blog) ![David](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/bs32g1038/node-blog.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bs32g1038/node-blog/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bs32g1038/node-blog.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bs32g1038/node-blog/context:javascript) 
[![codecov](https://codecov.io/gh/bs32g1038/node-blog/branch/master/graph/badge.svg)](https://codecov.io/gh/bs32g1038/node-blog) ![GitHub](https://img.shields.io/github/license/bs32g1038/node-blog.svg)

**Demo :**

[http://www.lizc.me](http://www.lizc.me "blog")

**Screenshot :**

![screenshot-home](https://github.com/bs32g1038/node-blog/blob/master/screenshot/home.png?raw=true)

![screenshot-admin](https://github.com/bs32g1038/node-blog/blob/master/screenshot/admin.png?raw=true)

**Project introduction：**

* Node-blog through Nodejs and express provide the Restful API
* Data stored in Mongodb，Driven by Mongoose
* Front-End and Back-End use of the React
* Use powerful webpack to build projects
* ......

**Project structure :**

* nginx: used as gateway, unified port;
* node-blog-api: provide blog server api, based one nodejs, mongodb;
* react-blog: front-end ui;
* react-admin: admin ui;
* react-music-app: a simple music web app
* docker-compose.yml: docker-compose config file

## TODO
- [ ] Article tags (I not  think it is a very useful function,but you can realize it easily by yourself) 
- [x] Writing new article in browser
- [x] Comments
- [x] Search support
- [x] Other support ...

**1，clone code**

>         git clone https://github.com/bs32g1038/node-blog.git

**2，install**

>         cd **
>         npm install

**3，Run app**
>         npm run dev     // development mode
>         npm run build   // build dist for frontend

**Thank you：**

If you think these contents are useful to you, please add a "Star" at the top right. This is the encouragement to me, thank you!

# License
MIT