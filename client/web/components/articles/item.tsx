import React from 'react';
import Link from '../link';
import { TagIcon } from '../../icons';
import { LazyLoad } from '../lazy-load';
import { parseTime } from '@blog/client/libs/time';
import style from './item.style.module.scss';
import { uniqueId } from 'lodash';
import { Space } from 'antd';
import { TinyAreaConfig, TinyArea } from '@ant-design/plots';

const ThumbImg = React.forwardRef((props, ref) => <img {...props} className={style.thumbImg} ref={ref as any} />);
ThumbImg.displayName = 'ThumbImg';

const Item = (props: any) => {
    const item = props.item;
    const data = [1, 1, ...item.dayReadings.map((item) => item.count), 1, 1];
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
            <div className={style.itemLeft}>
                <Link href={`/blog/articles/${item._id}`} passHref={true}>
                    <a>
                        <h2>{item.title}</h2>
                    </a>
                </Link>
                <div className={style.itemMeta}>
                    <span className="cat">发布于 {parseTime(item.createdAt)}</span>
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
                                <Link href={`/blog/articles?tag=${name}`} passHref={true} key={uniqueId()}>
                                    <a>{name}</a>
                                </Link>
                            ))}
                        </Space>
                    </div>
                )}
            </div>
            <div className={style.itemRight}>
                <div className={style.thumbImgWrap}>
                    <LazyLoad
                        component={ThumbImg}
                        attrs={{
                            style: { backgroundImage: `url(${item.screenshot})` },
                        }}
                    ></LazyLoad>
                </div>
                <div title={item.title + ' 访问趋势'} style={{ height: '28px', width: '100%' }}>
                    <TinyArea {...config} />
                </div>
            </div>
        </div>
    );
};

export default Item;
