import { Random } from 'mockjs';

const articles = [{
    status: 'pushed',
    commentCount: 0,
    viewsCount: 259,
    _id: '5b100e80a97f1a001526f382',
    screenshot: Random.image('150x95', '#d8c7c7'),
    title: 'gulp快速入门',
    category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' },
    summary: '5步上手gulp',
    createdAt: '2018-05-31T15:02:24.352Z',
    updatedAt: '2018-12-05T05:33:26.483Z',
    __v: 0
},
{
    status: 'pushed',
    commentCount: 0,
    viewsCount: 317,
    _id: '5ae156501b7f290015c81c4d',
    screenshot: Random.image('150x95', '#d8c7c7'),
    title: '简单获取网易云歌单以及歌词列表并生成json文件',
    category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' },
    summary: '利用nodejs调用网易云音乐的api接口，实现歌单和歌词的获取。原歌单列表并没有音频的src链接，因此，在实现拉取的过程中，对歌单进行系列化处理，最后写入文件', createdAt: '2018-04-26T04:32:16.964Z', updatedAt: '2018-12-06T00:15:20.610Z', __v: 0
},
{
    status: 'pushed',
    commentCount: 0,
    viewsCount: 202,
    _id: '5ada1a5095cd5d001503d4b0',
    screenshot: Random.image('150x95', '#d8c7c7'),
    title: 'HTTP请求常见状态码',
    category: { _id: '5ac646026c06ab00153fa834', name: '后端' },
    summary: '在开发后端api的时候，需要根据用户的请求来返回相对应的http状态码，做个记录，方便查询。', createdAt: '2018-04-20T16:50:24.370Z', updatedAt: '2018-12-06T00:15:20.140Z', __v: 0
}, { status: 'draft', commentCount: 0, viewsCount: 262, _id: '5abcb2701d8812001f8eba9e', screenshot: '/static/upload/2018/036ec9d34c7a3e39579bba93bf069377.jpg', isHtml: false, title: '删除docker build产生的《none》的镜像', category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' }, summary: '工作中经常使用的几行命令，做个简单的记录！', createdAt: '2018-03-29T09:31:28.205Z', updatedAt: '2018-12-06T01:26:14.219Z', __v: 0 }, { status: 'draft', commentCount: 0, viewsCount: 267, _id: '5abb9294fe8eae00159d5c02', screenshot: '/static/upload/2018/202c35126281fb8b0e7d578b2b39a234.png', isHtml: false, title: 'React的替代方案Inferno，更小，更轻，更快', category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' }, summary: '本博客基于高性能的Inferno，而Inferno可以看做是React的另一个精简、高性能实现。', createdAt: '2018-03-28T13:03:16.989Z', updatedAt: '2018-12-06T00:15:22.974Z', __v: 0 }, { status: 'draft', commentCount: 0, viewsCount: 217, _id: '5abb8650fe8eae00159d5c01', screenshot: '/static/upload/2018/7b0c0bdbc4bc359098d9ad2db653facc.jpg', isHtml: false, title: 'node-blog 部署 - 方式2（非docker）', category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' }, summary: 'node-blog是基于nodejs express实现的一个博客，在部署方面与其他基于nodejs实现的博客类似，下面开始简单粗暴的说明。', createdAt: '2018-03-28T12:10:56.682Z', updatedAt: '2018-12-05T11:53:35.885Z', __v: 0 }, { status: 'draft', commentCount: 1, viewsCount: 317, _id: '5aac87a521a4420015329443', screenshot: '/static/upload/2018/910a318741e3b70553c31f49500325ad.jpg', isHtml: false, title: 'node-blog docker部署', category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' }, summary: '进行线上部署，建议采用docker进行部署，方便快捷，易用', createdAt: '2018-03-17T03:12:37.664Z', updatedAt: '2018-12-06T00:15:20.856Z', __v: 0 }, {
    status: 'draft',
    commentCount: 0,
    viewsCount: 250,
    _id: '5aac7c287d6d6e0015f5cc07',
    screenshot: Random.image('150x95', '#d8c7c7'),
    isHtml: false,
    title: 'node-blog',
    category: { _id: '5aac7ba07d6d6e0015f5cc06', name: '前端' }, summary: 'A react blog project base on nodejs, express, mongoose http://www.lizc.me/', createdAt: '2018-03-17T02:23:36.424Z',

    updatedAt: '2018-12-06T00:15:20.160Z',
    __v: 0
}];

const comments = [{ pass: false, identity: 0, _id: '5abb6211fe8eae00159d5c00', article: '5aac87a521a4420015329443', nickName: '测试', content: '测试', createdAt: '2018-03-28T09:36:17.937Z', updatedAt: '2018-03-28T09:36:17.937Z', __v: 0 }];

export const getArticles = () => {
    return articles;
};

export const getComments = () => {
    return comments;
};