import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const getMongooseModule = (name: string, schema: mongoose.Schema<any>) =>
    MongooseModule.forFeature([{ name, schema }]);
