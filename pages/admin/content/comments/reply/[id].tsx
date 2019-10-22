import React from 'react';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import CommentReply from '@blog/client/admin/pages/CommentReply';

export default () => {
    return (
        <BasicLayout>
            <CommentReply></CommentReply>
        </BasicLayout>
    );
};
