import React from 'react';
import dynamic from 'next/dynamic';
import PageLodingSpin from '@blog/client/admin/components/PageLodingSpin';

export const noSSRWithLoadingDynamic = (component) => {
    return dynamic(() => component, {
        ssr: false,
        loading: () => <PageLodingSpin />,
    });
};
