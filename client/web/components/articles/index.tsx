import React from 'react';
import Head from 'next/head';
import Categories from '../categories';
import ArticleItem from './item';
import AppLayout from '@blog/client/web/layouts/app';
import { useFetchArticlesQuery, fetchArticles, fetchCategories, useFetchConfigQuery } from '@blog/client/web/api';
import { Empty, Skeleton, Pagination } from 'antd';
import Link from '../link';
import { useRouter } from 'next/router';
import { isArray, isString, toInteger } from 'lodash';
import { wrapper } from '@blog/client/redux/store';

const Page = (props: any) => {
    wrapper.useHydration(props);
    const router = useRouter();
    const { data: config } = useFetchConfigQuery();
    const page = Number(router.query.page || 1);
    const cid: string = isArray(router.query.cid) ? router.query.cid.join(',') : router.query.cid || '';
    const tag: string = isArray(router.query.tag) ? router.query.tag.join(',') : router.query.tag || '';
    const { data = { items: [], totalCount: 0 }, isLoading } = useFetchArticlesQuery({ page, filter: { cid, tag } });
    return (
        <AppLayout>
            <Head>
                <title>{config?.siteTitle + '-博客'}</title>
            </Head>
            <Categories></Categories>
            <div style={{ margin: '15px 0' }}>
                {isLoading &&
                    new Array(10).fill('').map((_, index) => (
                        <div style={{ padding: '0 40px 20px' }} key={`article-item-loading-${index}`}>
                            <Skeleton active></Skeleton>
                        </div>
                    ))}
                {!isLoading && data.items.length <= 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>暂无数据~~</span>} />
                ) : (
                    data.items.map((item) => <ArticleItem item={item} key={item._id}></ArticleItem>)
                )}
            </div>
            {data.totalCount > 0 && (
                <div style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'center' }}>
                    <Pagination
                        itemRender={(page, type, originalElement) => {
                            if (page >= 1 && type == 'page') {
                                return (
                                    <Link
                                        href={{
                                            pathname: '/blog/articles',
                                            query: { ...router.query, page },
                                        }}
                                        passHref={true}
                                    >
                                        {page}
                                    </Link>
                                );
                            }
                            return originalElement;
                        }}
                        defaultCurrent={page}
                        pageSize={10}
                        total={data.totalCount}
                    />
                </div>
            )}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { page = 1, cid = '', tag = '' } = context.query;
    await store.dispatch(fetchCategories.initiate());
    await store.dispatch(
        fetchArticles.initiate({
            page: isString(page) ? toInteger(page) : 1,
            filter: {
                cid: isString(cid) ? cid : '',
                tag: isString(tag) ? tag : '',
            },
        })
    );
    return {
        props: {},
    };
});

export default Page;
