import mongoose from 'mongoose';
import { z } from 'zod';

export const createCommentZodSchema = z
    .object({
        article: z.string().refine(mongoose.Types.ObjectId.isValid),
        user: z.string().refine(mongoose.Types.ObjectId.isValid),
        reply: z.string().refine(mongoose.Types.ObjectId.isValid).nullable(),
        parentId: z.string().refine(mongoose.Types.ObjectId.isValid),
        content: z.string().min(1).max(500),
        browser: z.string(),
        os: z.string(),
        ip: z.string(),
    })
    .partial()
    .required({
        article: true,
        content: true,
    });

export type CreateCommentDto = z.infer<typeof createCommentZodSchema>;
