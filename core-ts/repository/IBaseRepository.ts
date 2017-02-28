/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 22:17:36 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-22 10:04:23
 */

interface IBaseRepository<T, O> {
    getList: (query: T, opt: O) => Promise<Object>;
    getOne: (query: T) => Promise<Object>;
    getById: (id: string) => Promise<Object>;
    getAll: () => Promise<Object>;
    create: (item: T) => Promise<any>;
    updateById: (_id: string, item: T) => Promise<any>;
    deleteById: (_id: string) => Promise<any>;
}

export default IBaseRepository;