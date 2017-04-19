import React, { Component } from 'react';
import { Form, Input, Button, Layout, Breadcrumb, notification, Row, Col } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
import axios from 'axios';


class DashboardForm extends Component {
    constructor(props) {
        super(props)
        notification.config({
            top: 60,
            duration: 4,
        });
        this.state = {
            dashboard: {
                brief: {},
                user: {},
                comments: {
                    items: [],
                    totalItems: 0
                }
            }
        }
    }
    fetch = () => {
        let self = this;
        axios.get('/api/admin/dashboard').then((res) => {
            console.log(res)
            self.setState({
                dashboard: res.data,
            })
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        const { dashboard } = this.state;
        console.log(dashboard.comments)
        let commentList = dashboard.comments.items.map(function (item, index) {
            return (
                <div className="comment-item" key={item._id}>
                    <span className="comment-nickname">{item.nick_name}</span> 在《<a href={item.article._id}>{item.article.title}</a>》 中说
                    <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>{item.create_at}</p>
                    <div className="clearfix">
                        <img alt="message user image" className="avatar" src={'/admin/images/avatar/' + (256 + index) + '.png'} />
                        <div className="comment-content">{item.content}</div>
                    </div>
                </div>
            )
        })

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
                            <Col span={5} >
                                <div className="article-count">
                                    <h4>{dashboard.brief.article_count}</h4>
                                    <p>文章总数</p>
                                </div>
                            </Col>
                            <Col span={5} >
                                <div>
                                    <h4>{dashboard.brief.guestbook_count}</h4>
                                    <p>留言总数</p>
                                </div>
                            </Col>
                            <Col span={5} >
                                <div>
                                    <h4>{dashboard.brief.comment_count}</h4>
                                    <p>评论总数</p>
                                </div>
                            </Col>
                            <Col span={5} >
                                <div>
                                    <h4>{dashboard.brief.category_count}</h4>
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
                                        {commentList}
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
                                            <p><b>昵称：</b>{dashboard.user.nick_name}</p>
                                            <p><b className="">邮箱：</b>{dashboard.user.email}</p>
                                            <p><b className="">QQ：</b>{dashboard.user.qq}</p>
                                            <p><b className="">位置：</b>{dashboard.user.location}</p>
                                            <p><b className="">头像：</b><img style={{ height: 40, with: 40 }} src={dashboard.user.img_url} alt="avatar" /></p>
                                            <p><b className="">格言：</b>{dashboard.user.motto}</p>
                                            <p><b className="">Github：</b>{dashboard.user.github}</p>
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