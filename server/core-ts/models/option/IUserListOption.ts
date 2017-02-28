/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 08:44:34 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 23:02:03
 */
import IBaseListOption from './IBaseListOption'
interface UserListOpt extends IBaseListOption {
    sort?: { create_at?: number }
}
export default UserListOpt;