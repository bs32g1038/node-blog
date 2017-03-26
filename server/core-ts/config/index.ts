/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-15 21:36:48 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-15 23:23:06
 */
import dev from './dev';
import prod from './prod';
export default process.env.NODE_ENV === 'production' ? prod : dev;
