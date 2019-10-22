import React from 'react';
import dynamic from 'next/dynamic';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
const DynamicComponent = dynamic(() => import('@blog/client/admin/pages/CategoryEdit'), { ssr: false });

export default () => {
    return (
        <BasicLayout>
            <DynamicComponent></DynamicComponent>
        </BasicLayout>
    );
};
