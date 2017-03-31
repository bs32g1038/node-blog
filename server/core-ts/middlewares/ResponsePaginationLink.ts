/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 21:41:01 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:51:34
 */

import IRouterRequest from './IRouterRequest';

export default async (req, res, next) => {

    req.setHeaderLink = (link: {
        next: String,
        last: String,
        first?: String,
        prev?: String
    }) => {
        //   生成的头部链接信息
        //   <https://api.github.com/user/repos?page=3&per_page=100>; rel="next",
        //   <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
        let links: Array<string> = [];
        let str: string = '';
        for (var key of Object.keys(link)) {
            str = '<' + link[key] + '>;rel="' + key + '"'
            if (link[key]) {
                links.push(str);
            }
        }
        let Link = links.join(',');
        return req.response.set(
            'Link', Link
        )
    };

    await next();

}
