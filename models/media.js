var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var moment = require('moment');

var MediaSchema = new Schema({
    type: { type: String, required: true },
    file_name: { type: String, required: true },
    size: { type: Number, required: true },
    create_at: { type: Date, default: Date.now },
    quote: { type: ObjectId }
});

MediaSchema.index({ create_at: -1 });

MediaSchema.virtual('src').get(function() {
    return '/media/' + moment(this.create_at).format('YYYY') + '/' + this.file_name;
});


var mediaModel = mongoose.model('media', MediaSchema, 'media');

module.exports = mediaModel;