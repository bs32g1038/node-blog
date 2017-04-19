import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import { parseTime } from '../libs/parse-time';
const { Column } = Table;

class CategoryListItem extends Component {
    render() {
        const { dataSource, rowSelection, loading, onChange, editCategory, deleteCategory } = this.props;
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
                    render={text => <a href="#">{text}</a>}
                />
                <Column
                    title='别称'
                    dataIndex='alias'
                />
                <Column
                    title='权重'
                    dataIndex='order'
                />
                <Column
                    title='创建时间'
                    dataIndex='create_at'
                    render={(text, record) => (parseTime(text))}
                />
                <Column
                    title='文章数量'
                    dataIndex='article_count'
                />
                <Column
                    title='操作'
                    key='action'
                    render={(text, record) => (
                        <span>
                            <a onClick={() => editCategory(record)}><i className="fa fa-edit fa-fw"></i>修改</a>
                            <span className="ant-divider" />
                            <Popconfirm title="确定要删除？" onConfirm={() => deleteCategory(record._id)} onCancel={() => { }} okText="Yes" cancelText="No">
                                <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        )
    }
}

export default CategoryListItem