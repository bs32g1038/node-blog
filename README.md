# node-blog

**Demo：**

[http://www.lizc.me](http://www.lizc.me "blog")

**Project introduction：**

* Node-blog through Nodejs and express provide the Restful API。
* Data stored in Mongodb，Driven by Mongoose。
* Front-End use of the VUE。
* Use powerful webpack to build projects。
* Support the front and back end of the renderer by vue-server-renderer。
* ......

**目录介绍：**

* client/admin backstage ui，independent project
* client/web   frontend ui，independent project
* server       express resetful api
* nginx-1.10.3 proxy
* docs         development docs

## TODO
- [ ] Article tags (I not  think it is a very useful function,but you can realize it easily by yourself) 
- [x] Writing new article in browser
- [x] Comments
- [x] Archive by time
- [x] Markdown support
- [x] Guestbook support
- [x] Search support
- [x] Other support ...

**Checkout and Run：**

First ，Assume you installed Mongodb，Redis and Nodejs in your OS。

**1，clone code**

>         git clone https://github.com/bs32g1038/node-blog.git

**2，install**

>         npm install

**3，Run app**
>         cd /nginx-?? && start nginx     //start proxy
>         npm run init    // init data must  
>         npm run dev     // development mode
>         npm run build   // production mode
        
**项目简介：**

* Node-blog 通过 Nodejs and express 提供 Restful API。
* 数据存储在Mongodb数据库，连接驱动使用Mongoose。
* 前端使用VUE2.0框架。
* 使用webpack构建vue2.0。
* 支持前后端同构渲染，通过vue2.0的特性。
* 等等

**目录介绍：**

* client/admin 网站后台ui，独立项目
* client/web   网站前台ui，独立项目
* server       网站服务器，提供resetful api， 结合客户端client使用，独立项目
* nginx-1.10.3 代理服务器，用来解决开发过程中的跨域请求
* docs         网站相关文档，有待完善

## TODO
- [ ] 文章标签 (我不认为它是一个非常有用的功能，但你很容易实现它) 
- [x] 在线写作文章
- [x] 评论
- [x] 文章归档
- [x] Markdown 支持
- [x] 留言板支持
- [x] 搜索支持
- [x] 还有其他支持等等

**检查和运行：**

首先，确保Mongodb，Redis 和 Nodejs 已经安装在系统上。

**1，克隆代码或者直接下载zip**

>         git clone https://github.com/bs32g1038/node-blog.git

**2，安装**

>         npm install

**3，运行程序**


>         cd /nginx-?? && start nginx     //开启代理，处理跨域请求，前提条件
>         npm run init    // 初始化数据必须，仅在server端要使用该命令
>         npm run dev     // 开发模式
>         npm run build   // 生产线上文件

**Thank you：**

If you think these contents are useful to you, please add a "Star" at the top right. This is the encouragement to me, thank you!

**感谢：**

如果你觉得这些内容对你有用，请在右上方点个”Star“，这是对我的鼓励，谢谢！。

# License
MIT