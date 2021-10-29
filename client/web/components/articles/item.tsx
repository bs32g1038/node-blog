import React from 'react';
import Link from '../link';
import { TagIcon } from '../../icons';
import Trend from '../Trend';
import { LazyLoad } from '../lazy-load';
import { parseTime } from '@blog/client/libs/time';
import style from './item.style.module.scss';

const ThumbImg = React.forwardRef((props, ref) => <img {...props} className={style.thumbImg} ref={ref as any} />);

const Item = (props: any) => {
    const item = props.item;
    return (
        <div className={style.item + ' loader'}>
            <div className={style.itemLeft}>
                <Link href={`/blog/articles/${item._id}`} passHref={true} prefetch={false}>
                    <h2>{item.title}</h2>
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
                        {item.tags.map((name: any) => (
                            <Link href={`/blog/articles?tag=${name}`} passHref={true} key={'tag_uid' + name}>
                                <a>{name}</a>
                            </Link>
                        ))}
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
                <div title={item.title + ' 访问趋势'}>
                    <Trend data={[1, 1, ...item.dayReadings.map((tmp: any) => tmp.count), 1, 1]} />
                </div>
            </div>
        </div>
    );
};

export default Item;
