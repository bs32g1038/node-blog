import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import Comments from '@blog/client/admin/pages/Comments';

export default () => {
    return (
        <BasicLayout>
            <Comments></Comments>
        </BasicLayout>
    );
};
