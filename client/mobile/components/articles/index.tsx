import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import Categories from '../categories';
import ArticleItem from './item';
import AppLayout from '../../layouts/app';
import {
    useFetchArticlesQuery,
    fetchArticles,
    fetchCategories,
    useFetchConfigQuery,
    useLazyFetchArticlesQuery,
} from '@blog/client/web/api';
import { useRouter } from 'next/router';
import { isArray, isString, toInteger } from 'lodash';
import { wrapper } from '@blog/client/redux/store';
import { InfiniteScroll, Skeleton, ErrorBlock } from 'antd-mobile';

const Page = (props: any) => {
    wrapper.useHydration(props);
    const router = useRouter();
    const { data: config } = useFetchConfigQuery();
    const page = Number(router.query.page || 1);
    const cid: string = isArray(router.query.cid) ? router.query.cid.join(',') : router.query.cid || '';
    const tag: string = isArray(router.query.tag) ? router.query.tag.join(',') : router.query.tag || '';
    const { data = { items: [], totalCount: 0 }, isLoading } = useFetchArticlesQuery({ page, filter: { cid, tag } });
    const [fetchArticles] = useLazyFetchArticlesQuery();
    const [hasMore, setHasMore] = useState(true);
    const { loadMore, moreData } = useMemo(() => {
        let _page = page;
        let moreData: any[] = [];
        return {
            moreData,
            loadMore: async function loadMore() {
                return fetchArticles({ page: _page + 1, filter: { cid, tag } })
                    .unwrap()
                    .then((res) => {
                        moreData = [...moreData, ...res.items];
                        _page += 1;
                        setHasMore(res?.items?.length > 0);
                    });
            },
        };
    }, [cid, fetchArticles, page, tag]);
    const results = [...data.items, ...moreData];
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
                            <Skeleton></Skeleton>
                        </div>
                    ))}
                {!isLoading && results.length <= 0 ? (
                    <ErrorBlock status="empty" title={<span>暂无数据~~</span>} />
                ) : (
                    results.map((item) => <ArticleItem item={item} key={item._id}></ArticleItem>)
                )}
            </div>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
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
