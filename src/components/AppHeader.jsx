import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config';

class AppHeader extends Component {
    loginOut() {
        localStorage.removeItem(config.tokenKey);
        const { history } = this.props;
        return history.push('/blog/admin/login');
    }
    render() {
        return (
            <header className="app-header">
                <h1 className="site-name">个人博客后台</h1>
                <nav className="app-header-nav">
                    <div style={{ paddingLeft: '40px' }}><strong>亲爱的主人，欢迎你回来！</strong></div>
                    <div className="app-header-nav-main">
                        <a href="/blog/about" rel="noopener noreferrer" target="_blank"><i className="fa fa-user fa-fw"></i>个人简历</a>
                        <a href="/blog/music" rel="noopener noreferrer" target="_blank"><i className="fa fa-music fa-fw"></i>博客音乐播放器</a>
                        <a href="javascript:;" onClick={() => this.loginOut()}><i className="fa fa-power-off  fa-fw"></i>注销</a>
                        <a href="https://github.com/bs32g1038/node-blog" rel="noopener noreferrer" target="_blank">
                            <svg height="24" width="24" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}
export default withRouter(AppHeader);