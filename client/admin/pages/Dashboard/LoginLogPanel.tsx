import React from 'react';
import { Card, List } from 'antd';
import { timeAgo } from '@blog/client/libs/time';

interface Props {
    loading: boolean;
    recentAdminLogs: any[];
}

export default function LoginLogPanel(props: Props) {
    const { recentAdminLogs = [], loading = false } = props;
    return (
        <Card style={{ marginBottom: 14 }} bordered={false} title="操作日志" loading={loading}>
            <div>
                {recentAdminLogs.map((item: any) => (
                    <List.Item key={item._id} style={{ borderBottom: '1px solid #ccc' }}>
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
        </Card>
    );
}
