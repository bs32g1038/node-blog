import styled from '@emotion/styled';
import { Router, withRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Categories } from '../../components/categories';
import { fetchArticles, State } from '../../redux/reducers/articles';
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
    const q: { cid?: string } = props.router.query;
    const { articles } = props._DB;
    return (q.cid ? articles[q.cid] : articles.blog);
};

export const fetchData = (props: { router: any, dispatch: any }) => {
    const { router } = props;
    const { page = 1, limit = 30, cid = '' } = router.query;
    return props.dispatch(fetchArticles(page, limit, { cid }));
};

const C = (props: { router: Router, dispatch: any }) => {
    useEffect(() => {
        if (getList(props)) {
            return;
        }
        const q: { cid?: string } = props.router.query;
        setTimeout(() => {
            fetchData(props);
        }, 250);
    }, [props.router.query]);
    const articles = getList(props) || new Array(12).fill(null);
    return (
        <div>
            <Categories></Categories>
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
)(withRouter(C) as any) as any;