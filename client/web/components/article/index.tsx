import Head from 'next/head';
import React from 'react';
import { wrapper } from '@blog/client/redux/store';
import ArticleItem from './article-item';
import AppLayout from '@blog/client/web/layouts/app';
import {
    fetchArticle,
    fetchComments,
    useFetchArticleQuery,
    useFetchCommentsQuery,
    useFetchConfigQuery,
} from '@blog/client/web/api';
import { useRouter } from 'next/router';

const Page = (props) => {
    wrapper.useHydration(props);
    const router = useRouter();
    const { data: config } = useFetchConfigQuery();
    const { data: article } = useFetchArticleQuery(router.query.id as string);
    const {
        data: { items: comments },
    } = useFetchCommentsQuery(router.query.id as string);
    return (
        <AppLayout>
            <Head>
                <title>{article.title + ' - ' + config.siteTitle}</title>
            </Head>
            <ArticleItem article={article} comments={comments}></ArticleItem>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { id } = context.query;
    await store.dispatch(fetchArticle.initiate(id));
    await store.dispatch(fetchComments.initiate(id));
    return {
        props: {},
    };
});

export default Page;
