import React from 'react';
import { Article } from '../components/article';
import AppLayout from '../layouts/app';
import { fetchArticle, fetchRecentArticle } from '../redux/reducers/article';
import { isServer } from '../utils/helper';

const Page = () => {
    return (
        <AppLayout>
            <Article></Article>
        </AppLayout>
    );
};

Page.getInitialProps = async ({ reduxStore, req }: any) => {
    if (!isServer) {
        return {};
    }

    await reduxStore.dispatch(fetchArticle(req.params.id));
    await reduxStore.dispatch(fetchRecentArticle());
    return {};
};

export default Page;
