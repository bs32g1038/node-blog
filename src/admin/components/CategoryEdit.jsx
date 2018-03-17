import * as React from 'react';
import axios from '../utils/axios';
import { withRouter } from "react-router-dom";
class CategoryEdit extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            category: {}
        }
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            axios.get('/categories/' + match.params.id).then((res) => {
                this.setState({
                    category: res.data,
                });
            });
        }
    }
    publish(e) {
        const { match, location, history } = this.props;
        const data = {};
        const elements = e.currentTarget.elements;
        for (let i = 0; i < elements.length; i++) {
            let ele = elements[i];
            ele.name && (data[ele.name] = ele.value);
        }
        const p = match.params.id ? this.updateCategory(match.params.id, data) : this.createCategory(data)
        p.then((res) => {
            alert("提交成功")
            history.push('/blog/admin/categories');
        })
        return e.preventDefault()
    }
    createCategory(data) {
        return axios.post('/categories', data)
    }
    updateCategory(id, data) {
        return axios.put('/categories/' + id, data)
    }
    render() {
        const category = this.state.category;
        return (
            <div>
                <div className="article-publish">
                    <div className="manager-tip">
                        <i className="fa fa-edit fa-fw"></i>
                        控制台----添加分类
                    </div>
                    <form onSubmit={(e) => this.publish(e)} className="form-horizontal">
                        <div className="alert alert-warning text-center" role="alert"></div>
                        <div className="form-group">
                            <label className="control-label">分类名称：</label>
                            <div>
                                <input
                                    key={category._id}
                                    placeholder="请输入分类"
                                    type="text"
                                    className="form-control input-sm"
                                    defaultValue={category.name}
                                    name="name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3">操作：</label>
                            <button type="submit" className="btn is-primary" >发布</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(CategoryEdit);