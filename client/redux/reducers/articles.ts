import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import * as api from '@blog/client/web/api/article';

const LIMIT = 10;

interface State {
    cache?: unknown;
    items?: any[];
    totalCount: number;
    isLoading: boolean;
    limit: number;
}

const initialState: State = {
    items: [],
    totalCount: 0,
    isLoading: false,
    cache: {},
    limit: LIMIT,
};

interface ArticlesDataLoaded {
    items?: any[];
    totalCount: number;
    key: string;
}

interface LoadingDataLoaded {
    isLoading: boolean;
}

const articles = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles(state, action: PayloadAction<ArticlesDataLoaded>) {
            const { items, totalCount } = action.payload;
            state.items = items;
            state.totalCount = totalCount;
        },
        setLoading(state, action: PayloadAction<LoadingDataLoaded>) {
            const { isLoading } = action.payload;
            state.isLoading = isLoading;
        },
        setDataInCache(state, action: PayloadAction<ArticlesDataLoaded>) {
            const { items, totalCount, key } = action.payload;
            state.items = items;
            state.totalCount = totalCount;
            state.cache[key] = {
                items,
                totalCount,
            };
        },
    },
});

export const { setArticles, setLoading, setDataInCache } = articles.actions;

export default articles.reducer;

export const getArticlesCacheKey = (page?: number, filter?: { cid: string; tag: string }) => {
    const { cid = '', tag = '' } = filter;
    return page + '#' + LIMIT + '#' + cid + '#' + tag;
};

/**
 * 该函数具有缓存数据功能，根据page，limit，以及filter组合成缓存key
 */
export const fetchArticles = (page?: number, filter?: { cid: string; tag: string }) => {
    const { cid = '', tag = '' } = filter;
    return (dispatch: Dispatch<PayloadAction<any>>) => {
        dispatch(setLoading({ isLoading: true }));
        return api.fetchArticles(page, LIMIT, { cid, tag }).then((res) => {
            const items = res.items;
            const totalCount = res.totalCount;
            const data = {
                items,
                totalCount,
                key: getArticlesCacheKey(page, { cid, tag }),
            };
            dispatch(setDataInCache(data));
            dispatch(setLoading({ isLoading: false }));
        });
    };
};
