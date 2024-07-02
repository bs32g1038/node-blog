import React from 'react';
import { TagIcon } from '@blog/client/web/icons';
import Link from 'next/link';
import { timeAgo } from '@blog/client/libs/time';
import style from './item.style.module.scss';
import { uniqueId } from 'lodash';
import { Space, Image } from 'antd-mobile';
import dynamic from 'next/dynamic';
import { TinyAreaConfig } from '@ant-design/plots';
const TinyArea = dynamic(() => import('@ant-design/plots').then(({ TinyArea }) => TinyArea), { ssr: false });

const Item = (props: any) => {
    const item = props.item;
    const data = [1, 1, ...item.dayReadings.map((item: { count: number }) => item.count), 1, 1];
    const config: TinyAreaConfig = {
        autoFit: true,
        data,
        smooth: false,
        line: {
            size: 2,
            color: '#c6e48b',
        },
        padding: [0, -20, 0, -20],
        areaStyle: {
            fill: 'transparent',
            shadowColor: 'transparent',
        },
        yAxis: {
            max: Math.max(28, Math.max(...data)),
        },
        tooltip: {
            showContent: false,
            showCrosshairs: false,
        },
    };
    return (
        <div className={style.item + ' loader'}>
            <div className={style.itemRight}>
                <div className={style.thumbImgWrap}>
                    <Image src={item.screenshot} alt="" />
                </div>
            </div>
            <div className={style.itemLeft}>
                <Link href={`/m/blog/articles/${item._id}`} passHref={true}>
                    <h2>{item.title}</h2>
                </Link>
                <div className={style.itemMeta}>
                    <span className="cat">发布于 {timeAgo(item.createdAt)}</span>
                    <em>·</em>
                    <span className="cat">{(item.category && item.category.name) || '暂无分类'}</span> <em>·</em>
                    <span>阅读：{item.viewsCount}</span>
                    <em>·</em>
                    <span>评论：{item.commentCount}</span>
                </div>
                <p className={style.itemSummary}>{item.summary}</p>
                {item.tags.length > 0 && (
                    <div className={style.tags}>
                        <TagIcon className={style.tagIcon}></TagIcon>
                        <Space>
                            {item.tags.map((name: any) => (
                                <Link href={`/m/blog/articles?tag=${name}`} passHref={true} key={uniqueId()}>
                                    {name}
                                </Link>
                            ))}
                        </Space>
                    </div>
                )}
            </div>
            <div title={item.title + ' 访问趋势'} style={{ height: '28px', width: '100%' }}>
                <TinyArea {...config} />
            </div>
        </div>
    );
};

export default Item;
