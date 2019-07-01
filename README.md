# node-blog

A simple, fast and easy-to-use blog

**blog-web :**

[![Build Status](https://travis-ci.com/lc-notes/blog-web.svg?branch=master)](https://travis-ci.com/lc-notes/blog-web) ![David (path)](https://img.shields.io/david/lc-notes/blog-web.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/lc-notes/blog-web.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-web/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/lc-notes/blog-web.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-web/context:javascript) ![GitHub](https://img.shields.io/github/license/lc-notes/blog-web.svg)


**blog-admin :**

[![Build Status](https://travis-ci.com/lc-notes/blog-admin.svg?branch=master)](https://travis-ci.com/lc-notes/blog-admin) ![David](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/lc-notes/blog-admin.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-admin/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/lc-notes/blog-admin.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-admin/context:javascript) ![GitHub](https://img.shields.io/github/license/lc-notes/blog-admin.svg)

**blog-server**

[![Build Status](https://travis-ci.com/lc-notes/blog-server.svg?branch=master)](https://travis-ci.com/lc-notes/blog-server) ![David (path)](https://img.shields.io/david/lc-notes/blog-server.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/lc-notes/blog-server.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-server/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/lc-notes/blog-server.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-server/context:javascript) ![GitHub](https://img.shields.io/github/license/lc-notes/blog-server.svg)

**blog-music-app**

[![Build Status](https://travis-ci.com/lc-notes/blog-music-app.svg?branch=master)](https://travis-ci.com/lc-notes/blog-music-app) ![David (path)](https://img.shields.io/david/lc-notes/blog-music-app.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/lc-notes/blog-music-app.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-music-app/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/lc-notes/blog-music-app.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/lc-notes/blog-music-app/context:javascript) ![GitHub](https://img.shields.io/github/license/lc-notes/blog-music-app.svg)

**blog-nginx**

[![Build Status](https://travis-ci.com/lc-notes/blog-nginx.svg?branch=master)](https://travis-ci.com/lc-notes/blog-nginx) ![GitHub](https://img.shields.io/github/license/lc-notes/blog-nginx.svg)

**Demo :**

[http://www.lizc.me](http://www.lizc.me "blog")

**Screenshot :**

![screenshot-home](https://github.com/bs32g1038/node-blog/blob/master/screenshot/home.png?raw=true)

![screenshot-admin](https://github.com/bs32g1038/node-blog/blob/master/screenshot/admin.png?raw=true)

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

source code: [https://github.com/lc-notes/blog-nginx.git](https://github.com/lc-notes/blog-nginx.git)

* blog-server: provide blog server api, based one nodejs, mongodb;

source code: [https://github.com/lc-notes/blog-server.git](https://github.com/lc-notes/blog-server.git)

* blog-web: front-end ui;

source code: [https://github.com/lc-notes/blog-web.git](https://github.com/lc-notes/blog-web.git)

* blog-admin: admin ui;

source code: [https://github.com/lc-notes/blog-admin.git](https://github.com/lc-notes/blog-admin.git)


* blog-music-app: a simple music web app

source code: [https://github.com/lc-notes/blog-music-app.git](https://github.com/lc-notes/blog-music-app.git)

* docker-compose.yml: docker-compose deploy config file

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
git clone https://github.com/lc-notes/**.git
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

**use docker**

```
git clone https://github.com/bs32g1038/node-blog.git
docker-compose build
docker-compose up -d
```

**no docker**
* You need to git clone relative project.
* Than, ```npm install``` && ```npm run start:prod```
* Lastly, set the nginx
* Finish!!! 👏👏👏

## Environment dependence

Operating System: Linux, OS X or Windows.

Node.js Runtime: 8.x or newer; it is recommended that you use LTS Releases.

database: mongdb 4.x or newer;

## Thank you：

If you think these contents are useful to you, please add a "Star" at the top right. This is the encouragement to me, thank you!

# License
MIT