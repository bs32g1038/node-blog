import Head from 'next/head';
import React from 'react';
import { wrapper } from '@blog/client/redux/store';
import ArticleItem from './article-item';
import WidgetArea from './widget-area';
import AppLayout from '@blog/client/web/layouts/app';
import {
    fetchArticle,
    fetchComments,
    fetchRecentArticles,
    useFetchArticleQuery,
    useFetchCommentsQuery,
    useFetchConfigQuery,
    useFetchRecentArticlesQuery,
} from '@blog/client/web/api';
import { useRouter } from 'next/router';

const Page = () => {
    const router = useRouter();
    const { data: config } = useFetchConfigQuery();
    const { data: article } = useFetchArticleQuery(router.query.id as string);
    const {
        data: { items: comments },
    } = useFetchCommentsQuery(router.query.id as string);
    const { data: recentArticles = [] } = useFetchRecentArticlesQuery();
    return (
        <AppLayout>
            <div style={{ display: 'flex' }}>
                <Head>
                    <title>{article.title + ' - ' + config.siteTitle}</title>
                </Head>
                <ArticleItem article={article} comments={comments}></ArticleItem>
                <WidgetArea recentArticles={recentArticles.slice(0, 5)}></WidgetArea>
            </div>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { id } = context.query;
    await store.dispatch(fetchArticle.initiate(id));
    await store.dispatch(fetchComments.initiate(id));
    await store.dispatch(fetchRecentArticles.initiate());
    return {
        props: {},
    };
});

export default Page;
