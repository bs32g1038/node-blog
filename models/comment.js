/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-06-20 13:27:36 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 23:05:36
 */
const shortid = require('shortid');
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: shortid.generate
    },
    nick_name: { type: DataTypes.STRING(30), allowNull: false },
    email: {
      type: DataTypes.STRING(30),
      validate: { isEmail: true },
      allowNull: false
    },
    content: { type: DataTypes.TEXT, allowNull: false },
    // reply_id: { type: DataTypes.TEXT },
    // article_id: { type: DataTypes.STRING, allowNull: false },
    pass: { type: DataTypes.BOOLEAN, defaultValue: true },
    identity: { type: DataTypes.BOOLEAN, defaultValue: false } // 0是游客，1是作者 
  }, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 'comment',
    underscored: true,
    timestamps: true,
    updatedAt: false
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.article, {
      as: 'article',
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.comment, {
      as: 'reply',
      foreignKey: {
        allowNull: true
      }
    });
  }

  return Comment;
};