import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAdminLogs: build.query<any, { limit: number; page: number }>({
            query: (params) => ({
                url: '/admin-logs',
                method: 'get',
                params,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLazyFetchAdminLogsQuery } = indexApi;
