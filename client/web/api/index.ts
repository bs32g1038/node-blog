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
    readonly _id: string;
    readonly nickName: string;
    readonly email: string;
    readonly website: string;
    readonly reply: IComment;
    readonly location: string;
    readonly pass: boolean;
    readonly content: string;
    readonly identity: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly article: { _id: string } | string;
    readonly comments?: {
        items: IComment[];
    };
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

interface ExploreDataLoaded {
    _id: string;
    content: string;
    links: {
        title: string;
        link: string;
    }[];
    pics: string[];
    createdAt: string;
}

interface IExploreReponse {
    items: ExploreDataLoaded[];
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
        fetchExplore: builder.query<IExploreReponse, void>({
            query: () => ({ url: `/api/explore`, method: 'get' }),
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
    }),
});

export const {
    useFetchCategoriesQuery,
    useFetchCommentsQuery,
    useFetchArticleQuery,
    useFetchRecentArticlesQuery,
    useFetchArticlesQuery,
    useFetchConfigQuery,
    useFetchExploreQuery,
    useFetchConfigSvgQuery,
    useLazySearchArticlesQuery,
} = appApi;

export const {
    fetchConfig,
    fetchArticles,
    fetchCategories,
    fetchArticle,
    fetchComments,
    fetchRecentArticles,
    fetchExplore,
    fetchConfigSvg,
} = appApi.endpoints;
