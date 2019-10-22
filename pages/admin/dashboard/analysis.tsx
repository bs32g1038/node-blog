import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import Dashboard from '@blog/client/admin/pages/Dashboard';

export default () => {
    return (
        <BasicLayout>
            <Dashboard></Dashboard>
        </BasicLayout>
    );
};
