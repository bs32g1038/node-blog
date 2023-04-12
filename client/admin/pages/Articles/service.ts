import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchArticles: build.mutation<any, { limit: number; page: number; title?: string }>({
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
        createArticle: build.mutation<any, any>({
            query: (data) => ({
                url: '/articles',
                method: 'post',
                data,
            }),
        }),
        updateArticle: build.mutation<any, { id: string; data: any }>({
            query: (data) => ({
                url: '/articles/' + data.id,
                method: 'put',
                data: data.data,
            }),
        }),
        fetchArticle: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/articles/' + params.id,
                method: 'get',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useFetchArticlesMutation,
    useDeleteArticleMutation,
    useDeleteArticlesMutation,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useFetchArticleMutation,
} = indexApi;
