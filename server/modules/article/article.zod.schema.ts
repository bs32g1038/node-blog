import mongoose from 'mongoose';
import { z } from 'zod';

export const createArticleZodSchema = z.object({
    title: z.string().trim().min(1).max(80),
    content: z.string().trim().min(1).max(15000),
    screenshot: z.string().trim().max(100),
    category: z.custom<mongoose.Types.ObjectId>(),
    tags: z.array(z.string().trim()).max(3).default([]),
});

export type CreateArticleDto = z.infer<typeof createArticleZodSchema>;

export const updateArticleZodSchema = z.object({
    title: z.string().trim().min(1).max(80),
    content: z.string().trim().min(1).max(15000),
    screenshot: z.string().trim().max(100),
    category: z.custom<mongoose.Types.ObjectId>(),
    tags: z.array(z.string().trim()).max(3),
});

export type UpdateArticleDto = z.infer<typeof updateArticleZodSchema>;

export const requestArticlesZodSchema = z
    .object({
        tag: z.string().trim().min(1).max(20),
        title: z.string().trim().min(1).max(80),
        category: z.custom<mongoose.Types.ObjectId>(),
        page: z.number({ coerce: true }).min(1).max(100).default(1),
        limit: z.number({ coerce: true }).min(10).max(1000).default(10),
    })
    .partial();

export type RequestArticlesDto = z.infer<typeof requestArticlesZodSchema>;
