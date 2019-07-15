import * as Joi from '@hapi/joi';
import { PipeTransform, Injectable, BadRequestException, UsePipes } from '@nestjs/common';

@Injectable()
export class JoiValidationPipeTransform implements PipeTransform {
    public constructor(private readonly schema: object) {}

    public transform(value: any) {
        const { error } = Joi.validate(value, this.schema, { allowUnknown: true });
        if (error) {
            throw new BadRequestException('Validation failed' + error);
        }
        return value;
    }
}

export const JoiValidationPipe = (schema: object) => UsePipes(new JoiValidationPipeTransform(schema));
