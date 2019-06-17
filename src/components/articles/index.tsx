import styled from '@emotion/styled';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/articles';
import { fetchArticles } from '../../redux/reducers/articles';
import Categories from '../categories';
import ContentLoader from '../content-loader';
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

class Articles extends React.Component<any, { isLoading: boolean }> {

    public state = {
        isLoading: false
    };

    public static asyncData(store: any, route: any) {
        const { page, limit = 30 } = route.query;
        const cid = route.params.cid;
        return store.dispatch(fetchArticles(page, limit, { cid }));
    }

    public getList(props: any) {
        const q: { cid?: string } = props.match.params;
        const { articles } = this.props._DB;
        return (q.cid ? articles[q.cid] : articles.blog) || [];
    }

    public fetchData() {
        const q: { cid?: string } = this.props.match.params;
        this.setState({
            isLoading: true
        });
        Articles.asyncData({ dispatch: this.props.dispatch }, {
            query: q,
            params: this.props.match.params
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public componentDidUpdate(prevProps: any) {
        const navigated = prevProps.location !== this.props.location;
        if (navigated) {
            this.fetchData();
        }
    }

    public componentDidMount() {
        const list = this.getList(this.props);
        if (list.length > 0) {
            return;
        }
        this.fetchData();
    }

    public render() {
        const articles = this.getList(this.props);
        const loaders = new Array(9).fill('').map((item, index) => (
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
                <Categories key={this.props.location.pathname}></Categories>
                <Helmet title={siteInfo.name + '-博客'}></Helmet>
                {this.state.isLoading ?
                    loaders :
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
    }
}

export default connect(
    (state: State) => ({
        _DB: state.articles
    })
)(Articles as any);