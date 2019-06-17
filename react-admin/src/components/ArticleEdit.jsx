import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import config from '../config';
import { Form, Input, Upload, Select, Button, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import MdEdit from './MdEdit';
import axios from '../utils/axios';
class ArticleEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: '',
            screenshot: '/static/images/default.jpg',
            article: {},
            categories: []
        };
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
    beforeUpload(file){
        if(file.size > 1024 * 1024 ){
            message.warning('图片大小最大为 1M ！');
            return false;
        }
        return true;
    }
    handleUpload(e) {
        if (Array.isArray(e)) {
            return e;
        }
        let fileList = e.fileList;
        fileList = fileList.slice(-1);
    
        fileList = fileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        if (e.file.status === 'done') {
            message.success('图片上传成功！');
        } else if (e.file.status === 'error') {
            message.error('图片上传失败！');
        }
        return fileList;
    }
    publish(e) {
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            Object.assign(data, {
                screenshot: data.screenshot[0].url
            });
            if (!err) {
                const p = match.params.id ? this.updateArticle(match.params.id, data) : this.createArticle(data);
                p.then(() => {
                    alert("提交成功");
                    history.push('/blog/admin/articles');
                });
            }
        });
    }
    createArticle(data) {
        return axios.post('/articles', data);
    }
    updateArticle(id, data) {
        return axios.put('/articles/' + id, data);
    }
    onChange(value) {
        this.setState({
            editorContent: value
        });
    }
    render() {
        let { article, categories } = this.state;
        const { getFieldDecorator } = this.props.form;
        const category = article.category || {};
        const categoryOptions = categories && categories.map(category => <Option
            key={category._id}>{category.name}</Option>);
        let fileList = [{
            uid: -1,
            status: 'done',
            url: this.state.screenshot,
        }];
        return (
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----文章添加或编辑</strong>
                </div>
                <Form onSubmit={(e) => this.publish(e)} style={{ marginTop: '20px' }} >
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="文章标题："
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '标题不能为空！', }],
                            initialValue: article.title
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 3 }}
                        label="文章分类："
                    >
                        {getFieldDecorator('category', {
                            rules: [
                                { required: true, message: '分类不能为空!' },
                            ],
                            initialValue: category._id
                        })(
                            <Select placeholder="请选择一个分类">
                                {categoryOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 3 }}
                        label="上传图片："
                    >
                        {getFieldDecorator('screenshot', {
                            initialValue: fileList,
                            valuePropName: 'fileList',
                            getValueFromEvent: this.handleUpload,
                        })(
                            <Upload
                                disabled={false}
                                action="/api/upload/image"
                                multiple={false}
                                name="file"
                                listType="picture"
                                accept=".jpg,.png"
                                headers={{ authorization: localStorage.getItem(config.tokenKey) }}
                                onRemove={() => false}
                                beforeUpload={this.beforeUpload}
                            >
                                <Button><i className="fa fa-arrow-up"></i>点击上传</Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="文章摘要："
                    >
                        {getFieldDecorator('summary', {
                            initialValue: article.summary
                        })(
                            <TextArea placeholder="请输入文章摘要" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>
                        )}
                    </FormItem>
                    <FormItem
                        label="文章详情："
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 20 }}
                    >
                        {getFieldDecorator('content', {
                            initialValue: article.content || ''
                        })(
                            <MdEdit />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="操作："
                    >
                        <Button type="primary" htmlType="submit">发布</Button>
                        <Button >存为草稿</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default withRouter(Form.create()(ArticleEdit));
