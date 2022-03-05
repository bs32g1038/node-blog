import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import paginate from '../mongoose/paginate';

export const getMongooseModule = (name: string, schema: mongoose.Schema<any>) =>
    MongooseModule.forFeatureAsync([
        {
            name,
            useFactory: () => {
                schema.plugin(paginate);
                return schema;
            },
        },
    ]);
