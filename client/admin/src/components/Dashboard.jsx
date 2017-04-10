import React, { Component } from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification, Row, Col } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from 'axios';
import Editor from './Editor';

class DashboardForm extends Component {
    constructor(props) {
        super(props)
        notification.config({
            top: 60,
            duration: 4,
        });
        this.state = {
            about: {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let base_url = '/api/admin/abouts/' + this.props.params.id;
                axios.put(base_url, values)
                    .then(function (res) {
                        if (res.status === 200 || res.status === 201) {
                            notification['success']({
                                message: '操作提示',
                                description: '内容已提交成功！',
                            });
                            this.setState({
                                about: res.data,
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }
    fetch = (params = {}) => {
        let self = this;
        axios.get('/api/admin/abouts/' + params.id).then((res) => {
            self.setState({
                about: res.data,
            })
        });
    }
    componentDidMount() {
        this.fetch(this.props.params);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { about } = this.state;
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>管理首页</Breadcrumb.Item>
                    <Breadcrumb.Item>控制面板</Breadcrumb.Item>
                </Breadcrumb>

                <div className="box">
                    <div className="box-header">
                        网站概况
                    </div>
                    <div className="box-body">
                        <Row gutter={16}>
                            <Col span={4} >
                                <div className="article-count">
                                    <h4>15</h4>
                                    <p>文章总数</p>
                                </div>
                            </Col>
                            <Col span={4} >
                                <div>
                                    <h4>15</h4>
                                    <p>留言总数</p>
                                </div>
                            </Col>
                            <Col span={4} >
                                <div>
                                    <h4>15</h4>
                                    <p>评论总数</p>
                                </div>
                            </Col>
                            <Col span={4} >
                                <div>
                                    <h4>15</h4>
                                    <p>网站浏览总数</p>
                                </div>
                            </Col>
                            <Col span={4} >
                                <div>
                                    <h4>15</h4>
                                    <p>分类总数</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="box">
                    <div className="box-header">
                        快速阅读
                    </div>
                    <div className="box-body">
                        <Row gutter={16}>
                            <Col span={12} >
                                <div className="dashboard-comment-list">
                                    <div className="box-title">
                                        最新评论10条展示
                                    </div>
                                    <div className="box-content">
                                        <div className="comment-item">
                                            <span className="comment-nickname">冷夜流星</span> 在《<a href="#">基于node+express+log4js的前端异常信息监控</a>》 中说
                                            <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>2017-03-12 01:00:03</p>
                                            <div className="clearfix">
                                                <img alt="message user image" className="avatar" src="/admin/images/avatar/256.png" />
                                                <div className="comment-content">楼上说“因为她不喜欢你”的都对，为了楼主心情好受点，我再说一句“因为她喜欢女孩子”楼上说“因为她不喜欢你”的都对，为了楼主心情好受点，我再说一句“因为她喜欢女孩子”楼上说“因为她不喜欢你”的都对，为了楼主心情好受点，我再说一句“因为她喜欢女孩子”</div>
                                            </div>
                                        </div>
                                        <div className="comment-item">
                                            <span className="comment-nickname">冷夜流星</span> 在《<a href="#">基于node+express+log4js的前端异常信息监控</a>》 中说
                                            <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>2017-03-12 01:00:03</p>
                                            <div className="clearfix">
                                                <img alt="message user image" className="avatar" src="/admin/images/avatar/261.png" />
                                                <div className="comment-content">楼上说“因为她不喜欢你”的都对，</div>
                                            </div>
                                        </div>
                                        <div className="comment-item">
                                            <span className="comment-nickname">冷夜流星</span> 在《<a href="#">基于node+express+log4js的前端异常信息监控</a>》 中说
                                            <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>2017-03-12 01:00:03</p>
                                            <div className="clearfix">
                                                <img alt="message user image" className="avatar" src="/admin/images/avatar/257.png" />
                                                <div className="comment-content">楼上说“因为她不喜欢你”的都对，</div>
                                            </div>
                                        </div>
                                        <div className="comment-item">
                                            <span className="comment-nickname">冷夜流星</span> 在《<a href="#">基于node+express+log4js的前端异常信息监控</a>》 中说
                                            <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>2017-03-12 01:00:03</p>
                                            <div className="clearfix">
                                                <img alt="message user image" className="avatar" src="/admin/images/avatar/258.png" />
                                                <div className="comment-content">楼上说“因为她不喜欢你”的都对，</div>
                                            </div>
                                        </div>
                                        <div className="comment-item">
                                            <span className="comment-nickname">冷夜流星</span> 在《<a href="#">基于node+express+log4js的前端异常信息监控</a>》 中说
                                            <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>2017-03-12 01:00:03</p>
                                            <div className="clearfix">
                                                <img alt="message user image" className="avatar" src="/admin/images/avatar/259.png" />
                                                <div className="comment-content">楼上说“因为她不喜欢你”的都对，</div>
                                            </div>
                                        </div>
                                        <div className="comment-item">
                                            <span className="comment-nickname">冷夜流星</span> 在《<a href="#">基于node+express+log4js的前端异常信息监控</a>》 中说
                                            <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>2017-03-12 01:00:03</p>
                                            <div className="clearfix">
                                                <img alt="message user image" className="avatar" src="/admin/images/avatar/260.png" />
                                                <div className="comment-content">楼上说“因为她不喜欢你”的都对，</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12} >
                                <div className="dashboard-comment-list">
                                    <div className="box-title">
                                        博主基本信息
                                    </div>
                                    <div className="box-content">
                                        <div className="user-info">
                                            <p><b>昵称：</b>冷夜流星</p>
                                            <p><b className="">邮箱：</b>845177026@qq.com</p>
                                            <p><b className="">QQ：</b>845177026</p>
                                            <p><b className="">位置：</b>845177026</p>
                                            <p><b className="">头像：</b><img style={{ height: 40, with: 40 }} src="/admin/images/avatar/257.png" alt="" /></p>
                                            <p><b className="">格言：</b>845177026</p>
                                            <p><b className="">Github：</b>845177026</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Content>
        );
    }
};

export default Form.create()(DashboardForm)