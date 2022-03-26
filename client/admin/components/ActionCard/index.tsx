import { Card, CardProps } from 'antd';
import React from 'react';
import style from './style.module.scss';

export default function ActionCard(props: CardProps) {
    return (
        <Card bordered={false} {...props} className={style.wrap + ' ' + props.className ?? ''}>
            {props.children}
        </Card>
    );
}
