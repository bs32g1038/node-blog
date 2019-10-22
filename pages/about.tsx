import Head from 'next/head';
import React from 'react';
import { About } from '../client/web/components/about';
import siteInfo from '../client/web/config/site-info';
import AppLayout from '../client/web/layouts/app';

export default () => {
    return (
        <AppLayout>
            <Head>
                <title>{siteInfo.name + '-关于'}</title>
            </Head>
            <About></About>
        </AppLayout>
    );
};
