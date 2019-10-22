import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import Articles from '@blog/client/admin/pages/Articles';

export default () => {
    return (
        <BasicLayout>
            <Articles></Articles>
        </BasicLayout>
    );
};
