import React, { Component } from 'react';
import { Menu, Icon, Layout, Tooltip, Avatar } from 'antd';
import styles from './index.module.scss';
import HeaderDropdown from '../HeaderDropdown';
import config from '../../configs/default.config';
import history from '../../utils/history';

const { Header } = Layout;

class GlobalHeader extends Component {
    state = {
        collapsed: false
    }
    menuClick = e => {
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem(config.tokenKey);
        return history.push('/blog/admin/login');
    };
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        this.setState({
            collapsed: !collapsed
        })
        if (onCollapse) onCollapse(!collapsed);
    };
    render() {
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.menuClick}>
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Header style={{
                padding: '0px',
                width: '100%',
                zIndex: 2
            }}>
                <div className={styles.header}>
                    <Icon
                        className={styles.trigger}
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <span style={{ paddingLeft: '40px' }}><strong>亲爱的主人，欢迎你回来！</strong></span>
                    <div className={styles.right}>
                        <a href="/blog/about" rel="noopener noreferrer" target="_blank"><i className="fa fa-user fa-fw"></i>个人简历</a>
                        <a href="/blog/music" rel="noopener noreferrer" target="_blank"><i className="fa fa-music fa-fw"></i>博客音乐播放器</a>
                        <Tooltip title="help">
                            <a
                                target="_blank"
                                href="https://github.com/bs32g1038/node-blog"
                                rel="noopener noreferrer"
                                className={styles.action}
                            >
                                <Icon type="github" style={{ fontSize: '20px' }} /> Github
                            </a>
                        </Tooltip>
                        <HeaderDropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar
                                    size="small"
                                    className={styles.avatar}
                                    src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}
                                    alt="avatar"
                                />
                                <span className={styles.name}>bs32g1038</span>
                            </span>
                        </HeaderDropdown>
                    </div>
                </div>
            </Header>
        )
    }
}

export default GlobalHeader;