import { ZodSchema } from 'zod';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { fromError } from 'zod-validation-error';

interface Options {
    method?: string;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    public constructor(
        private readonly schema: ZodSchema,
        private readonly options: Options = {}
    ) {}

    public transform(value: unknown) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            const validationError = fromError(error);
            throw new BadRequestException(validationError);
        }
    }
}
