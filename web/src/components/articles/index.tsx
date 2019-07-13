import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/articles';
import { fetchArticles } from '../../redux/reducers/articles';
import { Categories } from '../categories';
import ArticleItem from './item';

const UL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    flex: 1 0 auto;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const getList = (props: any) => {
    const q: { cid?: string } = props.match.params;
    const { articles } = props._DB;
    return (q.cid ? articles[q.cid] : articles.blog);
};

export const asyncData = (store: any, route: any) => {
    const { page, limit = 30 } = route.query;
    const cid = route.params.cid;
    return store.dispatch(fetchArticles(page, limit, { cid }));
};

const C = (props: any) => {
    useEffect(() => {
        if (getList(props)) {
            return;
        }
        const q: { cid?: string } = props.match.params;
        setTimeout(() => {
            asyncData({ dispatch: props.dispatch }, {
                query: q,
                params: props.match.params
            });
        }, 250);
    }, [props.match.params]);
    const articles = getList(props) || new Array(12).fill(null);
    return (
        <div>
            <Categories key={props.location.pathname}></Categories>
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

export const Articles = connect(
    (state: State) => ({
        _DB: state.articles
    })
)(C as any);