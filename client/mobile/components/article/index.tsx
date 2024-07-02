import Head from 'next/head';
import React from 'react';
import { wrapper } from '@blog/client/redux/store';
import ArticleItem from './article-item';
import AppLayout from '@blog/client/mobile/layouts/app';
import { fetchArticle, useFetchArticleQuery, useFetchConfigQuery } from '@blog/client/web/api';
import { useRouter } from 'next/router';

const Page = (props: any) => {
    wrapper.useHydration(props);
    const router = useRouter();
    const { data: config } = useFetchConfigQuery();
    const { data: article } = useFetchArticleQuery(router.query.id as string);
    return (
        <AppLayout>
            <Head>
                <title>{article?.title + ' - ' + config?.siteTitle}</title>
            </Head>
            <ArticleItem article={article}></ArticleItem>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { id } = context.query;
    await store.dispatch(fetchArticle.initiate(id as string));
    return {
        props: {},
    };
});

export default Page;
