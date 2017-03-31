/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 21:41:01
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:51:34
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    req.setHeaderLink = (link) => {
        //   生成的头部链接信息
        //   <https://api.github.com/user/repos?page=3&per_page=100>; rel="next",
        //   <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"
        let links = [];
        let str = '';
        for (var key of Object.keys(link)) {
            str = '<' + link[key] + '>;rel="' + key + '"';
            if (link[key]) {
                links.push(str);
            }
        }
        let Link = links.join(',');
        return req.response.set('Link', Link);
    };
    yield next();
});
