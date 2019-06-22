import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/articles';
import { fetchArticles } from '../../redux/reducers/articles';
import { Categories } from '../categories';
import { ContentLoader } from '../content-loader';
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
    return (q.cid ? articles[q.cid] : articles.blog) || [];
};

export const asyncData = (store: any, route: any) => {
    const { page, limit = 30 } = route.query;
    const cid = route.params.cid;
    return store.dispatch(fetchArticles(page, limit, { cid }));
};

const C = (props: any) => {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const list = getList(props);
        if (list.length > 0) {
            return;
        }
        const q: { cid?: string } = props.match.params;
        setLoading(true);
        asyncData({ dispatch: props.dispatch }, {
            query: q,
            params: props.match.params
        }).then(() => {
            setLoading(false);
        });
    }, [props.match.params]);
    const articles = getList(props);
    const loaders = new Array(9).fill('').map((_, index) => (
        <ContentLoader width={720} height={160} key={`loader-${index}`}>
            <rect x="0" y="20" width="240" height="25"></rect>
            <rect x="0" y="60" width="300" height="30"></rect>
            <rect x="0" y="105" width="240" height="25"></rect>
            <rect x="600" y="20" width="110" height="110"></rect>
            <rect x="0" y="140" width="720" height="1"></rect>
        </ContentLoader>
    ));
    return (
        <div>
            <Categories key={props.location.pathname}></Categories>
            <Helmet title={siteInfo.name + '-博客'}></Helmet>
            {isLoading ?
                loaders
                :
                <UL>
                    {
                        articles.map((item: any) => (
                            <ArticleItem item={item} key={item._id}></ArticleItem>
                        ))
                    }
                </UL>
            }
        </div>
    );
};

export const Articles = connect(
    (state: State) => ({
        _DB: state.articles
    })
)(C as any);