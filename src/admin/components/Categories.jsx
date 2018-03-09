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
            categories: []
        };
    }
    generateCategoryList(categories = []) {
        const self = this;
        return (categories.map((item) => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.articleCount}</td>
                <td>{parseTime(item.createdAt)}</td>
                <td>
                    <Link
                        to={`/blog/admin/categories/edit/${item._id}`}
                        title="编辑"
                        className="btn btn-primary btn-xs">
                        <i className="fa fa-edit"></i>
                    </Link>
                    <button
                        className="doc_del btn btn-default btn-xs"
                        data-id={item._id}
                        onClick={(e) => self.deleteCategory(e)}
                        title="删除">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        )))
    }
    deleteCategory(e) {
        const { location, history } = this.props;
        const self = this;
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm("确认要删除？")) {
            axios.delete('/categories/' + id).then(() => {
                alert("删除分类成功")
                this.fetchData(location)
            })
        }
    }
    fetchData(location) {
        const q = queryString.parse(location.search);
        const query = {
            limit: 10,
            page: 1,
            ...q
        };
        axios
            .get('/categories?' + queryString.stringify(query))
            .then((res) => {
                this.setState({ categories: res.data });
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
                    <Link className="btn is-primary" to="/blog/admin/categories/edit">
                        <span className="fa fa-plus-square">&nbsp;</span>
                        添加分类
                    </Link>
                    <button className="btn is-danger" id="btnListDel">
                        <span className="fa fa-fw fa-trash-o">&nbsp;</span>
                        批量删除
                    </button>
                    <div className="pull-right"><strong>控制台----分类管理</strong></div>
                </div>
                <div className="table-wrapper">
                    <table className="table" cellSpacing="0" cellPadding="0" border="0">
                        <thead className="table-header">
                            <tr>
                                <th>名称</th>
                                <th>文章数量</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>{this.generateCategoryList(this.state.categories)}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}