const mongoose = require("mongoose");
const isDev = process.env.NODE_ENV !== 'production';
module.exports = mongoose.createConnection(isDev ? 'mongodb://localhost:27017/devchatroom' : 'mongodb://db:27017/chatroom');