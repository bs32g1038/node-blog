import React from 'react';
import { Form, Input, Button, Layout, Breadcrumb, Radio, Select, Upload, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
const RadioGroup = Radio.Group;
import Editor from '../common/Editor';
import axios from '../../utils/axios.js';

const RegistrationForm = Form.create()(React.createClass({
    getInitialState() {
        notification.config({
            top: 60,
            duration: 4,
        });
        return {
            article: {},
            categoryItems: []
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            //  打印日志，注意清除
            console.log(err)            
            console.log(values)
            if (!err) {
                let method = "post";
                let base_url = 'http://127.0.0.1/api/admin/articles';
                if (this.props.params.id) {
                    method = "put";
                    base_url += '/' + this.props.params.id;
                }
                axios[method](base_url, values)
                    .then(function (response) {
                        if (response.status === 200 || response.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '内容已提交成功！',
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    },
    fetch(params = {}) {
        let self = this;
        axios.get('/api/admin/articles/' + params.id).then((res) => {
            var article = res.data;
            axios.get('/api/admin/categories').then((res) => {
                let categoryItems = res.data.items;
                self.setState({
                    article: article,
                    categoryItems: categoryItems,
                })
            })
        });
    },
    componentDidMount() {
        this.fetch(this.props.params);
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        const article = this.state.article || {};
        const category = article.category || {};
        const categoryOptions = this.state.categoryItems.map(category => <Option key={category._id}>{category.name}</Option>);
        return (
            <Content>
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
                        {getFieldDecorator('img_url', {
                            valuePropName: 'fileList',
                            normalize: this.normFile,
                        })(
                            <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
                                <Button><i className="fa fa-arrow-up"></i>点击上传</Button>
                                <img src={article.img_url} alt="" style={{ height: '120px', width: '170px' }} />
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
            </Content>
        );
    },
}));

export default RegistrationForm