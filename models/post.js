var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
    title: {type: String},                                  //标题
    content: {type: String, default: ''},                   //正文
    summary: {type: String, default: ''},                   //摘要
    img_url: {type: String, default: '/uploads/default.jpg'},                   //缩略图
    category: {type: String},                               //分类(非显示名称,目录别名alias)
    from: {type: Number, defaut: 0},                        //0转载 1为原创
    is_recommend: {type: Boolean, default: false},          //推荐?
    comment_count: {type: Number, default: 0},              //评论数量
    visit_count: {type: Number, default: 0},                //浏览次数
    create_at: {type: Date, default: Date.now},             //发布时间
    update_at: {type: Date, default: Date.now},             //更新时间
    is_html: {type: Boolean, default: false},               //是否为html格式
    is_deleted: {type: Boolean, default: false},            //删除?
    is_draft: {type: Boolean, default: false},              //是否为草稿
});

PostSchema.index({create_at: -1});                          //建立索引

var postModel = mongoose.model('post', PostSchema, 'post');                 //第三个参数决定集合是否以复数形式

module.exports = postModel;