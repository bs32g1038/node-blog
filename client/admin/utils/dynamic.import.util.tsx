import React from 'react';
import dynamic, { LoaderComponent } from 'next/dynamic';
import PageLodingSpin from '@blog/client/admin/components/PageLodingSpin';

export const noSSRWithLoadingDynamic = (
    component: LoaderComponent<any> | Promise<typeof import('../pages/ArticleEdit')>
) => {
    return dynamic(() => component, {
        ssr: false,
        loading: () => <PageLodingSpin />,
    });
};
