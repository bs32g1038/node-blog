import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../configs/default.config';
import { Form, Input, Upload, Select, Button, message } from 'antd';
import MdEdit from '../../components/MdEdit';
import axios from '../../axios';
import EditableTagGroup from '../../components/EditableTagGroup';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class ArticleEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            article: {},
            categories: [],
        };
    }
    componentDidMount() {
        const { match } = this.props;
        const self = this;
        if (match.params.id) {
            axios.all([axios.get('/articles/' + match.params.id), axios.get('/categories/')]).then(
                axios.spread(function(aRes, cRes) {
                    self.setState({
                        article: aRes.data,
                        categories: cRes.data,
                        screenshot: aRes.data.screenshot,
                    });
                })
            );
        } else {
            axios.get('/categories/').then(res => {
                self.setState({
                    categories: res.data,
                });
            });
        }
    }
    beforeUpload(file) {
        if (file.size > 1024 * 1024) {
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

        fileList = fileList.map(file => {
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
                screenshot: data.screenshot[0].url,
            });
            if (!err) {
                const p = match.params.id ? this.updateArticle(match.params.id, data) : this.createArticle(data);
                p.then(() => {
                    alert('提交成功');
                    history.push('/content/articles');
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
    render() {
        let { article, categories } = this.state;
        const { getFieldDecorator } = this.props.form;
        const category = article.category || {};
        const categoryOptions =
            categories && categories.map(category => <Option key={category._id}>{category.name}</Option>);
        let fileList = this.state.screenshot
            ? [
                  {
                      uid: -1,
                      status: 'done',
                      url: this.state.screenshot,
                  },
              ]
            : [];
        return (
            <PageHeaderWrapper
                title={article._id ? '文章编辑' : '添加文章'}
                content={
                    <>
                        <i className="fa fa-edit fa-fw"></i>
                        <strong>控制台----文章添加或编辑</strong>
                    </>
                }
            >
                <div className="main-content">
                    <Form onSubmit={e => this.publish(e)} style={{ marginTop: '20px' }}>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标题：">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '标题不能为空！' }],
                                initialValue: article.title,
                            })(<Input type="text" />)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 3 }} label="文章分类：">
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: '分类不能为空!' }],
                                initialValue: category._id,
                            })(<Select placeholder="请选择一个分类">{categoryOptions}</Select>)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章标签：">
                            {getFieldDecorator('tags', {
                                initialValue: article.tags,
                            })(<EditableTagGroup />)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 3 }} label="封面图片：">
                            {getFieldDecorator('screenshot', {
                                initialValue: fileList,
                                valuePropName: 'fileList',
                                getValueFromEvent: this.handleUpload,
                                rules: [{ required: true, message: '封面图片不能为空!' }],
                            })(
                                <Upload
                                    disabled={false}
                                    action="/api/upload/image"
                                    multiple={false}
                                    name="file"
                                    listType="picture"
                                    accept=".jpg,.jpeg,.png"
                                    headers={{ authorization: localStorage.getItem(config.tokenKey) }}
                                    onRemove={() => false}
                                    beforeUpload={this.beforeUpload}
                                >
                                    <Button>
                                        <i className="fa fa-arrow-up"></i>点击上传
                                    </Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="文章摘要：">
                            {getFieldDecorator('summary', {
                                initialValue: article.summary,
                                rules: [{ required: true, message: '文章摘要不能为空!' }],
                            })(
                                <TextArea placeholder="请输入文章摘要" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>
                            )}
                        </FormItem>
                        <FormItem label="文章详情：" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
                            {getFieldDecorator('content', {
                                initialValue: article.content || '',
                                rules: [{ required: true, message: '文章详情不能为空!' }],
                            })(<MdEdit />)}
                        </FormItem>
                        <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} label="操作：">
                            <Button type="primary" htmlType="submit">
                                发布
                            </Button>
                            <Button style={{ marginLeft: '10px' }}>存为草稿</Button>
                        </FormItem>
                    </Form>
                </div>
            </PageHeaderWrapper>
        );
    }
}
export default withRouter(Form.create()(ArticleEdit));
