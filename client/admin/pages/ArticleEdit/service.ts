import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        createDrfat: build.mutation<any, any>({
            query: (data) => ({
                url: '/drafts',
                method: 'post',
                data,
            }),
        }),
        fetchDrfats: build.mutation<any, { limit: number; page: number }>({
            query: () => ({
                url: '/drafts?type=article',
                method: 'get',
            }),
        }),
        fetchDrfat: build.mutation<any, any>({
            query: (id) => ({
                url: '/drafts/' + id,
                method: 'get',
            }),
        }),
        updateDrfat: build.mutation<any, { id: string; data: any }>({
            query: (data) => ({
                url: '/drafts/' + data.id,
                method: 'put',
                data: { data: data.data },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateDrfatMutation, useUpdateDrfatMutation, useFetchDrfatMutation, useFetchDrfatsMutation } =
    indexApi;
