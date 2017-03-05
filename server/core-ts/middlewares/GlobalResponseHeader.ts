/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 21:41:01 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-05 13:51:39
 */

import IRouterRequest from './IRouterRequest';

export default async (req, res, next) => {
    res.setHeader('X-Pretty-Print', 'true');
    // ctx.response.set('Content-Encoding', 'gzip');
    res.setHeader('Server', 'bs32g1038@163.com');
    res.setHeader('X-Powered-By', 'bs32g1038@163.com');
    next();
}
