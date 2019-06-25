import { MongooseModule } from '@nestjs/mongoose';
import config from '../../src/configs/index.config';

export const DatabaseModule = MongooseModule.forRoot(config.test_db.uri, { useNewUrlParser: true });
