import test from 'ava';
import axios from 'axios';

test('GET /api/article/:id', async t => {
    let res = await axios.get('/api/article/57d94c7f710c6aac7d5f2588');
    t.is(res.data.data.article._id, "57d94c7f710c6aac7d5f2588");
});