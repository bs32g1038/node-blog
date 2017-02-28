/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:45:38 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-21 20:42:18
 */

interface IBaseService<T, O> {
    getList: (query: T, opt: O) => Promise<{
        items: Object,
        totalItems: number
    }>;
    getById: (id: string) => Promise<any>;
    getAll: () => Promise<any>;
    create: (item: T) => Promise<any>;
    updateById: (_id: string, item: T) => Promise<any>;
    deleteById: (_id: string) => Promise<any>;
    count: (query: T) => Promise<number>;
}

export default IBaseService;