/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-07 16:52:27
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 10:54:53
 */

import React from 'react';
import axios from 'axios';
import initData from 'init-data';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
import { Link } from 'react-router'

class header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initData
    }
  }
  render() {
    let { user } = this.props;
    console.log(user, this.props)
    return (
      <Header className="header" style={{ margin: '0 auto', width: '1100px' }}>
        <a href="/" className="logo"> {initData.setting.name}-后台 </a>
        <Menu
          theme="dark"
        >
          <Menu.Item key="0">
            <Link to="/admin"><i className="fa fa-dashboard fa-fw" />
              <span className="nav-text">管理首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/admin/articles"><i className="fa fa-file fa-fw" />
              <span className="nav-text">文章列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/comments"><i className="fa fa-comment fa-fw" />
              <span className="nav-text">评论列表</span>
            </Link>
          </Menu.Item>
        </Menu>
        <div className="fr navbar-nav">
          <ul>
            <li className="user-menu">
              <a href="/admin/articles">
                <img src="./images/avatar.png" className="user-image" alt="" />
                <span className="hidden-xs">{initData.admin_role.nick_name}-博主</span>
              </a>
            </li>
            <li>
              <a onClick={() => (this.handleSignOut())}><i className="fa fa-power-off fa-fw" ></i>注销</a>
            </li>
          </ul>
        </div>
      </Header>
    );
  }

  handleSignOut() {
    let base_url = '/api/admin/sessions/user';
    axios.delete(base_url).then(function (res) {
      window.location = '/admin/login';
    })
  }

}

export default header