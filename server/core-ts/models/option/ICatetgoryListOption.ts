/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 08:44:34 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-22 10:09:48
 */
import IBaseListOption from './IBaseListOption'
interface CategoryListOpt extends IBaseListOption {
    sort?: { article_count?: -1, order: 1 }
}
export default CategoryListOpt;