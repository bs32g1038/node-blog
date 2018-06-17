import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.scss';
import cofig from '../../config';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

class AppSideMenu extends Component {
    render() {
        const location = this.props.location;
        let defaultSelectedKeys = ['1'];
        let defaultOpenKeys = ['SubMenu-blog'];
        ['/blog/admin/articles', '/blog/admin/categories', '/blog/admin/comments'].some(((path, index) => {
            if (location.pathname.indexOf(path) >= 0) {
                defaultSelectedKeys = [index + 1 + ''];
            }
        }));
        ['/blog/admin/guestbooks'].some(((path) => {
            if (location.pathname.indexOf(path) >= 0) {
                defaultSelectedKeys = ['4'];
                defaultOpenKeys = ['SubMenu-guestbook'];
            }
        }));
        ['/blog/admin/links'].some(((path) => {
            if (location.pathname.indexOf(path) >= 0) {
                defaultSelectedKeys = ['5'];
                defaultOpenKeys = ['SubMenu-links'];
            }
        }));
        ['/blog/admin/chatroom/groups'].some(((path) => {
            if (location.pathname.indexOf(path) >= 0) {
                defaultSelectedKeys = ['6'];
                defaultOpenKeys = ['SubMenu-chatroom'];
            }
        }));
        const { siteInfo } = cofig;
        return (
            <div className="app-side-menu">
                <h1 className="app-side-menu-siteName"><i className="fa fa-css3 fa-fw"></i>{siteInfo.name}后台</h1>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 200 }}
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                >
                    <SubMenu key="SubMenu-blog" title={<span><i className="fa fa-pencil-square-o fa-fw"></i><span>博客管理</span></span>}>
                        <Menu.Item key="1"><Link to="/blog/admin/articles"><i className="fa fa-file fa-fw"></i>文章管理</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/blog/admin/categories"><i className="fa fa-folder fa-fw"></i>分类管理</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/blog/admin/comments"><i className="fa fa-comments fa-fw"></i>评论管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="SubMenu-guestbook" title={<span><i className="fa fa-coffee fa-fw"></i><span>留言管理</span></span>}>
                        <Menu.Item key="4"><Link to="/blog/admin/guestbooks"><i className="fa fa-list-ul fa-fw"></i>留言列表</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="SubMenu-links" title={<span><i className="fa fa-link fa-fw"></i><span>友情管理</span></span>}>
                        <Menu.Item key="5"><Link to="/blog/admin/links"><i className="fa fa-globe fa-fw"></i>友链列表</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="SubMenu-chatroom" title={<span><i className="fa fa-comments fa-fw"></i><span>聊天室管理</span></span>}>
                        <Menu.Item key="6"><Link to="/blog/admin/chatroom/groups"><i className="fa fa-institution fa-fw"></i>房间管理</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/blog/admin/chatroom/users"><i className="fa fa-user fa-fw"></i>用户管理</Link></Menu.Item>
                        <Menu.Item key="8"><Link to="/blog/admin/comments"><i className="fa fa-comments fa-fw"></i>评论管理</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
export default withRouter(AppSideMenu);