import React from 'react';
import { connect } from 'react-redux';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Avatar, Card, Col, Skeleton, Row, Statistic, Button, List } from 'antd';
import styles from './style.module.scss';
import * as api from './service';
import GHAT from '../../utils/generate-avatar';
import { md5 } from '../../utils/crypto-js';
import { timeAgo } from '../../utils/time';

const ghat = new GHAT();

const links = [
    {
        icon: 'fa-edit',
        title: '文章管理',
        href: '/content/articles',
    },
    {
        icon: 'fa-plus',
        title: '添加文章',
        href: '/content/articles/edit',
    },
    {
        icon: 'fa-comment',
        title: '评论管理',
        href: '/content/comments',
    },
];

const PageHeaderContent = ({ currentUser }) => {
    const loading = currentUser && Object.keys(currentUser).length;
    if (!loading) {
        return <Skeleton avatar paragraph={{ rows: 1 }} active />;
    }
    return (
        <div className={styles.pageHeaderContent}>
            <div className={styles.avatar}>
                <Avatar size="large" src={currentUser.avatar} />
            </div>
            <div className={styles.content}>
                <div className={styles.contentTitle}>
                    {currentUser.name}
                    ，祝你开心每一天！
                </div>
                <div>
                    {currentUser.title} | {currentUser.group}
                </div>
            </div>
        </div>
    );
};

const ExtraContent = ({ statisticalInfo }) => (
    <div className={styles.extraContent}>
        <div className={styles.statItem}>
            <Statistic title="文章数量" value={statisticalInfo.articleCount} />
        </div>
        <div className={styles.statItem}>
            <Statistic title="分类数量" value={statisticalInfo.categoryCount} />
        </div>
        <div className={styles.statItem}>
            <Statistic title="评论数量" value={statisticalInfo.commentCount} />
        </div>
    </div>
);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            statisticalInfo: {},
            userInfo: {},
            systemInfo: {},
            recentComments: [],
            recentAdminLogs: [],
        };
    }

    componentDidMount() {
        this.setState(() => ({
            loading: true,
        }));
        Promise.all([
            api.getStatisticalInfo(),
            api.getUserLoginInfo(),
            api.getSystemInfo(),
            api.getRecentComments(),
            api.getRecentAdminLogs(),
        ]).then(([res1, res2, res3, res4, res5]) => {
            this.setState(() => ({
                statisticalInfo: res1.data,
                userInfo: res2.data,
                systemInfo: res3.data,
                recentComments: res4.data,
                recentAdminLogs: res5.data,
                loading: false,
            }));
        });
    }

    render() {
        return (
            <PageHeaderWrapper
                title="分析页"
                content={
                    <PageHeaderContent
                        currentUser={{
                            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                            name: this.state.userInfo.account,
                            title: this.state.userInfo.type === 'admin' ? '核心管理员' : '普通管理员',
                            group: '前端开发技术部',
                        }}
                    />
                }
                extraContent={<ExtraContent statisticalInfo={this.state.statisticalInfo} />}
            >
                <Row gutter={24}>
                    <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            className={styles.recentCommentList}
                            style={{ marginBottom: 24 }}
                            title="近期评论"
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                            loading={this.state.loading}
                        >
                            <div>
                                {this.state.recentComments.map(item => (
                                    <div className={styles.commentMsg} key={item._id}>
                                        <div className={styles.commentInfo}>
                                            <span className={styles.commentName}>
                                                <span>
                                                    <strong>{item.nickName}</strong>
                                                </span>
                                                &nbsp;在&nbsp;
                                                <a
                                                    href={`/blog/articles/${item._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.contentTitle}
                                                >
                                                    {item.article && item.article.title}
                                                </a>
                                                {item.reply ? (
                                                    <span>
                                                        &nbsp;回复&nbsp;<strong>{item.reply.nickName}</strong>&nbsp;
                                                    </span>
                                                ) : (
                                                    <span>&nbsp;说：&nbsp;</span>
                                                )}
                                            </span>
                                            <span className={styles.timestamp + ' pull-right'}>
                                                <i className="fa fa-clock-o fa-fw"></i>
                                                <span>{timeAgo(item.createdAt)}</span>
                                            </span>
                                        </div>
                                        <div className="random-logo">
                                            <img
                                                alt=""
                                                className={styles.commentLogo}
                                                src={ghat.getImage(md5(item.nickName).toString())}
                                            />
                                        </div>
                                        <div className={styles.commentText}>{item.content}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            className={styles.navPanel}
                            style={{ marginBottom: 24 }}
                            title="便捷导航"
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                            loading={this.state.loading}
                        >
                            <div className={styles.linkGroup}>
                                {links.map(link => (
                                    <Button key={`linkGroup-item-${link.id || link.title}`} href={link.href}>
                                        <i className={`fa fa-fw ${link.icon}`}></i>
                                        {link.title}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                        <Card
                            className={styles.serverState}
                            style={{ marginBottom: 24 }}
                            bordered={false}
                            title="服务器状态"
                            loading={this.state.loading}
                        >
                            <div className={styles.chart}>
                                <p>
                                    <strong>主机名称：</strong>
                                    {this.state.systemInfo.hostname}
                                </p>
                                <p>
                                    <strong>Cpu：</strong>
                                    {this.state.systemInfo.cpus && this.state.systemInfo.cpus[0].model}
                                </p>
                                <p>
                                    <strong>总内存：</strong>
                                    {(this.state.systemInfo.totalmem / 1024 / 1024 / 1024).toFixed(1) + 'G'}
                                </p>
                                <p>
                                    <strong>系统：</strong>
                                    {this.state.systemInfo.type}
                                </p>
                                <p>
                                    <strong>系统版本：</strong>
                                    {this.state.systemInfo.release}
                                </p>
                            </div>
                        </Card>
                        <Card
                            className={styles.serverState}
                            style={{ marginBottom: 24 }}
                            bordered={false}
                            title="操作日志"
                            loading={this.state.loading}
                        >
                            <div className={styles.chart}>
                                {this.state.recentAdminLogs.map(item => (
                                    <List.Item key={item._id}>
                                        <List.Item.Meta
                                            title={<span>{item.data}</span>}
                                            description={
                                                <span className={styles.datetime} title={item.updatedAt}>
                                                    {timeAgo(item.createdAt)} · {item.type}
                                                </span>
                                            }
                                        />
                                    </List.Item>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        dashboard: state.dashboard,
    };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
