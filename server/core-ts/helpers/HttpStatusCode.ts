/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-20 20:08:34 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-20 20:53:41
 */

export default class HttpStatusCode {
    static HTTP_OK = 200;
    // 请求成功并且服务器创建了新的资源
    static HTTP_CREATED = 201;
    // 服务器成功处理了请求，但没有返回任何内容
    static HTTP_NO_CONTENT = 204;
    static HTTP_MOVED_PERM = 301;
    static HTTP_MOVED_TEMP = 302;
    static HTTP_BAD_REQUEST = 400;
    // 用户没有登录
    static HTTP_UNAUTHORIZED = 401;
    // 没有找到
    static HTTP_NOT_FOUND = 404;
    // 无法处理的请求实体
    static HTTP_UNPROCESSABLE_ENTITY = 422;
    // 内部错误
    static HTTP_INTERNAL_ERROR = 500;
}
