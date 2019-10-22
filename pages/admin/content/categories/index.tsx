import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import Categories from '@blog/client/admin/pages/Categories';

export default () => {
    return (
        <BasicLayout>
            <Categories></Categories>
        </BasicLayout>
    );
};
