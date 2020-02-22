import { BadRequestException } from '@nestjs/common';

export const checkEntityIsValid = (data = {}, joiSchema = {}, skipFields: string[] = []) => {
    const rs = Object.keys(joiSchema).every(key => {
        for (const field of skipFields) {
            if (key === field) {
                return true;
            }
        }
        return data[key];
    });
    if (!rs) {
        throw new BadRequestException('create comment 错误的数据结构，应该包含' + Object.keys(joiSchema).join(','));
    }
};
