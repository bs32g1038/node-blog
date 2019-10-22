import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import CategoryEdit from '@blog/client/admin/pages/CategoryEdit';

export default () => {
    return (
        <BasicLayout>
            <CategoryEdit></CategoryEdit>
        </BasicLayout>
    );
};
