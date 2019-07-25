import React from 'react';
import { connect } from 'react-redux';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Avatar, Card, Col, Skeleton, Row, Statistic } from 'antd';
import styles from './style.module.scss';
import * as api from './service';

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
            systemInfoLoading: false,
            statisticalInfo: {},
            userInfo: {},
            systemInfo: {},
        };
    }

    componentDidMount() {
        this.setState(() => ({
            systemInfoLoading: true,
        }));
        Promise.all([api.getStatisticalInfo(), api.getUserLoginInfo(), api.getSystemInfo()]).then(
            ([res1, res2, res3]) => {
                this.setState(() => ({
                    statisticalInfo: res1.data,
                    userInfo: res2.data,
                    systemInfo: res3.data,
                    systemInfoLoading: false,
                }));
            }
        );
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
                            className={styles.projectList}
                            style={{ marginBottom: 24 }}
                            title="操作面板"
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                        >
                            <div style={{ paddingTop: '20px' }}>welcome!</div>
                        </Card>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            style={{ marginBottom: 24 }}
                            bordered={false}
                            title="服务器状态"
                            loading={this.state.systemInfoLoading}
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
                                    <strong>使用内存：</strong>
                                    {(this.state.systemInfo.freemem / 1024 / 1024 / 1024).toFixed(1) + 'G'}
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
