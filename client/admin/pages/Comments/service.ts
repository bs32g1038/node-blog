import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchComments: build.mutation<{ items: any[]; totalCount: number }, { limit: number; page: number }>({
            query: () => ({
                url: '/admin-comments',
                method: 'get',
            }),
        }),
        deleteComment: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/comments/' + params.id,
                method: 'delete',
            }),
        }),
        deleteComments: build.mutation<any, { commentIds: string[] }>({
            query: (data) => ({
                url: '/comments',
                method: 'delete',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useFetchCommentsMutation, useDeleteCommentMutation, useDeleteCommentsMutation } = indexApi;
