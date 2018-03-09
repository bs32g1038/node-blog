const mongoose = require("mongoose");
const config = require("../config");
// const logger = require("../utils/logger");
mongoose.connect(config.db.uri);

const Article = require("./article");
exports.Article = Article
exports.Category = require("./category");
exports.Comment = require("./comment");
exports.Guestbook = require("./guestbook");
// exports.user = require("./user");
// exports.link = require("./link");
// exports.about = require("./about");
// exports.media = require("./media");
// exports.setting = require("./setting");
//  new Article({ 
//     title: 'Zildjian',
//     content: "暂无内容",
//     summary: "暂无简介"
// }).save();