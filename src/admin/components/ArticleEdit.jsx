import { Component } from 'inferno';
import { withRouter } from "inferno-router";
import { Link } from 'inferno-router';
import MdEdit from './MdEdit';
import axios from '../utils/axios';
class ArticleEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: '',
            screenshot: "",
            article: {},
            categories: []
        }
    }
    componentDidMount() {
        const { match } = this.props;
        const self = this;
        if (match.params.id) {
            axios.all([axios.get('/articles/' + match.params.id), axios.get('/categories/')])
                .then(axios.spread(function (aRes, cRes) {
                    self.setState({
                        article: aRes.data,
                        categories: cRes.data,
                        editorContent: aRes.data.content,
                        screenshot: aRes.data.screenshot,
                    });
                }));
        } else {
            axios.get('/categories/').then((res) => {
                self.setState({
                    categories: res.data
                });
            });
        }
    }
    uploadImage(event) {
        const self = this;
        const inputObj = document.createElement('input')
        inputObj.setAttribute('name', 'file');
        inputObj.setAttribute('type', 'file');
        inputObj.setAttribute("style", 'visibility:hidden');
        inputObj.click();
        inputObj.onchange = function () {
            const formdata = new FormData();
            formdata.append('file', inputObj.files[0]);
            axios({
                url: '/upload/image?w=200&h=200',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((res) => self.setState({ screenshot: res.data.url }))
        }
    }
    publish(e) {
        const { match, history } = this.props;
        const data = {};
        const elements = e.currentTarget.elements;
        for (let i = 0; i < elements.length; i++) {
            let ele = elements[i];
            ele.name && (data[ele.name] = ele.value);
        }
        const p = match.params.id ? this.updateArticle(match.params.id, data) : this.createArticle(data)
        p.then(() => {
            alert("提交成功");
            history.push('/blog/admin/articles');
        });
        return e.preventDefault()
    }
    createArticle(data) {
        return axios.post('/articles', data)
    }
    updateArticle(id, data) {
        return axios.put('/articles/' + id, data)
    }
    onChange(value) {
        this.setState({
            editorContent: value
        })
    }
    render() {
        const article = this.state.article;
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
                <div className="article-publish">
                    <div className="manager-tip">
                        <i className="fa fa-edit fa-fw"></i>
                        控制台----文章发布
                    </div>
                    <form onSubmit={(e) => this.publish(e)} className="form-horizontal">
                        <div className="alert alert-warning text-center" role="alert"></div>
                        <div className="form-group">
                            <label className="control-label">文章标题：</label>
                            <div>
                                <input
                                    placeholder="请输入文章标题"
                                    type="text"
                                    className="form-control input-sm"
                                    defaultValue={article.title}
                                    name="title" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3">文章类别：</label>
                            <div className="col-sm-2">
                                <select className="select-selection" name="category">
                                    {
                                        this.state.categories.map((item) => {
                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                        }).filter((item) => item.key === (article.category && article.category._id))
                                    }
                                    {
                                        this.state.categories.map((item) => {
                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                        }).filter((item) => item.key !== (article.category && article.category._id))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3">缩略图：</label>
                            <div>
                                <div id="uploader" className="uploader">
                                    <button type="button" className="btn is-primary" onClick={(e) => this.uploadImage(e)}>上传图片</button>
                                </div>
                                <div className="publish-thumbnail">
                                    <input type="hidden" value={this.state.screenshot} name="screenshot" />
                                    <img src={this.state.screenshot} width="121" height="90" className="img-thumbnail" id="show_img" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">内容摘要：</label>
                            <textarea
                                placeholder="请输入文章内容摘要"
                                name="summary"
                                value={article.summary}
                                style={{
                                    minHeight: "80px",
                                    maxHeight: "115px",
                                    width: "550px"
                                }}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3">文章详情：</label>
                            <MdEdit name="content" value={this.state.editorContent} onChange={(value) => this.onChange(value)} />
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3">操作：</label>
                            <button type="submit" className="btn is-primary">发布</button>
                            <button id="save_draft" className="btn">存为草稿</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(ArticleEdit);
