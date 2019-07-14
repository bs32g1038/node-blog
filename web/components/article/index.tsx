import styled from '@emotion/styled';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import { fetchArticle, fetchRecentArticle, State } from '../../redux/reducers/article';
import media from '../../utils/media';
import ArticleItem from './article-item';
import WidgetArea from './widget-area';

const ArticleWrap = styled.div`
    background-color: #fff;
    display: flex;
    ${media.phone`
        display: block;
    `}
`;

export const asyncData = (store: any, route: any) => {
    const id = route.params.id;
    return store.dispatch(fetchArticle(id)).then(() => {
        return store.dispatch(fetchRecentArticle());
    });
};

interface Props extends RouteComponentProps {
    dispatch: any;
    _DB: State;
    router: any;
}

const fetchData = (props: Props) => {
    const id = props.router.query.id;
    return props.dispatch(fetchArticle(id)).then(() => {
        if (props._DB && props._DB.recentArticles && props._DB.recentArticles.length <= 0) {
            return props.dispatch(fetchRecentArticle());
        }
    });
};

const C = (props: Props) => {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const { _id = '' } = props._DB.article || {};
        if (_id !== props.router.query.id) {
            setLoading(true);
            setTimeout(() => {
                fetchData(props).then(() => {
                    setLoading(false);
                });
            }, 250);
        }
    }, [props.router.query.id]);
    const { article, comments, recentArticles } = props._DB;
    return (
        <>
            <ArticleWrap>
                <Head><title>{article.title + ' - ' + siteInfo.name}</title></Head>
                <ArticleItem loading={isLoading} article={article} comments={comments} location={props.location}></ArticleItem>
                <WidgetArea recentArticles={recentArticles.slice(0, 5)}></WidgetArea>
            </ArticleWrap>
        </>
    );
};

export const Article = connect(
    (state: { article: State, $G: any }) => ({
        _DB: state.article
    })
)(withRouter(C) as any);