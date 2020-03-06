import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { fetchArticle, fetchRecentArticle } from '@blog/client/redux/reducers/article';
import ArticleItem from './article-item';
import WidgetArea from './widget-area';
import AppLayout from '@blog/client/web/layouts/app';
import { Flex } from '@chakra-ui/core';
import { isServer } from '@blog/client/web/utils/helper';

const Page = () => {
    const config = useSelector((state: RootState) => state.app.config);
    const { article, comments, recentArticles } = useSelector((state: RootState) => state.article);
    return (
        <AppLayout>
            <Flex>
                <Head>
                    <title>{article.title + ' - ' + config.siteTitle}</title>
                </Head>
                <ArticleItem article={article} comments={comments}></ArticleItem>
                <WidgetArea recentArticles={recentArticles.slice(0, 5)}></WidgetArea>
            </Flex>
        </AppLayout>
    );
};

Page.getInitialProps = async ({ reduxStore, req }: any) => {
    try {
        await reduxStore.dispatch(fetchArticle(req.params.id));
        await reduxStore.dispatch(fetchRecentArticle());
    } catch (error) {
        //
    }
    return { isServer };
};

export default Page;
