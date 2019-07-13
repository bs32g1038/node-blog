import { MongooseModule } from '@nestjs/mongoose';
import config from '../configs/index.config';

export const DatabaseModule = MongooseModule.forRoot(config.db.uri, { useNewUrlParser: true });
