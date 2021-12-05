import mongoose from 'mongoose';

export const getObjectId = () => {
    return new mongoose.Types.ObjectId().toString();
};
