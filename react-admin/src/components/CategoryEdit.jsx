import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../utils/axios';
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
                    history.push('/blog/admin/categories');
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
            <div className="main-content">
                <div className="manager-tip">
                    <i className="fa fa-edit fa-fw"></i><strong>控制台----分类添加或编辑</strong>
                </div>
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
        );
    }
}
export default withRouter(Form.create()(CategoryEdit));