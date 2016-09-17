var Model = require('./index');

var Blog = {};

/**
 * 保存目录
 * @param category
 * @param callback
 */
Blog.save = function (callback) {

    var blogModel = new Model.Blog({
        _id: 'blog'
    });

    blogModel.save(function (err) {

        if (err) {
            return callback(err);
        }

        return callback(null, "保存成功！");

    });

}

Blog.getBlog = function (callback) {

    Model.Blog.findById({_id: 'blog'}, function (err, blog) {

        if (err) {
            return callback(err);
        }

        callback(null, blog);

    });

}

Blog.update = function (blog, callback) {
    console.log("进入" + blog )
    Model.Blog.update({_id: 'blog'}, {
        $set: {
            blog_title: blog.blog_title,
            blog_description: blog.blog_description,
            blog_author: blog.blog_author,
            author_description: blog.author_description,
            recordation: blog.recordation,
            update_at: new Date()
        }
    }, function (err, raw) {

        if (err) {
            return callback(err);
        }

        return callback(null, raw);

    });

}

Blog.updateLikeCount = function (callback) {

    Model.Blog.update({_id: 'blog'}, {$inc: {"like_count": 1}}, function (err, raw) {

        if (err) {
            return callback(err);
        }

        return callback(null, raw);

    });
}

Blog.updateVisitCount = function (callback) {

    Model.Blog.update({_id: 'blog'}, {$inc: {"visit_count": 1}}, function (err, raw) {

        if (err) {
            return callback(err);
        }

        return callback(null, raw);

    });
}

module.exports = Blog;