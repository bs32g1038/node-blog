import Joi from '../joi';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipeTransform implements PipeTransform {
    public constructor(private readonly schema: object) {}

    public transform(data: any) {
        const { error, value } = Joi.object(this.schema).validate(data, { stripUnknown: true });
        if (error) {
            throw new BadRequestException('Validation failed' + error);
        }
        return value;
    }
}

export const JoiValidationPipe = (schema: object) => new JoiValidationPipeTransform(schema);
