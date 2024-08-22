import mongoose from 'mongoose';
import { z } from 'zod';

export const createCategoryZodSchema = z.object({
    name: z.string().trim().min(1).max(80),
});

export type CreateCategoryDto = z.infer<typeof createCategoryZodSchema>;

export const updateCategoryZodSchema = z.object({
    name: z.string().trim().min(1).max(80),
});

export type UpdateCategoryDto = z.infer<typeof createCategoryZodSchema>;

export const requestArticlesZodSchema = z
    .object({
        tag: z.string().trim().min(1).max(20),
        title: z.string().trim().min(1).max(80),
        category: z.string().refine(mongoose.Types.ObjectId.isValid),
        page: z.number().min(1).max(100).default(1),
        limit: z.number().min(10).max(1000).default(10),
    })
    .partial();

export type RequestArticlesDto = z.infer<typeof requestArticlesZodSchema>;

export const objectCategoryIdsSchema = z.object({
    categoryIds: z.array(z.instanceof(mongoose.Types.ObjectId)),
});
