var Sequelize = require('sequelize');

var shortid = require('shortid');

var sequelize = new Sequelize('blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});

var Post = sequelize.define('post', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: function () {
            return shortid.generate()
        }
    },
    title: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'zc_post',
    underscored: true
});
var Tag = sequelize.define('tag', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: function () {
            return shortid.generate()
        }
    },
    name: Sequelize.STRING,
}, {
    freezeTableName: true,
    tableName: 'zc_tag',
    underscored: true
});


var PostTag = sequelize.define('zc_post_tag', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: function () {
            return shortid.generate()
        }
    }
}, {
    freezeTableName: true,
    tableName: 'zc_post_tag',
    underscored: true
});

Post.belongsToMany(Tag, {through: PostTag});
Tag.belongsToMany(Post, {through: PostTag});


//Post.sync({force: true});
//Tag.sync({force: true});


//PostTag.sync({force: true});
exports.Post = Post;
exports.Tag = Tag;


//co(function*() {
//
//    var Post = mysql.Post;
//    var Tag = mysql.Tag;
//
//var post = yield Post
//    .create({title: 'foo'});
//
//post.createTag({name: 'title'})
////

//
//    Post.findOne({
//        where: {
//            id: 'Hkw0mlOs'
//        },
//        include: [
//            {
//                model: Tag,
//                through: {
//                    attributes: [''],
//                }
//            }
//        ]
//    }).then(function (post) {
//
//        console.log(post.get({'plain': true}).tags);
//
//
//        res.json({
//            data: post.get({'plain': true})
//        });
//
//
//    })
//
//
//})
