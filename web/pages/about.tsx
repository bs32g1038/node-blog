import Head from 'next/head';
import React from 'react';
import { About } from '../components/about';
import siteInfo from '../config/site-info';
import AppLayout from '../layouts/app';

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
