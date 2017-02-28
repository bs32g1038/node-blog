/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 21:41:01 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:52:22
 */

import IRouterRequest from './IRouterRequest';

export default async (res, req, next) => {
    // ctx.response.set('X-Pretty-Print', 'true');
    // // ctx.response.set('Content-Encoding', 'gzip');
    // ctx.response.set('Server', 'bs32g1038@163.com');
    // ctx.response.set('X-Powered-By', 'bs32g1038@163.com');
    next();
}
