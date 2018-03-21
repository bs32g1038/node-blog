import * as React from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { Link } from 'react-router-dom'
import { parseTime, timeAgo } from '../utils/time';

const generateItems = (items) => items.map((item) =>
    (
        <li className="article-item" key={item._id}>
            <div className="article-header">
                <div className="article-brief">
                    <div className="article-meta">
                        <strong>TIME</strong>
                        <em>·</em> {parseTime(item.createdAt)}
                    </div>
                    <Link className="article-title" to={`/blog/articles/${item._id}`}>{item.title}</Link>
                    <div className="article-meta">
                        <a href="#">评论：{item.commentCount}</a> <em>·</em>
                        <a href="#">阅读：{item.viewsCount}</a>
                        <em>·</em>
                        <span>分类：{item.category.name}</span>
                    </div>
                </div>
                <div className="article-thumb">
                    <a style={{ backgroundImage: `url(${item.screenshot})` }}></a>
                </div>
            </div>
            <p className="article-summary">{item.summary}</p>
        </li>
    )
)

const LoadingMasker = (
    <div className="article-list-loading-masker">
        <li className="article-item">
            <div className="article-header">
                <div className="article-brief">
                    <div className="article-meta masker-background"></div>
                    <a className="article-title masker-background"></a>
                    <div className="article-meta masker-background"></div>
                </div>
                <div className="article-thumb masker-background"></div>
            </div>
            <p className="article-summary masker-background"></p>
        </li>
    </div>
)

export default class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false
        };
    }
    fetchData(location) {
        this.setState({
            loading: true
        })
        const q = queryString.parse(location.search);
        const query = { fields: '-content,category.name', cid: '', limit: 10, page: 1, ...q };
        axios.get('/articles?' + queryString.stringify(query)).then((res) => {
            setTimeout(() => {
                this.setState({
                    articles: res.data,
                    loading: false
                });
            }, 400);
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search != this.props.location.search) {
            this.fetchData(nextProps.location);
        }
    }
    componentDidMount() {
        return this.fetchData(this.props.location)
    }
    render() {
        return (
            <ul className="app-article-list">
                {
                    this.state.loading ? LoadingMasker :
                        generateItems(this.state.articles)
                }
            </ul>
        )
    }
}
