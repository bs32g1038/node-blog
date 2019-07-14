import Head from 'next/head';
import React from 'react';
import { fetchArticles } from '../../api/article';
import { Articles } from '../../components/articles';
import siteInfo from '../../config/site-info';
import AppLayout from '../../layouts/app';
import { fetchCategories } from '../../redux/reducers/categories';
import { isServer } from '../../utils/helper';

const Page = (props: any) => {
    return (
        <AppLayout>
            <Head>
                <title>{siteInfo.name + '-博客'}</title>
            </Head>
            <Articles articles={props.articles}></Articles>
        </AppLayout>
    );
};

Page.getInitialProps = async({ reduxStore, req }: any) => {

    if (!isServer) { return {}; }

    await reduxStore.dispatch(fetchCategories());
    const as = await fetchArticles(req.query.page, req.query.limit, { cid: req.query.cid });
    return {
        articles: as.items
    };
};

export default Page;