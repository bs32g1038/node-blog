import Head from 'next/head';
import React from 'react';
import { Articles } from '../components/articles';
import siteInfo from '../config/site-info';
import AppLayout from '../layouts/app';
import { fetchArticles } from '../redux/reducers/articles';
import { fetchCategories } from '../redux/reducers/categories';
import { isServer } from '../utils/helper';

const Page = () => {
    return (
        <AppLayout>
            <Head>
                <title>{siteInfo.name + '-博客'}</title>
            </Head>
            <Articles></Articles>
        </AppLayout>
    );
};

Page.getInitialProps = async({ reduxStore, req }: any) => {

    if (!isServer) { return {}; }

    await reduxStore.dispatch(fetchCategories());
    await reduxStore.dispatch(fetchArticles(req.query.page, req.query.limit, { cid: req.query.cid }));
    return {};
};

export default Page;