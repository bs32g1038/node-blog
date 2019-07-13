import config from '../src/configs/index.config';
import * as mongoose from 'mongoose';

module.exports = async () => {
    const conn = mongoose.createConnection(config.test_db.uri);
    await conn.dropDatabase();
};
