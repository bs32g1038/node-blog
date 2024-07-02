import { Param, Query, Body } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';
import { ZodSchema } from 'zod';

export const ZodParam = (schema: ZodSchema) => Param(new ZodValidationPipe(schema));

export const ZodQuery = (schema: ZodSchema) => Query(new ZodValidationPipe(schema));

export const ZodBody = (schema: ZodSchema) => Body(new ZodValidationPipe(schema));
