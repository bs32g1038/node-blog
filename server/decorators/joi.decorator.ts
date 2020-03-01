import { Param, Query, Body } from '@nestjs/common';
import { JoiValidationPipe } from '../pipes/joi.validation.pipe';

export const JoiParam = (schema: object) => Param(JoiValidationPipe(schema));

export const JoiQuery = (schema: object) => Query(JoiValidationPipe(schema));

export const JoiBody = (schema: object, options?: { method: string }) => Body(JoiValidationPipe(schema, options));
