/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 22:30:20
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-30 17:41:27
 */
const LRU = require('lru-cache');

const cache = LRU();

class BaseService {
  constructor(model) {
    this.model = model;
  }
  getList(query) {
    return this.model.findAll(query);
  }
  getOne(query) {
    return this.model.findOne(query);
  }
  getById(id) {
    return this.model.findById(id);
  }
  getAll() {
    return this.model.findAll();
  }
  create(item) {
    return this.model.create(item);
  }
  updateById(id, item) {
    return this.model.update(item, {
      where: {
        id
      }
    });
  }
  getByIdAndUpdate(id, item) {
    return this.model.findById(id).then((rs) => {
      if (rs) {
        return rs.update(item);
      }
      return Promise.resolve(null)
    });
  }
  deleteById(id) {
    return this.model.destroy({ where: { id } });
  }
  count(query) {
    // const key = `${this.model.modelName}recordcount${query ? JSON.stringify(query) : {}}`;
    // let count = await cache.get(key);
    // if (count) {
    //   return Promise.resolve(count);
    // }
    // count = await this.model.count(query);
    // await cache.set(key, count, 60 * 60 * 1);
    // return Promise.resolve(count);
    return this.model.count(query);
  }
  getRepository() {
    return this.model;
  }
}
module.exports = BaseService;