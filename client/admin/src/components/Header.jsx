/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-07 16:52:27 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-28 23:00:21
 */

import { Layout } from 'antd';
import React from 'react';
import axios from 'axios';

const { Header } = Layout;


class header extends React.Component {
    state = {
        user: {}
    }
    componentDidMount() {
        let self = this;
        axios.get('/api/admin/login-user').then(function (res) {
            self.setState({ user: res.data });
        })
    }

    render() {
        return (
            <Header className="header">
                <a href="/" className="logo">
                    <img src="/admin/images/logo.png" alt="博客"/>博客后台管理
                </a>
                <div className="fr navbar-nav">
                    <ul>
                        <li className="user-menu">
                            <a href="/admin/articles">
                                <img src="https://www.lizc.me/home/images/logo.jpg" className="user-image" alt="" />
                                <span className="hidden-xs">{this.state.user.nick_name}-博主</span>
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
            window.location = '/admin/user/login';
        })
    }

}

export default header;
