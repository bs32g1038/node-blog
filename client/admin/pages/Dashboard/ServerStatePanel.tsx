import React from 'react';
import { Card } from 'antd';
import styled from '@emotion/styled';

const ServerStatePanelCard = styled(Card)`
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
    systemInfo: {
        hostname: string;
        cpus: { model: string }[];
        totalmem: number;
        type: string;
        release: string;
    };
}

export default (props: Props) => {
    const { systemInfo, loading = false } = props;
    return (
        <ServerStatePanelCard style={{ marginBottom: 24 }} bordered={false} title="服务器状态" loading={loading}>
            <div>
                <p>
                    <strong>主机名称：</strong>
                    {systemInfo.hostname}
                </p>
                <p>
                    <strong>Cpu：</strong>
                    {systemInfo.cpus && systemInfo.cpus[0].model}
                </p>
                <p>
                    <strong>总内存：</strong>
                    {(systemInfo.totalmem / 1024 / 1024 / 1024).toFixed(1) + 'G'}
                </p>
                <p>
                    <strong>系统：</strong>
                    {systemInfo.type}
                </p>
                <p>
                    <strong>系统版本：</strong>
                    {systemInfo.release}
                </p>
            </div>
        </ServerStatePanelCard>
    );
};
