import React, { Component } from 'react';
import axios from '../../axios';
import queryString from 'query-string';
import { parseTime } from '../../utils/time';
import Clipboard from 'clipboard';
import { Row, Button, Popconfirm, message, Alert, Pagination, Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from './style.module.scss';
const { Meta } = Card;

export default class Medias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medias: new Array(8).fill({}),
            pagination: {},
            loading: false,
            clipboard: null,
        };
    }
    deleteFile(_id) {
        axios.delete('/medias/' + _id).then(() => {
            message.success('删除文件成功');
            this.fetchData();
        });
    }
    fetchData(page = 1, limit = 10) {
        this.setState({ loading: true });
        const query = {
            limit,
            page,
        };
        return axios.get('/medias?' + queryString.stringify(query)).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.totalCount;
            this.setState({
                medias: res.data.items,
                loading: false,
                pagination,
            });
        });
    }
    onShowSizeChange(current, pageSize) {
        const pager = { ...this.state.pagination };
        pager.current = current;
        this.setState({
            pagination: pager,
        });
        this.fetchData(current, pageSize);
    }
    componentDidMount() {
        const c = new Clipboard('.btnCopy');
        this.setState({
            clipboard: c,
        });
        c.on('success', function() {
            message.success('复制链接成功');
        });
        this.fetchData();
    }
    componentWillUnmount() {
        this.state.clipboard.destroy();
    }
    render() {
        return (
            <PageHeaderWrapper title="媒体文件列表" content="控制台----媒体文件列表">
                <div className="main-content">
                    <div className="table-wrapper">
                        {(this.state.loading || this.state.medias.length <= 0) && (
                            <Alert
                                showIcon
                                message="暂无数据..."
                                description="该页面并没有数据，如果是网络问题，请重新刷新。"
                                type="success"
                            />
                        )}
                        <Row type="flex" className={styles.mediaList}>
                            {this.state.medias.map((item, index) => {
                                return (
                                    <Card
                                        loading={this.state.loading}
                                        key={'aaa' + index}
                                        className={styles.card}
                                        cover={
                                            !item._id || this.state.loading ? (
                                                false
                                            ) : (
                                                <img
                                                    alt={item.originalName}
                                                    src={item.filePath + '/' + item.fileName}
                                                />
                                            )
                                        }
                                        actions={[
                                            <Button
                                                key="viewButton"
                                                size="small"
                                                title="查看大图"
                                                href={'//' + window.location.host + item.filePath + '/' + item.fileName}
                                                target="_blank"
                                                className={styles.button + ' ' + styles.buttonView}
                                            >
                                                <i className="fa fa-eye fa-fw" style={{ color: '#fff' }}></i>
                                                大图
                                            </Button>,
                                            <Button
                                                key="copyButton"
                                                type="primary"
                                                size="small"
                                                title="复制"
                                                data-clipboard-text={
                                                    window.location.host + item.filePath + '/' + item.fileName
                                                }
                                                className={styles.button}
                                            >
                                                <i className="fa fa-link fa-fw" style={{ color: '#fff' }}></i>
                                                复制
                                            </Button>,
                                            <Popconfirm
                                                key="confirmButton"
                                                title="确认要删除？"
                                                onConfirm={() => this.deleteFile(item._id)}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <Button
                                                    type="danger"
                                                    size="small"
                                                    title="删除"
                                                    className={styles.button}
                                                >
                                                    <i className="fa fa-trash-o fa-fw" style={{ color: '#fff' }}></i>
                                                    删除
                                                </Button>
                                            </Popconfirm>,
                                        ]}
                                    >
                                        <Meta
                                            title={item.originalName}
                                            description={'创建时间：' + parseTime(item.createdAt)}
                                        />
                                    </Card>
                                );
                            })}
                        </Row>
                        <Row type="flex" justify="end" style={{ marginTop: '20px' }}>
                            <Pagination
                                showTotal={total => `共 ${total} 条数据`}
                                showSizeChanger={true}
                                defaultCurrent={this.state.pagination.current}
                                total={this.state.pagination.total}
                                onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
                                onChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
                            />
                        </Row>
                    </div>
                </div>
            </PageHeaderWrapper>
        );
    }
}
