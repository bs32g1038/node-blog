import React from 'react';
import { Card, List } from 'antd';
import styled from '@emotion/styled';
import { timeAgo } from '@blog/client/libs/time';

const LoginLogPanelCard = styled(Card)`
    .ant-card-head {
        padding: 0;
    }
    .ant-card-body {
        padding-left: 0;
        padding-right: 0;
    }
`;

interface Props {
    loading: boolean;
    recentAdminLogs: any[];
}

export default (props: Props) => {
    const { recentAdminLogs = [], loading = false } = props;
    return (
        <LoginLogPanelCard style={{ marginBottom: 24 }} bordered={false} title="操作日志" loading={loading}>
            <div>
                {recentAdminLogs.map((item: any) => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            title={<span>{item.data}</span>}
                            description={
                                <span title={item.updatedAt}>
                                    {timeAgo(item.createdAt)} · {item.type}
                                </span>
                            }
                        />
                    </List.Item>
                ))}
            </div>
        </LoginLogPanelCard>
    );
};
