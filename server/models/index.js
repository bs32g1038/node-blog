const mongoose = require("mongoose");
const config = require("../config");
mongoose.connect(config.db.uri);
exports.Article = require("./article");
exports.Category = require("./category");
exports.Comment = require("./comment");
exports.Guestbook = require("./guestbook");