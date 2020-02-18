import styled from '@emotion/styled';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { fetchArticle, fetchRecentArticle, State } from '../../redux/reducers/article';
import media from '../../utils/media';
import ArticleItem, { MODE } from './article-item';
import WidgetArea from './widget-area';
import AppLayout from '../../layouts/app';
import { isServer } from '../../utils/helper';

const ArticleWrap = styled.div`
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

interface Props {
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

const CArticle = (props: Props) => {
    const [isLoading, setLoading] = useState(false);
    const [mode, setMode] = useState(MODE.normal);
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
        <AppLayout>
            <ArticleWrap>
                <Head>
                    <title>{article.title + ' - ' + siteInfo.name}</title>
                </Head>
                <ArticleItem
                    getReadMode={(readMode: string) => setMode(readMode)}
                    loading={isLoading}
                    article={article}
                    comments={comments}
                ></ArticleItem>
                {mode !== MODE.reading && <WidgetArea recentArticles={recentArticles.slice(0, 5)}></WidgetArea>}
            </ArticleWrap>
        </AppLayout>
    );
};

CArticle.getInitialProps = async ({ reduxStore, req }: any) => {
    if (!isServer) {
        return {};
    }
    await reduxStore.dispatch(fetchArticle(req.params.id));
    await reduxStore.dispatch(fetchRecentArticle());
    return {};
};

export const Article = connect((state: { article: State; $G: any }) => ({
    _DB: state.article,
}))(withRouter(CArticle) as any);
