/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 23:41:09
 */
const models = require('../models');
const BaseService = require('./base');

class CommentService extends BaseService {
  getFullList({ where = {}, page = 1, per_page = 10 }) {
    return this.getRepository()
      .findAll({
        include: [
          { model: models.article, as: 'article', required: true, attributes: ['id', 'title'] },
          { model: models.comment, as: 'reply', attributes: ['id', 'nick_name', 'content', 'created_at', 'identity'] }
        ],
        where,
        offset: page * (page - 1),
        limit: per_page
      })
  }
  create(item) {
    return models.sequelize.transaction(function(t) {
      return models.article.findById(item.article_id).then((article) => {
        article.comment_count++;
        return article.save({ transaction: t }).then(() => {
          return models.comment.create(item, { transaction: t })
        });
      })
    })
  }
  deleteById(id) {
    return models.sequelize.transaction(function(t) {
      return models.comment.findById(id).then((comment) => {
        return models.article.findById(comment.article_id).then((article) => {
          return article.decrement('comment_count', { by: 1 }).then(() => {
            return models.comment.destroy({ where: { id } }, { transaction: t }).then(()=>{
              return comment;
            })
          });
        })
      })
    })
  }
}

module.exports = new CommentService(models.comment);