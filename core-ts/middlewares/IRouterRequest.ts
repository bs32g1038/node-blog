/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 21:14:59 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:54:10
 */

import * as express from 'express';

interface IRouterRequest extends express.Request {
    session: { user: {} };
}

export default IRouterRequest;