import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import config from '../../config';
import { Form, Input, Upload, Button, message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import axios from '../../utils/axios';
class GroupEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            avatar: '/static/images/default.jpg',
            group: {}
        };
    }
    componentDidMount() {
        const { match } = this.props;
        const self = this;
        if (match.params.id) {
            axios.get('/chatroom/groups/' + match.params.id)
                .then(function (res) {
                    self.setState({
                        group: res.data,
                        avatar: res.data.avatar,
                    });
                });
        }
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
            message.error('图片上传成功！');
        }
        return fileList;
    }
    publish(e) {
        e.preventDefault();
        const { match, history } = this.props;
        this.props.form.validateFields((err, data) => {
            Object.assign(data, {
                avatar: data.avatar[0].url
            });
            if (!err) {
                const p = match.params.id ? this.updateGroup(match.params.id, data) : this.createGroup(data);
                p.then(() => {
                    message.success("提交成功");
                    history.push('/blog/admin/chatroom/groups');
                });
            }
        });
    }
    createGroup(data) {
        return axios.post('/chatroom/groups', data);
    }
    updateGroup(id, data) {
        return axios.put('/chatroom/groups/' + id, data);
    }
    render() {
        let { group } = this.state;
        const { getFieldDecorator } = this.props.form;
        let fileList = [{
            uid: -1,
            status: 'done',
            url: this.state.avatar,
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
                        label="房间名称："
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '房间名不能为空！', }],
                            initialValue: group.name
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 3 }}
                        label="上传图片："
                    >
                        {getFieldDecorator('avatar', {
                            initialValue: fileList,
                            valuePropName: 'fileList',
                            getValueFromEvent: this.handleUpload,
                        })(
                            <Upload
                                disabled={false}
                                action="/api/upload/image?w=200&h=200"
                                onChange={this.handleChange}
                                multiple={false}
                                name="file"
                                listType="picture"
                                headers={{ authorization: localStorage.getItem(config.tokenKey) }}
                                onRemove={() => false}
                            >
                                <Button><i className="fa fa-arrow-up"></i>点击上传</Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label="房间描述："
                    >
                        {getFieldDecorator('description', {
                            initialValue: group.description
                        })(
                            <TextArea placeholder="请输入房间描述" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>
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
export default withRouter(Form.create()(GroupEdit));
