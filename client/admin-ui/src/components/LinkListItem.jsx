import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
const { Column } = Table;

class LinkListItem extends Component {
    render() {
        const { dataSource, rowSelection, loading, onChange, editLink, deleteLink } = this.props;
        return (
            <Table
                dataSource={dataSource}
                rowKey={(record) => (record._id)}
                pagination={false}
                rowSelection={rowSelection}
                onChange={onChange}
                loading={loading}
            >
                <Column
                    title='名称'
                    dataIndex='name'
                />
                <Column
                    title='url'
                    dataIndex='url'
                />
                <Column
                    title='操作'
                    key='action'
                    render={(text, record, index) => (
                        <span>
                            <a href="#" onClick={() => { editLink(record) }}><i className="fa fa-edit fa-fw"></i>编辑</a>
                            <span className="ant-divider" />
                            <Popconfirm title="确定要删除？" onConfirm={() => deleteLink(record._id)} onCancel={() => { }} okText="Yes" cancelText="No">
                                <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        )
    }
}

export default LinkListItem