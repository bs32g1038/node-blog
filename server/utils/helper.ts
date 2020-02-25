import { BadRequestException } from '@nestjs/common';

export const checkEntityIsValid = (data = {}, joiSchema = {}, skipFields: string[] = []) => {
    const obj = {};
    const rs = Object.keys(joiSchema).every(key => {
        for (const field of skipFields) {
            if (key === field) {
                return true;
            }
        }
        if (data[key]) {
            Object.assign(obj, {
                [key]: data[key],
            });
        }
        return data[key];
    });
    if (!rs) {
        throw new BadRequestException('错误的数据结构，应该包含' + Object.keys(joiSchema).join(','));
    }
    return obj;
};
