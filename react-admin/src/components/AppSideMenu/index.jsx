import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import cofig from '../../config';
import { Menu } from 'antd';
import './style.scss';
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
        ['/blog/admin/demos'].some(((path) => {
            if (location.pathname.indexOf(path) >= 0) {
                defaultSelectedKeys = ['6'];
                defaultOpenKeys = ['SubMenu-demo'];
            }
        }));
        ['/blog/admin/medias'].some(((path) => {
            if (location.pathname.indexOf(path) >= 0) {
                defaultSelectedKeys = ['8'];
                defaultOpenKeys = ['SubMenu-medias'];
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
                    <SubMenu key="SubMenu-demos" title={<span><i className="fa fa-codepen fa-fw"></i><span>代码管理</span></span>}>
                        <Menu.Item key="6"><Link to="/blog/admin/demos"><i className="fa fa-globe fa-fw"></i>代码demo</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/blog/admin/demos/static-files"><i className="fa fa-folder-open fa-fw"></i>静态文件</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="SubMenu-medias" title={<span><i className="fa fa-trophy fa-fw"></i><span>媒体管理</span></span>}>
                        <Menu.Item key="8"><Link to="/blog/admin/medias"><i className="fa fa-globe fa-fw"></i>图片列表</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
export default withRouter(AppSideMenu);