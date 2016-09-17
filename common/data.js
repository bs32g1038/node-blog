/**************************************
 * 数据库操作类添加方法保存的数据
 * 2016-7-25
 **************************************/

var docData = {
    title: "",                                              //标题
    content: "",                                            //正文
    summary: "",                                            //摘要
    img_url: "",                                            //缩略图
    custom_url: "",                                         //自定义url
    category_id: "",                                        //分类
    type: 1,                                                //0转载 1为原创
    is_recommend: false,                                    //推荐?
    is_html: false,                                         //是否为html格式
    is_draft: false,                                        //是否为草稿
}

exports.doc = docData;

var guestbookData = {
    nick_name: "",                                          //用户名
    email: "",                                              //邮箱
    content: "",                                            //内容
}

exports.guestbookData = guestbookData;

var categoryData = {
    name: "",                                                //分类中文名称
}

exports.categoryData = categoryData;

var commmentData = {
    post_id: "",                                                //文章id
    nick_name: "",                                              //用户名
    email: "",                                                  //邮箱
    content: "",                                                //内容
    reply_id: "",                                               //回复评论id
}

exports.commmentData = commmentData;






