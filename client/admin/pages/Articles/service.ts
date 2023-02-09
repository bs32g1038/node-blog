import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchArticles: build.query<any, { limit: number; page: number; title?: string }>({
            query: (params) => ({
                url: '/articles',
                method: 'get',
                params,
            }),
        }),
        deleteArticle: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/articles/' + params.id,
                method: 'delete',
            }),
        }),
        deleteArticles: build.mutation<any, { articleIds: string[] }>({
            query: (data) => ({
                url: '/articles',
                method: 'delete',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLazyFetchArticlesQuery, useDeleteArticleMutation, useDeleteArticlesMutation } = indexApi;
