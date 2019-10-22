import React from 'react';
import { Card, Button } from 'antd';
import styled from '@emotion/styled';

const NavPanelCard = styled(Card)`
    .ant-card-head {
        padding: 0;
    }
`;

const LinkGroupDiv = styled.div`
    padding: 20px 0 8px 0;
    font-size: 0;
    > a {
        display: inline-block;
        width: 30%;
        margin-right: 8px;
        margin-bottom: 13px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 0 6px;
    }
`;

interface Props {
    loading: boolean;
    links: any[];
}

export default (props: Props) => {
    const { links = [], loading = false } = props;
    return (
        <NavPanelCard
            loading={loading}
            style={{ marginBottom: 24 }}
            title="便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
        >
            <LinkGroupDiv>
                {links.map((link: any) => (
                    <Button key={`linkGroup-item-${link.id || link.title}`} href={link.href}>
                        <i className={`fa fa-fw ${link.icon}`}></i>
                        {link.title}
                    </Button>
                ))}
            </LinkGroupDiv>
        </NavPanelCard>
    );
};
