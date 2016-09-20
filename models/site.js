/*!
 * site model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    key:{type : String,required: true},                            //用于初始化数据检索
    name: {type: String},                           //网站名称
    logo: {type: String},                           //网站logo
    icp: {type: String},                            //备案号
    url: {type: String},                            //网站url
    qr_code: {type: String},                        //网站二维码
    visit_count:{type:Number,default:0},            //网站浏览次数
    code_header: {type: String},                    //用于添加网站统计代码(如：百度统计)
    code_footer: {type: String},                    //用于附加代码,暂不使用
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

var siteModel = mongoose.model('site', SiteSchema, 'site');

module.exports = siteModel;