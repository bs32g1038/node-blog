import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios from '@blog/client/web/utils/axios';
import { AxiosRequestConfig, AxiosError } from 'axios';

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axios({ url, method, data, params });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: { status: err.response?.status, data: err.response?.data },
            };
        }
    };

interface Iconfig {
    projectGithub: string;
    siteMetaDescription: string;
    siteMetaKeyWords: string;
    siteTitle: string;
    siteIcp: string;
    siteDomain: string;
    icpGovCn: string;
    siteLogo: string;
    email: string;
    github: string;
}

export interface IComment {
    readonly isCanDeleted: boolean;
    readonly _id: string;
    readonly user: {
        username: string;
        avatar: string;
        type: string;
    };
    readonly reply: IComment;
    readonly content: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly likes: string[];
    readonly browser: string;
    readonly article: { _id: string } | string;
    readonly comments?: IComment[];
}

interface CategoryQueryDataLoaded {
    _id: string;
    name: string;
    order: number;
    articleCount: number;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    viewsCount: number;
}

interface DayReadings {
    _id: string;
    count: number;
    timestamp: string;
}

interface ArticleQueryDataLoaded {
    _id: string;
    title: string;
    summary: string;
    screenshot: string;
    commentCount: number;
    viewsCount: number;
    isDraft: boolean;
    dayReadings: DayReadings[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
    category: CategoryQueryDataLoaded;
}

interface ArticlesQueryDataLoaded {
    items: ArticleQueryDataLoaded[];
    totalCount: number;
}

interface CommentQueryDataLoaded {
    items: IComment[];
    totalCount: number;
}

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        fetchConfig: builder.query<Iconfig, void>({
            query: () => ({ url: `/api/configs`, method: 'get' }),
        }),
        fetchRecentArticles: builder.query<ArticleQueryDataLoaded[], void>({
            query: () => ({ url: `/api/recentArticles`, method: 'get' }),
        }),
        fetchArticle: builder.query<ArticleQueryDataLoaded, string | string[]>({
            query: (id) => ({ url: '/api/articles/' + id, method: 'get' }),
        }),
        fetchComments: builder.query<CommentQueryDataLoaded, string | string[]>({
            query: (id) => ({ url: `/api/comments?articleId=${id}`, method: 'get' }),
        }),
        fetchCategories: builder.query<CategoryQueryDataLoaded[], void>({
            query: () => ({ url: `/api/categories`, method: 'get' }),
        }),
        fetchArticles: builder.query<
            ArticlesQueryDataLoaded,
            {
                page?: number;
                limit?: number;
                filter?: { cid?: string; tag?: string };
            }
        >({
            query: (params) => {
                const { page = 1, limit = 10, filter = { cid: '', tag: '' } } = params;
                const query = { limit, page };
                if (filter.cid) {
                    Object.assign(query, {
                        cid: filter.cid,
                    });
                } else if (filter.tag) {
                    Object.assign(query, {
                        tag: filter.tag,
                    });
                }
                return { url: '/api/articles', method: 'get', params: query };
            },
        }),
        fetchConfigSvg: builder.query<any, { url: string }>({
            query: (params) => ({ url: params.url.replace('/api', ''), method: 'get' }),
        }),
        searchArticles: builder.query<any, { key: string }>({
            query: (params) => ({
                url: '/api/search',
                method: 'get',
                params,
            }),
        }),
        postComment: builder.mutation<any, { url: string; data: any }>({
            query: (params) => ({
                url: params.url,
                method: 'post',
                data: params.data,
            }),
        }),
        likeComment: builder.query<any, { id: string }>({
            query: (params) => ({
                url: '/api/like-comment/' + params.id,
                method: 'post',
            }),
        }),
        deleteComment: builder.mutation<any, { id: string }>({
            query: (params) => ({
                url: '/api/comments/' + params.id,
                method: 'delete',
            }),
        }),
        authLogin: builder.mutation<any, { email: string; password: string; captcha: string }>({
            query: (data) => ({
                url: '/api/user/auth/login',
                method: 'post',
                data,
            }),
        }),
        register: builder.mutation<any, { email: string; password: string; emailCode: string }>({
            query: (data) => ({
                url: '/api/user/auth/signup',
                method: 'post',
                data,
            }),
        }),
        registerSendEmail: builder.mutation<any, { email: string; captcha: string }>({
            query: (data) => ({
                url: '/api/user/auth/email',
                method: 'post',
                data,
            }),
        }),
    }),
});

export const {
    useFetchCategoriesQuery,
    useFetchCommentsQuery,
    useFetchArticleQuery,
    useFetchRecentArticlesQuery,
    useFetchArticlesQuery,
    useLazyFetchArticlesQuery,
    useFetchConfigQuery,
    useFetchConfigSvgQuery,
    useLazySearchArticlesQuery,
    useLazyLikeCommentQuery,
    useDeleteCommentMutation,
    useAuthLoginMutation,
    useRegisterMutation,
    useRegisterSendEmailMutation,
    usePostCommentMutation,
} = appApi;

export const {
    fetchConfig,
    fetchArticles,
    fetchCategories,
    fetchArticle,
    fetchComments,
    fetchRecentArticles,
    fetchConfigSvg,
} = appApi.endpoints;
