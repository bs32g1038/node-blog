export * from './schemas/object-id-schema';
export * from './schemas/standard-pagination-schema';

import Joi from './joi';

/**
 * 字符串，范围0-255，非必须
 */
const JoiCharSchema = Joi.string().max(255);

export { JoiCharSchema };

export default Joi;
