import React, { Component } from 'react';
import styles from './cssmodule.scss';
import axios from '../../../utils/axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginW: true,
            isLogin: false
        };
    }

    handleRegister() {
        const account = document.getElementById('account').value;
        const password = document.getElementById('password').value;
        axios.post('/chatroom/users/register', {
            account,
            password
        }).then(() => {
            this.setState({
                isLogin: true
            });
        });
    }

    handleLogin() {
        const account = document.getElementById('account').value;
        const password = document.getElementById('password').value;
        axios.post('/chatroom/users/login', {
            account,
            password
        }).then((res) => {
            this.setState({
                isLogin: true
            });
            this.props.getLoginUserData(res.data);
        });
    }

    render() {
        return (
            <div className={styles.loginMask} style={{ display: this.state.isLogin ? 'none' : 'block' }}>
                <form className={styles.loginPanel} autoComplete="off">
                    <h3 className={styles.tip}>
                        <span className={this.state.isLoginW ? styles.tabUserLogin + " " + styles.active : styles.tabUserLogin} onClick={() => this.setState({ isLoginW: true })}>用户登陆</span>
                        <span className={!this.state.isLoginW ? styles.tabUserLogin + " " + styles.active : styles.tabUserLogin} onClick={() => this.setState({ isLoginW: false })}>用户注册</span>
                    </h3>
                    <div className={styles.group}>
                        <label className={styles.label}>
                            账号<span className={styles.red}>*</span>：
                        </label>
                        <input className={styles.input} id="account" name="account" placeholder="请输入用户名" type="text" autoComplete="off" />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>
                            密码<span className={styles.red}>*</span>：
                        </label>
                        <input className={styles.input} id="password" name="password" placeholder="请输入密码" type="password" autoComplete="off" />
                    </div>
                    <div className={styles.footer}>
                        {
                            this.state.isLoginW ?
                                <button type="button" className={styles.loginBtn} onClick={() => this.handleLogin()}>登录</button>
                                :
                                <button type="button" className={styles.loginBtn} onClick={() => this.handleRegister()}>注册</button>
                        }
                    </div>
                </form>
            </div>
        );
    }

}
export default Login;
