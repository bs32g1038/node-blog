import Joi from '@hapi/joi';
import { PipeTransform, Injectable, BadRequestException, UsePipes } from '@nestjs/common';

@Injectable()
export class JoiValidationPipeTransform implements PipeTransform {
    public constructor(private readonly schema: Joi.ObjectSchema) {}

    public transform(value: any) {
        const { error } = this.schema.validate(value, { allowUnknown: true });
        if (error) {
            throw new BadRequestException('Validation failed' + error);
        }
        return value;
    }
}

export const JoiValidationPipe = (schema: Joi.ObjectSchema) => UsePipes(new JoiValidationPipeTransform(schema));
