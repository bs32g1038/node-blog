/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 08:44:34 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-22 22:03:12
 */
import IBaseListOption from './IBaseListOption'
interface CommentListOpt extends IBaseListOption {
    sort?: { create_at?: number }
}
export default CommentListOpt;