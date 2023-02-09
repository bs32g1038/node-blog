import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<any, { key: string }>({
            query: (data) => ({
                url: '/login',
                method: 'post',
                data,
            }),
        }),
        fetchFirstMessage: build.query<any, void>({
            query: () => ({
                url: '/getFirstLoginInfo',
                method: 'get',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useFetchFirstMessageQuery } = indexApi;
