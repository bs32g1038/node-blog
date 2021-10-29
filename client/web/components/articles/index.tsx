import React, { useEffect } from 'react';
import Head from 'next/head';
import Categories from '../categories';
import ArticleItem from './item';
import AppLayout from '@blog/client/web/layouts/app';
import { useFetchArticles } from '@blog/client/web/hooks/useFetchArticles';
import { fetchArticles } from '@blog/client/redux/reducers/articles';
import { fetchCategories } from '@blog/client/redux/reducers/categories';
import { isServer } from '@blog/client/web/utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { Empty, Skeleton, Pagination } from 'antd';
import Link from '../link';

const Page = () => {
    const { page, items, totalCount, isLoading, limit } = useFetchArticles();
    const config = useSelector((state: RootState) => state.app.config);
    return (
        <AppLayout>
            <Head>
                <title>{config.siteTitle + '-博客'}</title>
            </Head>
            <Categories></Categories>
            <>
                {isLoading &&
                    new Array(limit).fill('').map((item, index) => (
                        <div style={{ padding: '0 40px 20px' }}>
                            <Skeleton active key={`article-item-loading-${index}`}></Skeleton>
                        </div>
                    ))}
                {!isLoading && items.length <= 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>暂无数据~~</span>} />
                ) : (
                    items.map((item: any) => <ArticleItem item={item} key={item._id}></ArticleItem>)
                )}
            </>
            {totalCount > 0 && (
                <div style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'center' }}>
                    <Pagination
                        itemRender={(page, type, originalElement) => {
                            if (page >= 1 && type == 'page') {
                                return (
                                    <Link href={`/blog/articles?page=${page}`} passHref={true}>
                                        <a>{page}</a>
                                    </Link>
                                );
                            }
                            return originalElement;
                        }}
                        defaultCurrent={page}
                        pageSize={10}
                        total={totalCount}
                    />
                </div>
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
