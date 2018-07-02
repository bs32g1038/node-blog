import axios from '../../utils/axios';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseTime } from '../../utils/time';
import DocumentTitle from '../DocumentTitle';

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: this.props.articles || []
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.articles
        });
    }
    static asyncData(match, location) {
        // const q = queryString.parse(location.search);
        const query = { fields: '-content,category.name', cid: '', limit: 10, page: 1};
        return axios.get('/articles?' + queryString.stringify(query)).then((_) => ({ articles: _.data }));
    }
    render() {
        return (
            <DocumentTitle title="文章列表">
                <ul className="_articles">
                    {
                        this.state.articles.map((item) => (
                            <li className="_articles-item" key={item._id}>
                                <div className="_articles-item-header">
                                    <div className="_articles-item-brief">
                                        <div className="_articles-item-meta">
                                            <strong>TIME</strong>
                                            <em>·</em> {parseTime(item.createdAt)}
                                        </div>
                                        <Link className="_articles-item-title" to={`/blog/articles/${item._id}`}>{item.title}</Link>
                                        <div className="_articles-item-meta">
                                            <a href="javascript:;">评论：{item.commentCount}</a> <em>·</em>
                                            <a href="javascript:;">阅读：{item.viewsCount}</a> <em>·</em>
                                            <span>分类：{(item.category && item.category.name) || '暂无分类'}</span>
                                        </div>
                                    </div>
                                    <div className="_articles-item-thumb">
                                        <a className="_articles-item-thumbA" style={{ backgroundImage: `url(${item.screenshot})` }}></a>
                                    </div>
                                </div>
                                <p className="_articles-item-summary">{item.summary}</p>
                            </li>
                        ))
                    }
                </ul>
            </DocumentTitle>
        );
    }
}