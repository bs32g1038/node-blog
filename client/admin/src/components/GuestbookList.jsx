import React, { Component } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
const { Content } = Layout;
import GuestbookReplyModal from './GuestbookReplyModal';
import GuestbookListItem from './GuestbookListItem'
import { loadGuestbooks, updateGuestbookReplyContent, deleteGuestbook, handlePass } from '../actions/GuestbookActions';

class GuestbookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            guestbook: null
        }
    }
    showModal = (guestbook) => {
        this.setState({ guestbook: guestbook, visible: true })
    }
    onOk = () => {
        const { dispatch } = this.props;
        const { guestbook } = this.state;
        this.form.validateFields((err, data) => {
            if (!err) {
                dispatch(updateGuestbookReplyContent(guestbook && guestbook._id, data.reply_content));
                this.setState({ visible: false })
            }
        });
    }
    onCancel = () => {
        this.setState({ visible: false })
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    deleteGuestbook = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteGuestbook(id))
    }
    onGuestbookListChange = (pagination) => {
        const { dispatch } = this.props;
        dispatch(loadGuestbooks({
            per_page: pagination.pageSize,
            page: pagination.current
        }))
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadGuestbooks({}));
    }
    render() {
        const { loading, items, pagination } = this.props.guestbooks;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>留言管理</Breadcrumb.Item>
                    <Breadcrumb.Item>留言列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className='panel'>
                    <Button type="danger"><i className="fa fa-trash-o fa-fw"></i>&nbsp;&nbsp;批量删除</Button>
                </div>
                <GuestbookListItem
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    dataSource={items}
                    loading={loading}
                    pagination={pagination}
                    onChange={this.onGuestbookListChange}
                    handlePass={this.handleGuestbookPass}
                    deleteGuestbook={this.deleteGuestbook}
                    replyGuestbook={this.showModal}
                >
                </GuestbookListItem>
                <GuestbookReplyModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                    guestbook={this.state.guestbook}
                >
                </GuestbookReplyModal>
            </Content>
        );
    }
}

export default GuestbookList;