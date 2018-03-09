// /*
//  * @Author: bs32g1038@163.com
//  * @Date: 2017-10-01 10:06:17
//  * @Last Modified by: bs32g1038@163.com
//  * @Last Modified time: 2017-10-01 10:10:46
//  */
// const log4js = require('log4js');
// const path = require('path');
// log4js.configure({
//   appenders: {
//     out: { type: 'stdout' },
//     cheese: {
//       type: 'file',
//       filename: path.resolve(__dirname, '../logs/cheese.log'),
//       category: 'cheese',
//       pattern: '_yyyy',
//     }
//   },
//   categories: { default: { appenders: ['cheese', 'out'], level: 'info' } }
// });
// const logger = log4js.getLogger('cheese');
// logger.level = 'debug';
// module.exports = logger;

const log4js = require('log4js');
log4js.configure({
 appenders: {
   console: { type: 'console' },
   file: { type: 'file', filename: 'cheese.log' }
 },
 categories: {
   cheese: { appenders: ['file'], level: 'info' },
   default: { appenders: ['console'], level: 'info' }
 }
});
module.exports = process.env.NODE_DEV === "production" ?  log4js.getLogger('cheese') : log4js.getLogger('default');