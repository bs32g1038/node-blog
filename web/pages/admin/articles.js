import Head from 'next/head';
import React from 'react';
import siteInfo from '../../config/site-info';
import dynamic from 'next/dynamic';
const Articles = dynamic(() => import('../../admin/pages/Articles'), { ssr: false });
const BasicLayout  = dynamic(() => import('../../admin/layouts/BasicLayout'), {ssr: false})

export default () => {
    return (
        <BasicLayout>
            <Articles>
                <Head>
                    <title>{siteInfo.name + '-后台文章管理'}</title>
                </Head>
            </Articles>
        </BasicLayout>
    )
};