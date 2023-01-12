import React from 'react';
import { Space, Image, Row } from 'antd';
import style from './item.style.module.scss';
import { parseTime } from '@blog/client/libs/time';

export const ExploreItem = (props) => {
    const { item } = props;
    return (
        <div className={style.item}>
            <div className={style.itemMeta} style={{ marginBottom: 0 }}>
                <span className="cat">发布于 {parseTime(item.createdAt)}</span>
                <span className="cat">· 发现</span>
            </div>
            <div>{item.content}</div>
            <div>
                {item.links.map((item) => {
                    return (
                        <Space key={item.link} style={{ display: 'flex' }}>
                            <span>{item.title}</span>
                            <a target="_blank" href={item.link} rel="noreferrer">
                                {item.link}
                            </a>
                        </Space>
                    );
                })}
            </div>
            <Space>
                {item.pics.map((item: string) => {
                    return (
                        <Image
                            key={item}
                            width={120}
                            height={100}
                            src={item}
                            alt=""
                            style={{
                                border: '1px dashed #e1e1e1',
                            }}
                        />
                    );
                })}
            </Space>
        </div>
    );
};
