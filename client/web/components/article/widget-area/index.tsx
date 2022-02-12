import React from 'react';
import { parseTime } from '@blog/client/libs/time';
import style from './style.module.scss';
import vultrPng from '@blog/client/assets/banners/vultr_banner_300x250.png';

interface ItemProps {
    _id: string;
    screenshot: string;
    createdAt: string;
    title: string;
}

interface Props {
    item: ItemProps;
}

const Item = (props: Props) => {
    const { item } = props;
    return (
        <div key={'rc' + item._id} className={style.articleItem}>
            <div className={style.media}>
                <a
                    className={style.mediaContent}
                    href={`/blog/articles/${item._id}`}
                    style={{ backgroundImage: `url(${item.screenshot})` }}
                ></a>
            </div>
            <div className={style.articleItemRight}>
                <a href={`/blog/articles/${item._id}`}>
                    <h2 className={style.articleTitle}>{item.title}</h2>
                </a>
                <span className={style.articleTime}>{parseTime(item.createdAt)}</span>
            </div>
        </div>
    );
};

export default (props: { recentArticles: ItemProps[] }) => {
    const { recentArticles } = props;
    let arr = recentArticles;
    if (Array.isArray(recentArticles) && recentArticles.length <= 0) {
        arr = new Array(5).fill({});
    }
    return (
        <section className={style.widgetArea}>
            <h3 className={style.widgetAreaTitle}>最近文章</h3>
            <div>
                {arr.map((item) => {
                    return <Item item={item} key={item._id}></Item>;
                })}
                <a href="https://www.vultr.com/?ref=7866918-4F" className="vultr" style={{ display: 'block' }}>
                    <img
                        src={vultrPng.src}
                        style={{
                            width: '200px',
                            border: '1px solid var(--border-color)',
                            height: 'auto',
                        }}
                    />
                </a>
            </div>
        </section>
    );
};
