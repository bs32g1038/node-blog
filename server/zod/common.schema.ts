import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdSchema = z.object({
    id: z.custom<mongoose.Types.ObjectId>(),
});

export const objectIdsSchema = z.object({
    ids: z.array(z.custom<mongoose.Types.ObjectId>()),
});

export const standardPaginationSchema = z.object({
    page: z.number({ coerce: true }).min(1).max(100).default(1),
    limit: z.number({ coerce: true }).min(10).max(1000).default(10),
});

export type StandardPaginationDto = z.infer<typeof standardPaginationSchema>;
