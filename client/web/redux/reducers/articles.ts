import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import * as api from '../../api/article';

const LIMIT = 10;

interface State {
    cache?: {};
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

interface CacheDataLoaded {
    key: string;
    data: {};
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

export const getArticlesCacheKey = (page?: number, filter: { cid: string; tag: string } = { cid: '', tag: '' }) => {
    return page + '#' + LIMIT + '#' + filter.cid + '#' + filter.tag;
};

/**
 * 该函数具有缓存数据功能，根据page，limit，以及filter组合成缓存key
 */
export const fetchArticles = (page?: number, filter: { cid: string; tag: string } = { cid: '', tag: '' }) => {
    return (dispatch: Dispatch<PayloadAction<any>>) => {
        dispatch(setLoading({ isLoading: true }));
        return api.fetchArticles(page, LIMIT, filter).then(res => {
            const items = res.items;
            const totalCount = res.totalCount;
            const data = {
                items,
                totalCount,
                key: getArticlesCacheKey(page, filter),
            };
            dispatch(setDataInCache(data));
            dispatch(setLoading({ isLoading: false }));
        });
    };
};
