import { z } from 'zod';

export const configZodSchema = z
    .object({
        siteTitle: z.string().max(255),
        siteLogo: z.string(),
        siteMetaKeyWords: z.string().max(255),
        siteMetaDescription: z.string().max(255),
        siteIcp: z.string().max(255),
        siteDomain: z.string(),
        isEnableSmtp: z.boolean(),
        smtpHost: z.string(),
        smtpSecure: z.boolean(),
        smtpPort: z.number(),
        smtpAuthUser: z.string(),
        smtpAuthpass: z.string(),
        email: z.string(),
        githubClientId: z.string(),
        githubClientSecret: z.string(),
    })
    .partial();

export type ConfigDto = z.infer<typeof configZodSchema>;
