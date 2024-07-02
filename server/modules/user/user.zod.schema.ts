import { z } from 'zod';

export const userInfoZodSchema = z.object({
    avatar: z.string(),
    username: z.string(),
    email: z.string().email(),
});

export type UserInfoDto = z.infer<typeof userInfoZodSchema>;

export const userEmailCheckZodSchema = z.object({
    email: z.string().email(),
    captcha: z.string(),
});

export type UserEmailCheckDto = z.infer<typeof userEmailCheckZodSchema>;

export const userRegisterZodSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    emailCode: z.string(),
});

export type UserRegisterDto = z.infer<typeof userRegisterZodSchema>;

export const userLoginZodSchema = z
    .object({
        email: z.string().email(),
        account: z.string(),
        password: z.string(),
        captcha: z.string(),
        isAdmin: z.boolean(),
    })
    .partial({
        isAdmin: true,
        email: true,
        account: true,
    });

export type UserLoginDto = z.infer<typeof userLoginZodSchema>;

export const requestUsersZodSchema = z
    .object({
        page: z.number({ coerce: true }).min(1).max(100).default(1),
        limit: z.number({ coerce: true }).min(10).max(1000).default(10),
    })
    .partial();

export type RequestUserDto = z.infer<typeof requestUsersZodSchema>;

export const requestUpdateStatusZodSchema = z.object({
    id: z.string(),
    disabled: z.boolean(),
});

export type RequestUpdateStausDto = z.infer<typeof requestUpdateStatusZodSchema>;
