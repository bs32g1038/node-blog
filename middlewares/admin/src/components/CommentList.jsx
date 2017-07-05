import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Table, Popconfirm, Modal } from 'antd';
const { Content } = Layout;
import CommentReplyForm from './CommentReplyForm'
import { parseTime } from '../libs/parse-time';
const { Column } = Table;
import { fetchComments, addComment, deleteComment } from '../redux/comment';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      visible: false,
      comment: {},
      loading: false
    }
  }
  showModal = (comment) => {
    this.setState({ comment: comment, visible: true })
  }
  onOk = () => {
    const { dispatch } = this.props;
    this.form.validateFields((err, values) => {
      if (!err) {
        dispatch(addComment(values)).then(() => {
          this.setState({ visible: false })
        })
      }
    });
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  deleteComment = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteComment(id))
  }
  onChange = (pagination) => {
    this.fetchData({
      per_page: pagination.pageSize,
      page: pagination.current
    })
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  fetchData = ({ page, per_page }) => {
    const { dispatch } = this.props;
    this.setState({ loading: true })
    return dispatch(fetchComments({ page, per_page })).then((data) => {
      this.setState({ loading: false })
    }).catch(function (err) {
    })
  }
  componentWillMount() {
    this.fetchData({});
  }
  render() {
    const { items, totalCount } = this.props.comments;
    const pagination = { total: totalCount };
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>文章管理</Breadcrumb.Item>
          <Breadcrumb.Item>评论列表</Breadcrumb.Item>
        </Breadcrumb>
        <div className='panel'>
          <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
        </div>
        <Table
          dataSource={items}
          rowKey={(record) => (record.id)}
          pagination={pagination}
          rowSelection={rowSelection}
          onChange={this.onChange}
          loading={this.state.loading}
        >
          <Column
            title='文章标题'
            dataIndex='article_title'
            render={(text, record) => (<a href={'article/' + record.article.id} target="_blank">{record.article.title}</a>)}
          />
          <Column
            title='创建时间'
            dataIndex='created_at'
            render={(text, record) => (parseTime(text))}
          />
          <Column
            title='昵称'
            dataIndex='nick_name'
          />
          <Column
            title='身份'
            dataIndex='identity'
            render={(text, record) => (
              <span>{record.identity == 1 ? '管理员' : '游客'}</span>
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
            title='回复给(谁)'
            dataIndex='reply'
            render={(text, record) => (record.reply && record.reply.nick_name)}
          />
          <Column
            title='操作'
            key='action'
            width={70}
            render={(text, record) => (
              <span>
                <a href="#" onClick={() => { this.showModal(record) }}><i className="fa fa-reply fa-fw"></i>回复</a>
                <br />
                <Popconfirm title="确定要删除？" onConfirm={() => this.deleteComment(record.id)} onCancel={() => { }} okText="Yes" cancelText="No">
                  <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                </Popconfirm>
              </span>
            )}
          />
        </Table>
        <Modal
          visible={this.state.visible}
          title="回复评论"
          okText="提交"
          onCancel={this.onCancel}
          onOk={this.onOk}
        >
          <CommentReplyForm
            comment={this.state.comment}
            ref={this.saveFormRef}
          ></CommentReplyForm>
        </Modal>
      </Content>
    );
  }

}

export default CommentList;