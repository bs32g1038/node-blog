import React from 'react';
import { Card, Button } from 'antd';
import style from './NavPanel.style.module.scss';

interface Props {
    loading: boolean;
    links: any[];
}

export default function NavPanel(props: Props) {
    const { links = [], loading = false } = props;
    return (
        <Card
            loading={loading}
            style={{ marginBottom: 24 }}
            title="便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
        >
            <div className={style.linkGroup}>
                {links.map((link: any) => (
                    <Button key={`linkGroup-item-${link.id || link.title}`} href={link.href} icon={link.icon}>
                        {link.title}
                    </Button>
                ))}
            </div>
        </Card>
    );
}
