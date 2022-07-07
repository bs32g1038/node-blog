import React from 'react';
import Head from 'next/head';
import AppLayout from '@blog/client/web/layouts/app';
import { fetchExplore, useFetchConfigQuery, useFetchExploreQuery } from '@blog/client/web/api';
import { wrapper } from '@blog/client/redux/store';
import { ExploreItem } from './expore-item';

const Page = () => {
    const { data: config } = useFetchConfigQuery();
    const {
        data: { items: exploreList = [] },
    } = useFetchExploreQuery();
    return (
        <AppLayout>
            <Head>
                <title>{config.siteTitle + '-发现'}</title>
            </Head>
            <div style={{ margin: '20px 30px' }}>
                {exploreList.map((item) => {
                    return <ExploreItem key={item._id} item={item}></ExploreItem>;
                })}
            </div>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(fetchExplore.initiate());
    return {
        props: {},
    };
});

export default Page;
