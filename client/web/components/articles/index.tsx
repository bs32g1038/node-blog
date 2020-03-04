import React from 'react';
import Head from 'next/head';
import { Flex, Box } from '@chakra-ui/core';
import Categories from '../categories';
import Empty from '../empty';
import ArticleItem from './item';
import Pagination from '@blog/client/web/components/pagination';
import AppLayout from '@blog/client/web/layouts/app';
import siteInfo from '@blog/client/web/config/site-info';
import { useFetchArticles } from '@blog/client/web/hooks/useFetchArticles';
import { fetchArticles } from '@blog/client/web/redux/reducers/articles';
import { fetchCategories } from '@blog/client/web/redux/reducers/categories';
import { isServer } from '@blog/client/web/utils/helper';

const Page = () => {
    const { page, items, totalCount, isLoading, limit } = useFetchArticles();
    return (
        <AppLayout>
            <Head>
                <title>{siteInfo.name + '-博客'}</title>
            </Head>
            <Categories></Categories>
            <Box>
                {items.map((item: any, index: number) => (
                    <ArticleItem
                        loading={isLoading}
                        item={item}
                        key={item ? item._id : `article-item-loading-${index}`}
                    ></ArticleItem>
                ))}
                {items.length <= 0 && (
                    <Box mt={5}>
                        <Empty />
                    </Box>
                )}
            </Box>
            {totalCount > 0 && (
                <Flex justifyContent="center" mt={5}>
                    <Pagination current={page} pageSize={limit} total={totalCount}></Pagination>
                </Flex>
            )}
        </AppLayout>
    );
};

Page.getInitialProps = async ({ reduxStore, req }: any) => {
    if (!isServer) {
        return { isServer };
    }
    try {
        await reduxStore.dispatch(fetchCategories());
        const { page = 1, cid = '', tag = '' } = req && req.query;
        await reduxStore.dispatch(fetchArticles(Number(page), { cid, tag }));
    } catch (err) {
        //
    }
    return { isServer };
};

export default Page;
