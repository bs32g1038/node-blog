/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-30 15:20:08
 */
const models = require('../models');
const BaseService = require('./base');

class ArticleService extends BaseService {

  getList({ where = {}, page = 1, per_page = 10 }) {
    return this.getRepository().findAll({
      where,
      offset: page * (page - 1),
      limit: per_page
    })
  }

  getByIdAndUpdateVisitCount(id) {
    return this.getById(id).then((article) => {
      article.visit_count++;
      return article.save();
    })
  }

  softDeleteById(id) {
    return this.getById(id).then((article) => {
      article.is_deleted = true;
      return article.save();
    })
  }

}

module.exports = new ArticleService(models.article);