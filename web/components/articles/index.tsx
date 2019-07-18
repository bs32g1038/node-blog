import styled from '@emotion/styled';
import { Router, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Categories } from '../../components/categories';
import { fetchArticles, State } from '../../redux/reducers/articles';
import { fetchCategories } from '../../redux/reducers/categories';
import ArticleItem from './item';
import media from '../../utils/media';
import { isServer } from '../../utils/helper';
import Head from 'next/head';
import siteInfo from '../../config/site-info';
import AppLayout from '../../layouts/app';

const UL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    flex: 1 0 auto;
    list-style: none;
    margin: 0 -10px;
    padding: 0;
    ${media.phone`
        margin: 0;
    `}
`;

const getList = (props: any) => {
    const q: { cid?: string } = props.router.query;
    const { articles } = props._DB;
    return q.cid ? articles[q.cid] : articles.blog;
};

export const fetchData = (props: { router: Router; dispatch: any }) => {
    const { router } = props;
    const { page = 1, limit = 30, cid = '' } = router.query;
    return props.dispatch(fetchArticles(Number(page), Number(limit), { cid }));
};

const C = (props: { router: Router; dispatch: any }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const arts = getList(props);
        if (arts && arts.length > 0) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            fetchData(props).then(() => {
                setLoading(false);
            });
        }, 250);
    }, [props.router.query]);
    let articles = getList(props);
    if (!articles || loading) {
        articles = new Array(4).fill(null);
    }
    return (
        <AppLayout>
            <Head>
                <title>{siteInfo.name + '-博客'}</title>
            </Head>
            <Categories key={props.router.query.cid}></Categories>
            <UL>
                {articles.map((item: any, index: number) => (
                    <ArticleItem
                        loading={loading}
                        item={item}
                        key={item ? item._id : `article-item-loading-${index}`}
                    ></ArticleItem>
                ))}
            </UL>
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
    const q = req && req.query;
    await reduxStore.dispatch(fetchCategories());
    await reduxStore.dispatch(fetchArticles(q.page, q.limit, { cid: q.cid }));
    return {};
};

export const Articles = connect((state: State) => ({
    _DB: state.articles,
}))(withRouter(C as any)) as any;
