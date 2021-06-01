import React from 'react';
import Head from 'next/head';
import { Flex, Box } from '@chakra-ui/react';
import Categories from '../categories';
import Empty from '../empty';
import ArticleItem from './item';
import {Pagination} from '@blog/client/web/components/pagination';
import AppLayout from '@blog/client/web/layouts/app';
import { useFetchArticles } from '@blog/client/web/hooks/useFetchArticles';
import { fetchArticles } from '@blog/client/redux/reducers/articles';
import { fetchCategories } from '@blog/client/redux/reducers/categories';
import { isServer } from '@blog/client/web/utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import ListStyleLoader from './list-style-loader';

const Page = () => {
    const { page, items, totalCount, isLoading, limit } = useFetchArticles();
    const config = useSelector((state: RootState) => state.app.config);
    return (
        <AppLayout>
            <Head>
                <title>{config.siteTitle + '-博客'}</title>
            </Head>
            <Categories></Categories>
            <Box>
                {isLoading &&
                    new Array(limit)
                        .fill('')
                        .map((item, index) => (
                            <ListStyleLoader key={`article-item-loading-${index}`}></ListStyleLoader>
                        ))}
                {!isLoading && items.length <= 0 ? (
                    <Box mt={5}>
                        <Empty />
                    </Box>
                ) : (
                    items.map((item: any) => <ArticleItem item={item} key={item._id}></ArticleItem>)
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
