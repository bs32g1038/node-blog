import { z } from 'zod';

export const userInfoZodSchema = z.object({
    avatar: z.string(),
    username: z.string(),
    email: z.string().email(),
});

export type UserInfoDto = z.infer<typeof userInfoZodSchema>;
