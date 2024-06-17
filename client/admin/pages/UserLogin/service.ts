import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<any, { account: string; password: string; isAdmin: boolean; captcha: string }>({
            query: (data) => ({
                url: '/user/auth/login',
                method: 'post',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation } = indexApi;
