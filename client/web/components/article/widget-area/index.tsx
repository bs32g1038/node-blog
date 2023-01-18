import React from 'react';
import style from './style.module.scss';
import vultrPng from '@blog/client/assets/banners/vultr_banner_300x250.png';
import { parseTime } from '@blog/client/libs/time';
import Image from 'next/image';
import ArticleItem from '../../articles/item';

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
                {/* <div className={style.articleSummary}>{item.summary}</div> */}
                <span className={style.articleTime}>{parseTime(item.createdAt)}</span>
            </div>
        </div>
    );
};

export default function Index(props: { recentArticles: ItemProps[] }) {
    const { recentArticles } = props;
    let arr = recentArticles;
    if (Array.isArray(recentArticles) && recentArticles.length <= 0) {
        arr = new Array(5).fill({});
    }
    return (
        <section className={style.widgetArea}>
            <h3 className={style.widgetAreaTitle}>最近文章</h3>
            {recentArticles.map((item) => (
                <ArticleItem item={item} key={item._id}></ArticleItem>
            ))}
        </section>
    );
}
