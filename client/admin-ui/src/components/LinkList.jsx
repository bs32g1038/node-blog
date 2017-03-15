import React, { Component } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
const { Content } = Layout;
import LinkEditModal from './LinkEditModal';
import LinkListItem from './LinkListItem';
import { loadLinks, saveLink, deleteLink } from '../actions/LinkActions';

class LinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            link: null
        }
    }
    showModal = (link) => {
        this.setState({ link: link, visible: true })
    }
    onOk = () => {
        const { dispatch } = this.props;
        const { link } = this.state;
        this.form.validateFields((err, data) => {
            if (!err) {
                dispatch(saveLink(link && link._id, data));
                this.form.resetFields()
                this.setState({ visible: false });
            }
        });
    }
    onCancel = () => {
        this.setState({ visible: false })
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    deleteLink = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteLink(id))
    }
    onLinkListChange = (pagination) => {
        const { dispatch } = this.props;
        dispatch(loadLinks({
            per_page: pagination.pageSize,
            page: pagination.current
        }))
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadLinks({}));
    }
    render() {
        const { loading, items } = this.props.links;
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
                    <Button type="primary" onClick={() => (this.showModal({}))}><i className="fa fa-plus-square fa-fw"></i>&nbsp;&nbsp;添加链接</Button>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <LinkEditModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                    link={this.state.link}
                >
                </LinkEditModal>
                <LinkListItem
                    rowSelection={rowSelection}
                    dataSource={items}
                    loading={loading}
                    onChange={this.onLinkListChange}
                    editLink={this.showModal}
                    deleteLink={this.deleteLink}
                ></LinkListItem>
            </Content>
        );
    }

}

export default LinkList;