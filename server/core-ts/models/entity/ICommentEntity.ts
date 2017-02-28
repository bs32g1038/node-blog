/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 17:35:20 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 10:06:31
 */

interface Comment {
    nick_name?: string;
    email?: string;
    content?: string;
    article?: string;
    pass?: boolean;
    deleted?: boolean;
    reply?: string;
    identity?: number;
}

export default Comment;