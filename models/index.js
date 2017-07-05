/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-06-20 13:28:25 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 23:04:17
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
var shortid = require('shortid');

/**
 * 连接sqlite数据库
 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database.sqlite',
  underscored: true,
});


// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


var db = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// sequelize.sync({ force: true }).then(() => {
//   let id = shortid.generate();
//   let article = db.article.create({
//     id,
//     title: 'foo',
//     summary: '关于上传，总是有很多可以说道的。\
//     16年底，公司项目番茄表单的前端部分，开始了从传统的jquery到vue \
//     2.0的彻底重构。但是上传部分，无论是之前的传统版本，还是Vue新版本，\
//     都是在使用着FileAPI这款优秀的开源库，只是进行了简单的directive化\
//     。为什么呢？因为兼容性。没办法，公司项目不等同于个人项目，\
//     必须要考虑大多数浏览器。否则，上传部分完全可以利用Vue-Resource\
//     以及FormData来抛开对FileAPI的依赖。这让我深感遗憾，\
//     幸好这个简单的遗憾在个人博客Vue化重构的时候得以弥补。',
//     content: '测试',
//     category: 'frontend',
//     img_url: '',
//     comment_count: 2
//   })

//   let comment = db.comment.create({
//     id,
//     nick_name: 'foo',
//     email: 'bar@qq.com',
//     content: '测试',
//     identity: 1,
//     article_id: id
//   })

//   let reply = db.comment.create({
//     nick_name: 'foo-reply',
//     email: 'bar@qq.com',
//     content: '测试回复是否正常',
//     identity: 1,
//     article_id: id,
//     reply_id: id
//   })

//   Promise.all([article, comment, reply]).then(() => {
//     db.comment.findAndCountAll({
//       include: [
//         { model: db.article, as: 'article', required: true, attributes: ['id', 'title'] },
//         { model: db.comment, as: 'reply', attributes: ['id', 'nick_name', 'content', 'created_at'] }
//       ]
//       // offset: 0,
//       // limit: 2
//     }).then((res) => {
//       console.dir(JSON.stringify(res))
//     })
//   })
// }).catch(error => {
//   console.log(error)
// })


module.exports = db;