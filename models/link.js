var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    name: {type: String},
    url: {type: String, default: ''},//链接路径
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

LinkSchema.index({name: 1});
LinkSchema.index({create_at: -1});
LinkSchema.index({update_at: -1});

var linkModel = mongoose.model('link', LinkSchema, 'link');

module.exports = linkModel;