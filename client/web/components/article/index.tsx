import Head from 'next/head';
import React from 'react';
import siteInfo from '../../config/site-info';
import { fetchArticle, fetchRecentArticle } from '../../redux/reducers/article';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ArticleItem from './article-item';
import WidgetArea from './widget-area';
import AppLayout from '../../layouts/app';
import { Flex } from '@chakra-ui/core';

const Page = () => {
    const { article, comments, recentArticles } = useSelector((state: RootState) => state.article);
    return (
        <AppLayout>
            <Flex>
                <Head>
                    <title>{article.title + ' - ' + siteInfo.name}</title>
                </Head>
                <ArticleItem article={article} comments={comments}></ArticleItem>
                <WidgetArea recentArticles={recentArticles.slice(0, 5)}></WidgetArea>
            </Flex>
        </AppLayout>
    );
};

Page.getInitialProps = async ({ reduxStore, req }: any) => {
    await reduxStore.dispatch(fetchArticle(req.params.id));
    await reduxStore.dispatch(fetchRecentArticle());
    return {};
};

export default Page;
