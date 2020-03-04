import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '@blog/client/web/layouts/app';
import { Demo } from '@blog/client/web/components/demo';

export default () => {
    const router = useRouter();
    const demoName: any = router.query.name;
    return (
        <AppLayout>
            <Head>
                <title>{demoName + ' demo'}</title>
            </Head>
            <Demo demoName={demoName}></Demo>
        </AppLayout>
    );
};
