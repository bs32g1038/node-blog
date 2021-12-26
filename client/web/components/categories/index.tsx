import React from 'react';
import NavLink from '../nav-link';
import Router, { useRouter } from 'next/router';
import style from './style.module.scss';
import { Tag } from 'antd';
import { useFetchCategoriesQuery } from '@blog/client/web/api';

const Categories = () => {
    const router = useRouter();
    const { data = [] } = useFetchCategoriesQuery();
    return (
        <div className={style.categories}>
            <NavLink exact={true} href="/blog">
                <a className={style.categoryItemA}>全部</a>
            </NavLink>
            {data.map((item) => (
                <NavLink key={item._id} href={`/blog/articles?cid=${item._id}`} exact={true}>
                    <a className={style.categoryItemA}>
                        {item.name}
                        <span>({item.articleCount})</span>
                    </a>
                </NavLink>
            ))}
            {router.query.tag && (
                <Tag
                    closable
                    onClose={() => {
                        Router.push('/blog/articles');
                    }}
                >
                    {router.query.tag}
                </Tag>
            )}
        </div>
    );
};

export default Categories;
