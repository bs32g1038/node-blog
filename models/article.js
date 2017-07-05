/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-06-20 13:26:32 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 22:59:15
 */
const shortid = require('shortid');
module.exports = function(sequelize, DataTypes) {
  const Article = sequelize.define('article', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true, 
      allowNull: false,
      defaultValue: shortid.generate
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img_url: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    visit_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_html: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 'article',
    timestamps: true,
    underscored: true
  });
  return Article;
};