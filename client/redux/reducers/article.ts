import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import * as api from '@blog/client/web/api/article';

interface State {
    article:
        | {
              _id: string;
              title: string;
              content: string;
              summary: string;
              screenshot: string;
              category: string;
              commentCount: number;
              viewsCount: number;
              isDeleted: boolean;
          }
        | any;
    comments: any[];
    recentArticles: any[];
    userCommits: any[];
}

const initialState: State = {
    article: {},
    comments: [],
    recentArticles: [],
    userCommits: [],
};

interface ArticleDataLoaded {
    article: {};
    comments: any[];
}

interface RecentArticlesDataLoaded {
    recentArticles: any[];
}

interface ArticlesAggregationMapDateDataLoaded {
    userCommits: any[];
}

const article = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticle(state, action: PayloadAction<ArticleDataLoaded>) {
            const { article, comments } = action.payload;
            state.article = article;
            state.comments = comments;
        },
        setRecentArticles(state, action: PayloadAction<RecentArticlesDataLoaded>) {
            const { recentArticles } = action.payload;
            state.recentArticles = recentArticles;
        },
        setArticlesAggregationMapDate(state, action: PayloadAction<ArticlesAggregationMapDateDataLoaded>) {
            const { userCommits } = action.payload;
            state.userCommits = userCommits;
        },
    },
});

export const { setArticle, setRecentArticles, setArticlesAggregationMapDate } = article.actions;

export default article.reducer;

export const fetchArticle = (id: string) => async (dispatch: Dispatch<PayloadAction<ArticleDataLoaded>>) => {
    const data = await api.fetchArticle(id);
    return dispatch(setArticle({ article: data.article, comments: data.comments }));
};

export const fetchRecentArticle = () => async (dispatch: Dispatch<PayloadAction<RecentArticlesDataLoaded>>) => {
    const data = await api.fetchRecentArticles();
    return dispatch(setRecentArticles({ recentArticles: data }));
};

export const fetchArticlesAggregationMapDate = () => async (
    dispatch: Dispatch<PayloadAction<ArticlesAggregationMapDateDataLoaded>>
) => {
    const data = await api.fetchArticlesAggregationMapDate();
    return dispatch(setArticlesAggregationMapDate({ userCommits: data }));
};
