import Joi from '../joi';
import { isEmpty } from 'lodash';

export const ObjectIdSchema = {
    id: Joi.objectId(),
};

export const generateObjectIdSchema = (field: string) => {
    if (isEmpty(field)) {
        throw new Error('generate object id schema, field can not empty');
    }
    return {
        [field]: Joi.objectId(),
    };
};

export const generateObjectIdsSchema = (field: string) => {
    if (isEmpty(field)) {
        throw new Error('generate object id schema, field can not empty');
    }
    return {
        [field]: Joi.array().items(Joi.objectId().required()),
    };
};
