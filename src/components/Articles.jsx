import * as React from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { Link } from 'react-router-dom'
import { parseTime, timeAgo } from '../utils/time';

const generateItems = (items) => items.map((item) =>
    (
        <li className="article-item" v-for="item in articles" key={item._id}>
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
            <div className="article-summary">{item.summary}</div>
        </li>
    )
)

export default class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = { fields: '-content,category.name', cid: '', limit: 10, page: 1, ...q };
        axios.get('/articles?' + queryString.stringify(query)).then((res) => {
            this.setState({
                articles: res.data,
            });
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search != this.props.location.search) {
            this.fetchData(nextProps.location);
        }
    }
    componentDidMount() {
        this.fetchData(this.props.location)
    }
    render() {
        return (
            <ul className="articles">
                {generateItems(this.state.articles)}
            </ul>
        )
    }
}