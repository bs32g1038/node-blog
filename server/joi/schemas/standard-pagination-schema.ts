import Joi from '../joi';

export const StandardPaginationSchema = {
    page: Joi.number().default(1).min(1).max(100),
    limit: Joi.number().default(10).min(10).max(1000),
};
