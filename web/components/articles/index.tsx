import styled from '@emotion/styled';
import { Router, withRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { fetchArticles } from '../../api/article';
import siteInfo from '../../config/site-info';
import { Categories } from '../categories';
import ArticleItem from './item';

const UL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    flex: 1 0 auto;
    list-style: none;
    margin: 0 -10px;
    padding: 0;
`;

const getList = (props: any) => {
    return [];
};

export const asyncData = (route: any) => {
    const { page, limit = 30 } = route.query;
    const cid = route.params.cid;
    return fetchArticles(page, limit, { cid });
};

const C = (props: { router: Router }) => {
    const router = props.router;
    useEffect(() => {
        if (getList(props)) {
            return;
        }
        const q: { cid?: string } = router.query;
        setTimeout(() => {
            asyncData(router);
        }, 250);
    }, [props.router.pathname]);
    const articles = getList(props) || new Array(12).fill(null);
    return (
        <div>
            <Categories></Categories>
            <Helmet title={siteInfo.name + '-博客'}></Helmet>
            <UL>
                {
                    articles.map((item: any, index: number) => (
                        <ArticleItem item={item} key={item ? item._id : `article-item-loading-${index}`}></ArticleItem>
                    ))
                }
            </UL>
        </div>
    );
};

export const Articles = withRouter(C);