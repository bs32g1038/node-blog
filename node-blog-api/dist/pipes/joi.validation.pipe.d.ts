import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class JoiValidationPipeTransform implements PipeTransform {
    private readonly schema;
    constructor(schema: object);
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare const JoiValidationPipe: (schema: object) => (target: any, key?: string, descriptor?: any) => any;
