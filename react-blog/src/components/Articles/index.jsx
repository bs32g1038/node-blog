import axios from '../../utils/axios';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseTime } from '../../utils/time';
import styles from './cssmodule.scss';
import DocumentTitle from '../DocumentTitle';

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: this.props.articles || []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.articles
        });
    }
    static asyncData(match, location) {
        const q = queryString.parse(location.search);
        const query = { fields: '-content,category.name', cid: '', limit: 10, page: 1, ...q };
        return axios.get('/articles?' + queryString.stringify(query)).then((_) => ({ articles: _.data }));
    }
    render() {
        return (
            <DocumentTitle title="文章列表">
                <ul className={styles.articles}>
                    {
                        this.state.articles.map((item) => (
                            <li className={styles.item} key={item._id}>
                                <div className={styles.header}>
                                    <div className={styles.brief}>
                                        <div className={styles.meta}>
                                            <strong>TIME</strong>
                                            <em>·</em> {parseTime(item.createdAt)}
                                        </div>
                                        <Link className={styles.title} to={`/blog/articles/${item._id}`}>{item.title}</Link>
                                        <div className={styles.meta}>
                                            <a href="javascript:;">评论：{item.commentCount}</a> <em>·</em>
                                            <a href="javascript:;">阅读：{item.viewsCount}</a> <em>·</em>
                                            <span>分类：{item.category && item.category.name}</span>
                                        </div>
                                    </div>
                                    <div className={styles.thumb}>
                                        <a className={styles.thumbA} style={{ backgroundImage: `url(${item.screenshot})` }}></a>
                                    </div>
                                </div>
                                <p className={styles.summary}>{item.summary}</p>
                            </li>
                        ))
                    }
                </ul>
            </DocumentTitle>
        );
    }
}