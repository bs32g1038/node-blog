import mongoose from 'mongoose';

export const getObjectId = () => {
    return new mongoose.Types.ObjectId().toString();
};

/**
 * 获取客户端IP地址
 */
export function getClientIp(req) {
    return (
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        req.ip ||
        ''
    );
}
