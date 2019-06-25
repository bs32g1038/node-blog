import axios from '../../src/utils/axios.util';

describe('axios', () => {
    it('axios timeout test', async () => {
        axios.get('/test2323323').then(_ => _).catch(err => {
            expect(err.message).toEqual({ statusCode: 408, error: 'Request Timeout', message: '请求超时！' });
        });
    });
});
