/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-05-18 15:57:00
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-05 20:38:31
 */


function authorize(root) {
  if (!root.session.user) {
      throw new Error('Unauthorized');
  }
}
module.exports = authorize;
