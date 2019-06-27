import styled from '@emotion/styled';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { fetchArticle, fetchRecentArticle, State } from '../../redux/reducers/article';
import ArticleBottomGroup from './article-bottom-group';
import ArticleItem from './article-item';
import WidgetArea from './widget-area';

const ArticleWrap = styled.div`
    background-color: #fff;
    display: flex;
`;

export const asyncData = (store: any, route: any) => {
    const id = route.params.id;
    return store.dispatch(fetchArticle(id)).then(() => {
        if (!store._DB || store._DB.length <= 0) {
            return store.dispatch(fetchRecentArticle());
        }
    });
};

const C = (props: any) => {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const { _id } = props._DB.article;
        if (_id !== props.match.params.id) {
            const q = queryString.parse(location.search);
            setLoading(true);
            setTimeout(() => {
                asyncData({ dispatch: props.dispatch, _DB: props._DB }, {
                    query: q,
                    params: props.match.params
                }).then(() => {
                    setLoading(false);
                });
            }, 250);
        }
    }, [props.match.params.id]);
    const { article, comments, recentArticles } = props._DB;
    return (
        <>
            <ArticleWrap>
                <Helmet title={article.title + ' - ' + siteInfo.name}></Helmet>
                <ArticleItem loading={isLoading} article={article} comments={comments} location={props.location}></ArticleItem>
                <WidgetArea recentArticles={recentArticles.slice(0, 5)}></WidgetArea>
            </ArticleWrap>
            <ArticleBottomGroup recentArticles={recentArticles.slice(5, 9)}></ArticleBottomGroup>
        </>
    );
};

export const Article = connect(
    (state: State) => ({
        _DB: state.article
    })
)(C as any);