/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:34:05 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 22:14:39
 */

interface Article {
    _id?: string;
    title?: string;
    content?: string;
    category?: string;
    summary?: string;
    img_url?: string;
    from?: string;
    is_recommend?: boolean;
    is_deleted?: boolean;
    is_draft?: boolean;
    is_html?: boolean;
}

export default  Article