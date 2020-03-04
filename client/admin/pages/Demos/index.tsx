import React, { useEffect, useState } from 'react';
import axios from '@blog/client/admin/axios';
import queryString from 'query-string';
import { Table, Button, Collapse, message, Form, Input, TimePicker } from 'antd';
import { PanelDiv } from '@blog/client/admin/styles';
import Router from 'next/router';
import { EyeFilled, PlusOutlined, DeleteFilled, SettingOutlined, ForkOutlined } from '@ant-design/icons';
import BasicLayout from '@blog/client/admin/layouts/BasicLayout';
import { ConfigWrap } from './style';
import { useForm } from 'antd/lib/form/util';

const fetchConfig = () => {
    return axios.get('/configs');
};

const updateConfig = data => {
    return axios.put('/configs', data);
};

const pullDemo = () => {
    return axios.post('/demo/git');
};

export default () => {
    const [state, setState] = useState({
        demos: [],
        pagination: { current: 1, total: 0 },
        selectedRowKeys: [],
        loading: false,
        visible: false,
    });
    const fetchData = (page = 1, limit = 10) => {
        setState(data => ({
            ...data,
            loading: true,
        }));
        const query = {
            limit,
            page,
        };
        axios.get('/demos?' + queryString.stringify(query)).then(res => {
            const pagination = { ...state.pagination };
            pagination.total = res.data.totalCount;
            setState(data => ({
                ...data,
                demos: res.data.items,
                loading: false,
                pagination,
            }));
        });
    };
    useEffect(() => {
        fetchData();
    }, [1]);
    const getTableColums = () => {
        return [
            {
                title: '名称',
                dataIndex: 'name',
            },
            {
                title: 'url',
                dataIndex: 'url',
            },
            {
                title: '操作',
                key: 'operation',
                width: 300,
                render: (text, record) => (
                    <div>
                        <Button
                            target="_blank"
                            type="primary"
                            size="small"
                            title="预览"
                            href={'/blog/demos?name=' + record.name}
                            icon={<EyeFilled />}
                        >
                            预览
                        </Button>
                    </div>
                ),
            },
        ];
    };
    const onFinish = values => {
        updateConfig({
            demo: values,
        }).then(() => {
            message.success('更新成功');
        });
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [activePanel, setActivePanel] = useState('0');
    const [isLoading, setLoading] = useState(false);
    const [form] = useForm();
    return (
        <BasicLayout>
            <div className="main-content">
                <ConfigWrap>
                    <PanelDiv>
                        <Button
                            type="primary"
                            icon={<SettingOutlined />}
                            onClick={() => {
                                if (activePanel !== '1') {
                                    fetchConfig().then(res => {
                                        form.setFieldsValue(res.data.demo);
                                    });
                                    return setActivePanel('1');
                                }
                                return setActivePanel('0');
                            }}
                        >
                            配置demo
                        </Button>
                        <Button
                            loading={isLoading}
                            type="primary"
                            icon={<ForkOutlined />}
                            onClick={() => {
                                setLoading(true);
                                pullDemo().then(() => {
                                    message.success('拉取成功');
                                    setLoading(false);
                                });
                            }}
                            danger={true}
                        >
                            拉取demo
                        </Button>
                    </PanelDiv>
                    <Collapse bordered={false} activeKey={[activePanel]}>
                        <Collapse.Panel showArrow={false} header={''} key="1" disabled={true}>
                            <Form
                                className="form"
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item>
                                    <Form.Item
                                        name="git"
                                        label="git链接"
                                        rules={[{ required: true, message: '请输入一个有效的git链接!' }]}
                                    >
                                        <Input size="large" placeholder="请输入git链接" />
                                    </Form.Item>
                                    <p>
                                        网站是通过git自动拉取目标仓库，建议使用github，码云，或者coding等git代码管理仓库
                                    </p>
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item
                                        name="time"
                                        label="定时时间"
                                        rules={[{ type: 'object', message: 'Please select time!' }]}
                                    >
                                        <TimePicker size="large" placeholder="请输入一个时间" />
                                    </Form.Item>
                                    <p>设置时间自动定时拉取git仓库</p>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        保存
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Collapse.Panel>
                    </Collapse>
                </ConfigWrap>
                <div className="table-wrapper">
                    <Table
                        rowKey={record => record._id}
                        columns={getTableColums()}
                        dataSource={state.demos}
                        loading={state.loading}
                        pagination={{
                            showTotal: total => `共 ${total} 条数据`,
                        }}
                    />
                </div>
            </div>
        </BasicLayout>
    );
};
