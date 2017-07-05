import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
const { Content } = Layout;
import { fetchDashboard } from '../redux/dashboard';
import initData from 'init-data';
import { parseTime } from '../libs/parse-time';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchDashboard());
    }
    render() {
        const { dashboard } = this.props;
        let commentList = dashboard.comments.items.map(function (item, index) {
            return (
                <div className="comment-item" key={item.id}>
                    <span className="comment-nickname">{item.nick_name}</span> 在《<a href={item.article.id}>{item.article.title}</a>》 中说
                    <p className="comment-time"><i className="fa fa-clock-o fa-fw"></i>{parseTime(item.created_at)}</p>
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
                                    <h4>{dashboard.articles.totalCount}</h4>
                                    <p>文章总数</p>
                                </div>
                            </Col>

                            <Col span={5} >
                                <div>
                                    <h4>{dashboard.comments.totalCount}</h4>
                                    <p>评论总数</p>
                                </div>
                            </Col>
                            <Col span={5} >
                                <div>
                                    <h4>{initData.categories.length}</h4>
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
                                            <p><b>昵称：</b>{initData.admin_role.nick_name}</p>
                                            <p><b className="">邮箱：</b>{initData.admin_role.email}</p>
                                            <p><b className="">QQ：</b>{initData.admin_role.qq}</p>
                                            <p><b className="">位置：</b>{initData.admin_role.location}</p>
                                            <p><b className="">头像：</b><img style={{ height: 40, with: 40 }} src="./images/avatar.png" alt="avatar" /></p>
                                            <p><b className="">格言：</b>{initData.admin_role.motto}</p>
                                            <p><b className="">Github：</b>{initData.admin_role.github}</p>
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

export default Dashboard