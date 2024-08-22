import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchUsers: build.mutation<any, { limit: number; page: number }>({
            query: (params) => ({
                url: '/user/list',
                method: 'get',
                params,
            }),
        }),
        deleteUser: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/user/delete/' + params.id,
                method: 'delete',
            }),
        }),
        deleteUsers: build.mutation<any, { ids: string[] }>({
            query: (data) => ({
                url: '/user/batch',
                method: 'delete',
                data,
            }),
        }),
        updateStatus: build.mutation<any, { id: string; disabled: boolean }>({
            query: (data) => ({
                url: '/user/update-status',
                method: 'put',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useFetchUsersMutation, useDeleteUserMutation, useDeleteUsersMutation, useUpdateStatusMutation } =
    indexApi;
