const app = require('../server/app.js');
const assert = require('assert');
let request = require('supertest')(app);
const config = require('../server/config');
const jwt = require('jsonwebtoken');
const token = jwt.sign({ account: config.user.account }, config.token_secret_key, {
    expiresIn: 60 * 60
})

let articleId = '';

describe('/server/core/article.js', function() {

    this.timeout(15000);

    it('should 401 with no accessToken', function(done) {
        request.post('/api/articles')
            .send({
                title: '我是API测试标题',
                summary: '我是API测试摘要',
                content: '我是API测试内容',
                screenshot: '/static/images/default.jpg',
                category: '5abcb2701d8812001f8eba9e'
            })
            .end(function(err, res) {
                assert.equal(res.status, 401)
                done();
            });
    });

    it('should create a article', function(done) {
        request.post('/api/articles')
            .set({ 'authorization': token })
            .send({
                title: '我是API测试标题',
                summary: '我是API测试摘要',
                content: '我是API测试内容',
                screenshot: '/static/images/default.jpg',
                category: '5abcb2701d8812001f8eba9e'
            })
            .end(function(err, res) {
                assert.equal(res.status, 201);
                articleId = res.body._id
                done();
            });
    });

    it('should update a article', function(done) {
        request.put('/api/articles/' + articleId)
            .set({ 'authorization': token })
            .send({
                title: '我是API测试标题',
                summary: '我是API测试摘要',
                content: '我是API测试内容',
                screenshot: '/static/images/default.jpg',
                category: '5abcb2701d8812001f8eba9e'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('should delete a article', function(done) {
        request.delete('/api/articles/' + articleId)
            .set({ 'authorization': token })
            .end(function(err, res) {
                assert.equal(res.status, 204);
                done();
            });
    });

});