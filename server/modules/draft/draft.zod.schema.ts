import mongoose from 'mongoose';
import { z } from 'zod';

export const createDraftZodSchema = z.object({
    data: z
        .object({
            category: z.string(),
            content: z.string(),
            id: z.string(),
            screenshot: z.string(),
            tags: z.array(z.string()),
            title: z.string(),
        })
        .partial(),
});

export type CreateDraftDto = z.infer<typeof createDraftZodSchema>;

export const updateDraftZodSchema = z.object({
    data: z
        .object({
            category: z.string(),
            content: z.string(),
            id: z.string(),
            screenshot: z.string(),
            tags: z.array(z.string()),
            title: z.string(),
        })
        .partial(),
});

export type UpdateDraftDto = z.infer<typeof updateDraftZodSchema>;

export const requestDraftsZodSchema = z
    .object({
        tag: z.string().trim().min(1).max(20),
        title: z.string().trim().min(1).max(80),
        category: z.custom<mongoose.Types.ObjectId>(),
        page: z.number({ coerce: true }).min(1).max(100).default(1),
        limit: z.number({ coerce: true }).min(10).max(1000).default(10),
    })
    .partial();

export type RequestDraftsDto = z.infer<typeof requestDraftsZodSchema>;
