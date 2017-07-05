import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, Form, message, Modal, Table, Popconfirm } from 'antd';
const { Column } = Table;
const FormItem = Form.Item;
import { parseTime } from '../libs/parse-time';
import ArticleEditForm from './ArticleEditForm';
import { fetchArticles, fetchArticle, saveArticle, softDeleteArticle } from '../redux/article';
import initData from 'init-data';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      visible: false,
      article: {},
      confirmLoading: false,
      loading: false
    };
  }

  showModal = (id) => {
    // this.form.resetFields();
    const { dispatch } = this.props;
    if (id) {
      return dispatch(fetchArticle(id)).then((data) => {
        this.setState({ article: data.article, visible: true })
      })
    }
    this.setState({ article: {}, visible: true })
  }
  onOk = () => {
    const { dispatch } = this.props;
    this.form.validateFields((err, data) => {
      // 对表单中的图片字段进行特殊处理，只上传图片的url
      data.img_url = data.img_url[0].url;
      if (!err) {
        this.setState({ confirmLoading: true })
        dispatch(saveArticle(this.state.article.id, data)).then((err) => {
          console.log(err)
          this.setState({ confirmLoading: false, visible: false })
        });
      }
    });
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  onChange = (pagination) => {
    this.fetchData({
      per_page: pagination.pageSize,
      page: pagination.current
    });
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  deleteArticle = (id) => {
    const { dispatch } = this.props;
    dispatch(softDeleteArticle(id))
  }
  fetchData = ({ page, per_page }) => {
    const { dispatch } = this.props;
    this.setState({ loading: true })
    dispatch(fetchArticles({ page, per_page })).then((data) => {
      this.setState({ loading: false })
    }).catch(function (err) {
    })
  }

  componentWillMount() {
    this.fetchData({})
  }

  render() {
    const { items, totalCount } = this.props.articles;
    const pagination = { total: totalCount };
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>文章管理</Breadcrumb.Item>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
        </Breadcrumb>
        <div className='panel'>
          <Button className="ant-btn ant-btn-primary" onClick={() => (this.showModal())}><i
            className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加文章</Button>
          <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
          <div className="fr">
            <Form layout='inline' onSubmit={this.handleSubmit}>
              <FormItem>
                <input type="input" placeholder="请输入搜索关键字" className="ant-input" />
              </FormItem>
              <Button type="primary" htmlType="submit">搜索</Button>
            </Form>
          </div>
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
            title="缩略图"
            key='img_url'
            render={(text, record) => (
              <img style={{ width: 100, height: 70 }} src={record.img_url} alt="" />
            )}
          />
          <Column
            title='标题'
            key='title'
            dataIndex='title'
            render={(text, record) => (<a href={'article/' + record.id} target="_blank">{text}</a>)}
          />
          <Column
            title='发布时间'
            key='create_at'
            dataIndex='created_at'
            render={(text) => (parseTime(text))}
          />
          <Column
            title='状态'
            key='is_published'
            dataIndex='is_published'
            render={(text, record) => (
              <span>{record.is_published ? '已发布' : '草稿'}</span>
            )}
          />
          <Column
            title='分类'
            key='category'
            dataIndex='category'
            render={(text, record) => {
              for (let category of initData.categories) {
                console.log(record.category)

                if (category.alias == record.category) {
                  return (
                    <span>{category.name}</span>
                  )
                }
              }
              return ''
            }}
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
              <div>
                <a onClick={() => {
                  this.showModal(record.id)
                }}><i className="fa fa-edit fa-fw"></i>修改</a>
                <span className="ant-divider"></span>
                <Popconfirm title="确定要删除？" onConfirm={() => this.deleteArticle(record.id)} onCancel={() => {
                }} okText="Yes" cancelText="No">
                  <a href="#"><i className="fa fa-trash-o fa-fw"></i>删除</a>
                </Popconfirm>
              </div>
            )}
          />
        </Table>
        <Modal
          visible={this.state.visible}
          title={this.state.article.id ? '编辑文章' : '添加文章'}
          okText="提交"
          width={960}
          onOk={this.onOk}
          onCancel={this.onCancel}
          confirmLoading={this.state.confirmLoading}
          maskClosable={false}
        >
          <ArticleEditForm
            key={this.state.article.id}
            article={this.state.article}
            ref={this.saveFormRef}
            categories={initData.categories}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleList;
