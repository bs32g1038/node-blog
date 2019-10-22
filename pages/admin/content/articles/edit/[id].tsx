import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import ArticleEdit from '@blog/client/admin/pages/ArticleEdit';

export default () => {
    return (
        <BasicLayout>
            <ArticleEdit></ArticleEdit>
        </BasicLayout>
    );
};
