/*!
 * about model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AboutSchema = new Schema({
    _id: { type: String, required: true },                            //用于初始化数据检索
    title: { type: String },
    content: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

var aboutModel = mongoose.model('about', AboutSchema, 'about');

module.exports = aboutModel;