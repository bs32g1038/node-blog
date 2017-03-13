import React from 'react';
import { Form, Input, Button, message, Layout, Breadcrumb, Radio, Select, Upload, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
const RadioGroup = Radio.Group;
import Editor from '../common/Editor';
import * as actions from '../../redux/modules/article'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const Option = Select.Option;
const ArticleEdit = Form.create()(React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        const { saveArticle } = this.props.action;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                saveArticle(this.props.params.id, values);
            }
        });
    },
    componentDidMount() {
        let id = this.props.params.id;
        if (id) {
            this.props.action.loadArticle(id);
        }
        this.props.action.loadCategories();
    },
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
            message.success(`${e.file.name} file uploaded successfully`);
        } else if (e.file.status === 'error') {
            message.error(`${e.file.name} file upload failed.`);
        }
        return fileList;
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        let { item, categories } = this.props.articles;
        const article = item || {};
        categories = categories || [];
        let upload = {
            name: "file",
            action: "/api/admin/medias",
            listType: "picture",
            multiple: false,
            onRemove: () => false
        }
        let fileList = [{
            uid: -1,
            status: 'done',
            url: article.img_url,
        }];
        const category = article.category || {};
        const categoryOptions = categories.map(category => <Option key={category._id}>{category.name}</Option>);
        return (
            <Content >
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                    <Breadcrumb.Item>文章编辑</Breadcrumb.Item>
                </Breadcrumb>

                <Form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
                    <FormItem
                        label="标题"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '标题不能为空！', }],
                            initialValue: article.title
                        })(
                            <Input type="text" />
                            )}
                    </FormItem>
                    <FormItem
                        label="文章来源"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('from', {
                            rules: [
                                { required: true, message: '请选择一个来源' },
                            ],
                            initialValue: article.from
                        })(
                            <RadioGroup>
                                <Radio value={"original"}>原创</Radio>
                                <Radio value={"transport"}>转载</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem
                        label="分类"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 4 }}
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
                        label="上传图片"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 4 }}
                    >
                        {getFieldDecorator('images', {
                            initialValue: fileList,
                            valuePropName: 'fileList',
                            getValueFromEvent: this.handleUpload,
                        })(
                            <Upload {...upload}>
                                <Button><i className="fa fa-arrow-up"></i>点击上传</Button>
                            </Upload>
                            )}
                    </FormItem>
                    <FormItem
                        label="文章摘要"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('summary', {
                            initialValue: article.summary
                        })(
                            <Input type="textarea" rows={4} />
                            )}
                    </FormItem>
                    <FormItem
                        label="文章内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                    >
                        {getFieldDecorator('content', {
                            initialValue: article.content
                        })(
                            <Editor />
                            )}
                    </FormItem>

                    <FormItem
                        label="操作"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 4 }}
                    >
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                    </FormItem>
                </Form>
            </Content >
        );
    },
}));

export default connect(
    (state) => {
        console.log(state.articles)
        return { articles: state.articles };
    },
    (dispatch) => ({
        action: bindActionCreators(actions, dispatch)
    })
)(ArticleEdit);
