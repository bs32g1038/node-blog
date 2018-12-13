import Mock from 'mockjs';
import * as article from './article';
import * as guestbook from './guestbook';
import * as link from './link';

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1000
});

// 登录相关和获取用户信息
Mock.mock(/\/articles/, article.getArticles);

Mock.mock(/\/comments/, article.getComments);

Mock.mock(/\/guestbooks/, guestbook.getGuestbooks);

Mock.mock(/\/\api\/links/, link.getLinks);

export default Mock;