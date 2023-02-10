import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAdminLogs: build.mutation<any, { limit: number; page: number }>({
            query: (params) => ({
                url: '/admin-logs',
                method: 'get',
                params,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useFetchAdminLogsMutation } = indexApi;
