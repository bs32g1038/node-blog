/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-01-17 15:48:46 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-05 13:44:14
 */

// import logUtil = require('./helpers/log_util');
// const user = require('./routes/user');
// import article from './routes/article';
// import category from './routes/category';
// import comment from './routes/comment';
// import guestbook from './routes/guestbook';
// import link from './routes/link';
// import user from './routes/user';
// import about from './routes/about';
// import setting from './routes/setting';
// import auth from './routes/auth';

import indexRoute from './routes/index';

// const comment = require('./routes/comment');
// import JsonResponse from './middlewares/JsonResponse';
// import ResponsePaginationLink from './middlewares/ResponsePaginationLink'
import GlobalResponseHeader from './middlewares/GlobalResponseHeader';
export default function (app) {
  app.use(GlobalResponseHeader)
  app.use(indexRoute);
}
