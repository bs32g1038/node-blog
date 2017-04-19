import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import { parseTime } from '../libs/parse-time';
const { Column } = Table;

class ArticleListItem extends Component {
    render() {
        const { dataSource, pagination, rowSelection, loading, onChange, editArticle, deleteArticle } = this.props;
        return (
            <Table
                dataSource={dataSource}
                rowKey={(record) => (record._id)}
                pagination={pagination}
                rowSelection={rowSelection}
                onChange={onChange}
                loading={loading}
            >
                <Column
                    title="缩略图"
                    key='img_url'
                    render={(text, record) => (
                        <img style={{ width: 100, height: 70}} src={record.img_url} alt="" />
                    )}
                />
                <Column
                    title='标题'
                    key='title'
                    dataIndex='title'
                    render={(text, record) => (<a href={'article/' + record._id} target="_blank">{text}</a>)}
                />
                <Column
                    title='发布时间'
                    key='create_at'
                    dataIndex='create_at'
                    render={(text, record) => (parseTime(text))}
                />
                <Column
                    title='推荐'
                    key='recommend'
                    dataIndex='recommend'
                    render={(text, record) => (
                        <span>{record.is_recommend ? '是' : '否'}</span>
                    )}
                />
                <Column
                    title='状态'
                    key='state'
                    dataIndex='state'
                    render={(text, record) => (
                        <span>{record.state ? '已发布' : '草稿'}</span>
                    )}
                />
                <Column
                    title='分类'
                    key='category'
                    dataIndex='category'
                    render={(text, record) => (
                        <span>{record.category && record.category.name}</span>
                    )}
                />
                <Column
                    title='来源'
                    key='from'
                    dataIndex='from'
                    render={(text, record) => (
                        <span>{record.from === 1 ? '原创' : '转载'}</span>
                    )}
                />
                <Column
                    title='浏览'
                    key='visit_count'
                    dataIndex='visit_count'
                />
                <Column
                    title='评论'
                    key='comment_count'
                    dataIndex='comment_count'
                />
                <Column
                    title='操作'
                    key='action'
                    render={(text, record) => (
                        <span>
                            <a href="#"><i className="fa fa fa-thumbs-o-up fa-fw"></i>推荐</a>
                            <span className="ant-divider" />
                            <a onClick={() => { editArticle(record._id) }}><i className="fa fa-edit fa-fw"></i>修改</a>
                            <span className="ant-divider" />
                            <Popconfirm title="确定要删除？" onConfirm={() => deleteArticle(record._id)} onCancel={() => { }} okText="Yes" cancelText="No">
                                <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        )
    }
}

export default ArticleListItem