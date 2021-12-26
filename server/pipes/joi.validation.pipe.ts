import Joi from '../joi';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Schema } from 'joi';
import { isEmpty } from 'lodash';

interface Options {
    method?: string;
}

@Injectable()
export class JoiValidationPipeTransform implements PipeTransform {
    public constructor(private readonly schema: object, private readonly options: Options = {}) {}

    public transform(data: any) {
        let joiObject: Schema = Joi.object(this.schema);

        if (!isEmpty(this.options.method)) {
            joiObject = joiObject.tailor(this.options.method);
        }

        const { error, value } = joiObject.validate(data, { allowUnknown: false });
        if (error) {
            throw new BadRequestException('Validation failed: ' + error);
        }
        return value;
    }
}

export const JoiValidationPipe = (schema: object, options?: Options) => new JoiValidationPipeTransform(schema, options);
