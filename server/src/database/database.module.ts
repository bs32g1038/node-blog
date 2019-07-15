import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB } from '../configs/index.config';

export const DatabaseModule = MongooseModule.forRoot(MONGODB.uri, {
    useNewUrlParser: true,
});
