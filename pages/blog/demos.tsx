import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '@blog/client/web/layouts/app';
import { Demo } from '@blog/client/web/components/demo';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';

export default () => {
    const router = useRouter();
    const config = useSelector((state: RootState) => state.app.config);
    const demoName: any = router.query.name;
    return (
        <AppLayout>
            <Head>
                <title>{demoName + ' demo'}</title>
            </Head>
            <Demo demoName={demoName} demoGit={config.demoGit}></Demo>
        </AppLayout>
    );
};
