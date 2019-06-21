import React, { Component } from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class CategoryEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            category: {}
        };
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
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                const p = match.params.id ? this.updateCategory(match.params.id, data) : this.createCategory(data);
                p.then((res) => {
                    message.success("提交成功");
                    history.push('/blog/admin/content/categories');
                });
            }
        });
    }
    createCategory(data) {
        return axios.post('/categories', data);
    }
    updateCategory(id, data) {
        return axios.put('/categories/' + id, data);
    }
    render() {
        const category = this.state.category;
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper
                title={category._id ? '分类编辑' : '添加分类'}
                content='控制台----分类添加或编辑'
            >
                <div className="main-content">
                    <Form onSubmit={(e) => this.publish(e)} style={{ marginTop: '20px' }} >
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="分类名称："
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true,
                                    message: '分类名称长度要在1-25个字符之间！',
                                    min: 1,
                                    max: 25
                                }],
                                initialValue: category.name
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 10 }}
                            label="操作："
                        >
                            <Button type="primary" htmlType="submit">发布</Button>
                        </FormItem>
                    </Form>
                </div>
            </PageHeaderWrapper>
        );
    }
}
export default withRouter(Form.create()(CategoryEdit));