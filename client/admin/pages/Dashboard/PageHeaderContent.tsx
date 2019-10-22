import React from 'react';
import { Avatar, Skeleton } from 'antd';
import styled from '@emotion/styled';

export const PageHeaderContent = styled.div`
    display: flex;
    .avatar {
        flex: 0 1 72px;
        & > span {
            display: block;
            width: 72px;
            height: 72px;
            border-radius: 72px;
        }
    }
    .content {
        position: relative;
        top: 4px;
        flex: 1 1 auto;
        margin-left: 24px;
        line-height: 22px;
        .contentTitle {
            margin-bottom: 12px;
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
        }
    }
`;

export default ({ currentUser }) => {
    const loading = currentUser && Object.keys(currentUser).length;
    if (!loading) {
        return <Skeleton avatar paragraph={{ rows: 1 }} active />;
    }
    return (
        <PageHeaderContent>
            <div className="avatar">
                <Avatar size="large" src={currentUser.avatar} />
            </div>
            <div className="content">
                <div className="contentTitle">
                    {currentUser.name}
                    ，祝你开心每一天！
                </div>
                <div>
                    {currentUser.title} | {currentUser.group}
                </div>
            </div>
        </PageHeaderContent>
    );
};
