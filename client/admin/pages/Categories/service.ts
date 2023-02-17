import { adminApi } from '@blog/client/admin/api';

export const indexApi = adminApi.injectEndpoints({
    endpoints: (build) => ({
        fetchCategories: build.mutation<any, { limit: number; page: number }>({
            query: () => ({
                url: '/categories',
                method: 'get',
            }),
        }),
        fetchCategory: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/categories/' + params.id,
                method: 'get',
            }),
        }),
        createCategory: build.mutation<any, any>({
            query: (data) => ({
                url: '/categories',
                method: 'post',
                data,
            }),
        }),
        updateCategory: build.mutation<any, { id: string; data: any }>({
            query: (params) => ({
                url: '/categories/' + params.id,
                method: 'put',
                data: params.data,
            }),
        }),
        deleteCategory: build.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/categories/' + params.id,
                method: 'delete',
            }),
        }),
        deleteCategories: build.mutation<any, { categoryIds: string[] }>({
            query: (data) => ({
                url: '/categories',
                method: 'delete',
                data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useFetchCategoriesMutation,
    useFetchCategoryMutation,
    useDeleteCategoryMutation,
    useDeleteCategoriesMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} = indexApi;
