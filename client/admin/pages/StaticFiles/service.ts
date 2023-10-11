import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchStaticFiles: build.mutation<{ items: any[]; totalCount: number }, { limit: number; page: number }>({
            query: (params) => ({
                url: '/files',
                method: 'get',
                params,
            }),
        }),
        deleteFile: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/files/' + params.id,
                method: 'delete',
            }),
        }),
        deleteFiles: build.mutation<any, { fileIds: string[] }>({
            query: (data) => ({
                url: '/files',
                method: 'delete',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useFetchStaticFilesMutation, useDeleteFileMutation, useDeleteFilesMutation } = indexApi;
