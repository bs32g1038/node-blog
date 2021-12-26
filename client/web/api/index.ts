import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import queryString from 'query-string';
import axios from '@blog/client/web/utils/axios';
import { AxiosRequestConfig, AxiosError } from 'axios';

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data }) => {
        try {
            const result = await axios({ url, method, data });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError as AxiosError;
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

interface IComment {
    readonly _id?: string;
    readonly nickName?: string;
    readonly email?: string;
    readonly website?: string;
    readonly reply?: IComment;
    readonly article?: string;
    readonly location?: string;
    readonly pass?: boolean;
    readonly content?: string;
    readonly identity?: number;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
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

interface ArticleQueryDataLoaded {
    _id: string;
    title: string;
    summary: string;
    screenshot: string;
    commentCount: number;
    viewsCount: number;
    isDraft: boolean;
    dayReadings: any[];
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
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        fetchConfig: builder.query<Iconfig, void>({
            query: () => ({ url: `/configs`, method: 'get' }),
        }),
        fetchRecentArticles: builder.query<ArticleQueryDataLoaded[], void>({
            query: () => ({ url: `/recentArticles`, method: 'get' }),
        }),
        fetchArticle: builder.query<ArticleQueryDataLoaded, string | string[]>({
            query: (id) => ({ url: '/articles/' + id, method: 'get' }),
        }),
        fetchComments: builder.query<CommentQueryDataLoaded, string | string[]>({
            query: (id) => ({ url: `/comments?articleId=${id}`, method: 'get' }),
        }),
        fetchCategories: builder.query<CategoryQueryDataLoaded[], void>({
            query: () => ({ url: `/categories`, method: 'get' }),
        }),
        fetchArticlesAggregationMapDate: builder.query<any, void>({
            query: () => ({ url: `/articles-aggregation/date`, method: 'get' }),
        }),
        fetchArticles: builder.query<
            ArticlesQueryDataLoaded,
            {
                page?: string | number | string[];
                limit?: string | number | string[];
                filter?: { cid?: string | string[]; tag?: string | string[] };
            }
        >({
            query: (params) => {
                const { page = 1, limit = 10, filter = { cid: '', tag: '' } } = params;
                const query: any = { limit, page };
                if (filter.cid) {
                    query.cid = filter.cid;
                } else if (filter.tag) {
                    query.tag = filter.tag;
                }
                return { url: `/articles?${queryString.stringify(query)}`, method: 'get' };
            },
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useFetchCategoriesQuery,
    useFetchCommentsQuery,
    useFetchArticleQuery,
    useFetchRecentArticlesQuery,
    useFetchArticlesQuery,
    useFetchConfigQuery,
    useFetchArticlesAggregationMapDateQuery,
} = appApi;

export const { fetchConfig, fetchArticles, fetchCategories, fetchArticle, fetchComments, fetchRecentArticles } =
    appApi.endpoints;

export const searchArticles = (key: string) => {
    return axios.get('/search?key=' + key);
};
