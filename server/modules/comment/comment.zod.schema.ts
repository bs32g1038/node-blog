import mongoose from 'mongoose';
import { z } from 'zod';

export const createCommentZodSchema = z
    .object({
        article: z.custom<mongoose.Types.ObjectId>(),
        user: z.custom<mongoose.Types.ObjectId>(),
        reply: z.custom<mongoose.Types.ObjectId>(),
        parentId: z.custom<mongoose.Types.ObjectId>(),
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
