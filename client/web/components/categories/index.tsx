import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@blog/client/redux/reducers/categories';
import { RootState } from '@blog/client/redux/store';
import NavLink from '../nav-link';
import Router, { useRouter } from 'next/router';
import style from './style.module.scss';
import { Tag } from 'antd';

const Categories = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.categories);
    useEffect(() => {
        const cats = items || [];
        if (cats.length <= 0) {
            dispatch(fetchCategories());
        }
    }, [1]);
    return (
        <div className={style.categories}>
            <NavLink exact={true} href="/blog">
                <a className={style.categoryItemA}>全部</a>
            </NavLink>
            {items.map((item: any) => (
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
