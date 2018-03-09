import * as React from 'react';
import axios from '../utils/axios';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { parseTime } from '../utils/time';
import { withRouter } from "react-router-dom";

export default class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }
    generateArticleList(articles = []) {
        const self = this; 
        return (articles.map((item) => (
            <tr key={item._id}>
                <td>
                    <a href="#" className="thumbnail">
                        <img src={item.screenshot} alt="冷夜流星博客" width="100" height="60" />
                    </a>
                </td>
                <td>
                    <a href={`/blog/articles/${item._id}`}>
                        {item.title}
                    </a>
                </td>
                <td>{parseTime(item.createdAt)}</td>
                <td>{item.category.name}</td>
                <td>{item.viewsCount}</td>
                <td>{item.commentCount}</td>
                <td>正文</td>
                <td>
                    <Link
                        to={`/blog/admin/articles/edit/${item._id}`}
                        title="编辑"
                        className="btn btn-primary btn-xs">
                        <i className="fa fa-edit"></i>
                    </Link>
                    <button
                        className="doc_del btn btn-default btn-xs"
                        data-id={item._id}
                        onClick={(e) => self.deleteArticle(e)}
                        title="删除">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        )))
    }
    deleteArticle(e) {
        const { location, history } = this.props;
        const self = this;
        const id = e.currentTarget.getAttribute('data-id');
        if(confirm("确认要删除？")){ 
            axios.delete('/articles/' + id).then(()=>{
                alert("删除文章成功")
                this.fetchData(location)
            })
        }
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = {
            cid: '',
            limit: 10,
            page: 1,
            ...q
        };
        axios
            .get('/articles?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ articles: res.data });
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
            <div>
                <div className="panel">
                    <Link className="btn is-primary" to="/blog/admin/articles/edit">
                        <span className="fa fa-plus-square">&nbsp;</span>
                        添加文档
                    </Link>
                    <button className="btn is-danger" id="btnListDel">
                        <span className="fa fa-fw fa-trash-o">&nbsp;</span>
                        批量删除
                    </button>
                    <div className="pull-right">
                        <form action="/admin/manage/contentList" name="searchForm">
                            <div className="search-input-group">
                                <input
                                    type="text"
                                    name="searchKey"
                                    id="searchInput"
                                    className="form-control input-sm pull-right"
                                    width="200"
                                    placeholder="请输入需要查询的关键字"
                                    value="" />
                                <button className="btn is-primary" type="submit">
                                    <i className="fa fa-search"></i>搜索</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="table" cellSpacing="0" cellPadding="0" border="0">
                        <thead className="table-header">
                            <tr>
                                <th>缩略图</th>
                                <th>文章标题</th>
                                <th>创建时间</th>
                                <th>分类</th>
                                <th>浏览次数</th>
                                <th>评论数</th>
                                <th>性质</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>{this.generateArticleList(this.state.articles)}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}