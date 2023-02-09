import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAdminConfigs: build.query<any, void>({
            query: () => ({
                url: '/configs/admin',
                method: 'get',
            }),
        }),
        updateAdminConfigs: build.mutation<any, any>({
            query: (data) => ({
                url: '/configs',
                method: 'put',
                data,
            }),
        }),
        testEmail: build.mutation<any, void>({
            query: () => ({
                url: '/email/test',
                method: 'post',
            }),
        }),
        updateEmailConfig: build.mutation<any, any>({
            query: (data) => ({
                url: '/configs',
                method: 'put',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLazyFetchAdminConfigsQuery,
    useUpdateAdminConfigsMutation,
    useTestEmailMutation,
    useUpdateEmailConfigMutation,
} = indexApi;
