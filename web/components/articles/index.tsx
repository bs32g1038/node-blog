import styled from '@emotion/styled';
import { Router, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Categories } from '../../components/categories';
import { fetchArticles, State, getArticlesCacheKey } from '../../redux/reducers/articles';
import { fetchCategories } from '../../redux/reducers/categories';
import ArticleItem from './item';
import media from '../../utils/media';
import { isServer } from '../../utils/helper';
import Head from 'next/head';
import siteInfo from '../../config/site-info';
import AppLayout from '../../layouts/app';
import Pagination from '../pagination';

const UL = styled.ul`
    flex-wrap: wrap;
    background-color: #fff;
    flex: 1 0 auto;
    list-style: none;
    padding: 0;
    margin: 0;
    ${media.phone`
        margin: 0;
    `}
`;

const LIMIT = 12;

const getData = (props: any) => {
    const { page = 1, limit = LIMIT, cid = '', tag = '' } = props.router.query;
    const articles = props._DB;
    return articles[getArticlesCacheKey(page, limit, { cid, tag })] || { items: new Array(4).fill(null) };
};

export const fetchData = (props: { router: Router; dispatch: any }) => {
    const { router } = props;
    const { page = 1, limit = LIMIT, cid = '', tag = '' } = router.query;
    return props.dispatch(fetchArticles(Number(page), Number(limit), { cid, tag }));
};

const C = (props: { router: Router; dispatch: any }) => {
    const [loading, setLoading] = useState(false);
    const page = Number(props.router.query.page || 1);
    useEffect(() => {
        const { items } = getData(props);
        if (items && items.length > 0 && items[0] !== null) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            fetchData(props).then(() => {
                setLoading(false);
            });
        }, 250);
    }, [props.router.query]);
    const { items, totalCount } = getData(props);
    return (
        <AppLayout>
            <Head>
                <title>{siteInfo.name + '-博客'}</title>
            </Head>
            <Categories key={props.router.query.cid}></Categories>
            <UL>
                {items.map((item: any, index: number) => (
                    <ArticleItem
                        loading={loading}
                        item={item}
                        key={item ? item._id : `article-item-loading-${index}`}
                    ></ArticleItem>
                ))}
            </UL>
            <Pagination current={page} pageSize={LIMIT} total={totalCount}></Pagination>
        </AppLayout>
    );
};

C.getInitialProps = async ({ reduxStore, req, query }: any) => {
    if (!isServer) {
        return {
            router: {
                query,
            },
        };
    }
    await reduxStore.dispatch(fetchCategories());
    const { page = 1, limit = LIMIT, cid = '', tag = '' } = req && req.query;
    await reduxStore.dispatch(fetchArticles(Number(page), Number(limit), { cid, tag }));
    return {};
};

export const Articles = connect((state: State) => ({
    _DB: state.articles,
}))(withRouter(C as any)) as any;
