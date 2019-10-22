import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import StaticFiles from '@blog/client/admin/pages/StaticFiles';

export default () => {
    return (
        <BasicLayout>
            <StaticFiles></StaticFiles>
        </BasicLayout>
    );
};
