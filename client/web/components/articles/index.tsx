import React from 'react';
import Head from 'next/head';
import Categories from '../categories';
import ArticleItem from './item';
import AppLayout from '@blog/client/web/layouts/app';
import { useFetchArticlesQuery, fetchArticles, fetchCategories, useFetchConfigQuery } from '@blog/client/web/api';
import { Empty, Skeleton, Pagination } from 'antd';
import Link from '../link';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';
import { wrapper } from '@blog/client/redux/store';

const Page = () => {
    const router = useRouter();
    const { data: config } = useFetchConfigQuery();
    const page = Number(router.query.page || 1);
    const cid: string = isArray(router.query.cid) ? router.query.cid.join(',') : router.query.cid || '';
    const tag: string = isArray(router.query.tag) ? router.query.tag.join(',') : router.query.tag || '';
    const { data, isLoading } = useFetchArticlesQuery({ page, filter: { cid, tag } });
    const { items = [], totalCount = 0 } = data || {};
    return (
        <AppLayout>
            <Head>
                <title>{config.siteTitle + '-博客'}</title>
            </Head>
            <Categories></Categories>
            <>
                {isLoading &&
                    new Array(10).fill('').map((_, index) => (
                        <div style={{ padding: '0 40px 20px' }} key={`article-item-loading-${index}`}>
                            <Skeleton active></Skeleton>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { page = 1, cid = '', tag = '' } = context.query;
    await store.dispatch(fetchCategories.initiate());
    await store.dispatch(
        fetchArticles.initiate({
            page,
            filter: {
                cid,
                tag,
            },
        })
    );
    return {
        props: {},
    };
});

export default Page;
