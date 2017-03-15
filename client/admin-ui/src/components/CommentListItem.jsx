import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
const { Column } = Table;
class CommentListItem extends Component {
    render() {
        const { dataSource, pagination, rowSelection, loading, onChange, handlePass, replyComment, deleteComment } = this.props;
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
                    title='文章标题'
                    dataIndex='article_title'
                    render={(text, record) => (<a href={'article/' + record.article._id} target="_blank">{record.article.title}</a>)}
                />
                <Column
                    title='创建时间'
                    dataIndex='create_at'
                />
                <Column
                    title='昵称'
                    dataIndex='nick_name'
                />
                <Column
                    title='身份'
                    dataIndex='identity'
                    render={(text, record) => (
                        <span>{record.identity === 1 ? '游客' : '管理员'}</span>
                    )}
                />
                <Column
                    title='内容'
                    dataIndex='content'
                    width={250}
                />
                <Column
                    title='邮箱'
                    dataIndex='email'
                />
                <Column
                    title='审核'
                    dataIndex='pass'
                    render={(text, record) => (
                        <span>{record.pass ? '通过' : '不通过'}</span>
                    )}
                />
                <Column
                    title='回复给(谁)'
                    dataIndex='reply'
                    width={250}
                    render={(text, record) => (<span>
                        <span className="pale-red ">作者：</span>
                        {record.reply && record.reply.nick_name}
                        <br />
                        <span className="pale-red ">内容：</span>
                        {record.reply && record.reply.content}
                        <br />
                        <span className="pale-red ">创建时间：</span>
                        {record.reply && record.reply.create_at}
                    </span>)}
                />
                <Column
                    title='操作'
                    key='action'
                    width={70}
                    render={(text, record) => (
                        <span>
                            <a href="#" onClick={() => { handlePass(record._id, !record.pass) }}> <i className="fa fa fa-eye fa-fw"></i>{record.pass ? '已审核' : '未审核'}</a>
                            <br />
                            <a href="#" onClick={() => { replyComment(record) }}><i className="fa fa-reply fa-fw"></i>回复</a>
                            <br />
                            <Popconfirm title="确定要删除？" onConfirm={() => deleteComment(record._id)} onCancel={() => { }} okText="Yes" cancelText="No">
                                <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        )
    }
}

export default CommentListItem