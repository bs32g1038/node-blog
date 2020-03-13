import mongoose from 'mongoose';

export const getObjectId = () => {
    return mongoose.Types.ObjectId();
};
