import React from 'react';
import { Layout, Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
import { Link } from 'react-router'

const sider = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: [],
        };
    },
    handleClick(e) {
        console.log('Clicked: ', e);

        this.setState({ current: e.key });
    },
    onOpenChange(openKeys) {

        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    },
    getAncestorKeys(key) {
        const map = {
            sub6: ['sub5'],
        };
        return map[key] || [];
    },
    render() {
        return (
            <Sider>
                <Menu mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                >
                    <SubMenu key="sub0" title={<span><i className="fa fa-home fa-fw" />
                        <span className="nav-text">管理首页</span></span>}>
                        <Menu.Item key="0">
                            <i className="fa fa-eye fa-fw" />
                            <span className="nav-text">首页导航</span>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" title={<span> <i className="fa fa-edit fa-fw" />
                        <span className="nav-text">文章管理</span></span>}>
                        <Menu.Item key="1">
                            <Link to="/admin/articles"><i className="fa fa-file fa-fw" />文章列表</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/admin/categorys"> <i className="fa fa-folder fa-fw" />分类列表</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/admin/comments"><i className="fa fa-comment fa-fw" />评论列表</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <i className="fa fa-trash-o fa-fw" />
                            <span className="nav-text">回收站</span>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><i className="fa fa-book fa-fw" />
                        <span className="nav-text">留言管理</span></span>}>
                        <Menu.Item key="5">
                            <Link to="/admin/guestbooks"><i className="fa fa-envelope fa-fw" />留言列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><i className="fa fa-user fa-fw" />
                        <span className="nav-text">博主信息</span></span>}>
                        <Menu.Item key="6">
                            <Link to="/admin/users/bs32g1038/edit">
                                <i className="fa fa-info-circle fa-fw" />基础信息
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/admin/abouts/admin/edit">
                                <i className="fa fa-mortar-board fa-fw" />关于我
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><i className="fa fa-globe fa-fw" />
                        <span className="nav-text">友情链接</span></span>}>
                        <Menu.Item key="8">
                            <Link to="/admin/links">
                                <i className="fa fa-link fa-fw" />友情链接列表
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><i className="fa fa-cogs fa-fw" />
                        <span className="nav-text">系统配置</span></span>}>
                        <Menu.Item key="9">
                            <Link to="/admin/settings/setting/edit">
                                <i className="fa fa-cog fa-fw" />基础配置
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}
)

export default sider;

