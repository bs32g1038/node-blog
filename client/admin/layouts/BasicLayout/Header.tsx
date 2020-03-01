import React, { useState } from 'react';
import {
    MenuFoldOutlined as MenuFoldOutlinedIcon,
    MenuUnfoldOutlined as MenuUnfoldOutlinedIcon,
    QuestionCircleOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Tooltip, Avatar as _Avatar, Dropdown } from 'antd';
import config from '../../configs/default.config';
import Router from 'next/router';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

const Header = styled(Layout.Header)`
    background-color: #fff;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 2;
`;

const TriggerIcon = styled.div`
    display: inline-block;
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
`;

const RightDiv = styled.div`
    float: right;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-content: center;
    a {
        color: #71777c;
        transition: color 0.15s ease;
        display: inline-block;
        font-weight: 300;
        letter-spacing: 1.2px;
        margin: 0 15px;
        font-size: 24px;
        cursor: pointer;
        &:nth-of-type(10) {
            margin-right: 0;
        }
    }
    .action {
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
        .opened {
            background: rgba(0, 0, 0, 0.025);
        }
    }
`;

const Avatar = styled(_Avatar)`
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    margin: 20px 8px 20px 0;
    color: #1890ff;
    vertical-align: top;
    > img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

interface Props {
    collapsed: boolean;
    onCollapse: Function;
}

const coverStringToJson = data => {
    if (!isEmpty(data)) {
        data = JSON.parse(data);
    }
    return data;
};

export default (props: Props) => {
    const [state, setState] = useState({
        collapsed: false,
    });
    const logout = () => {
        localStorage.removeItem(config.tokenKey);
        return Router.push('/admin/login');
    };
    const toggle = () => {
        const { collapsed, onCollapse } = props;
        setState({
            collapsed: !collapsed,
        });
        if (onCollapse) onCollapse(!collapsed);
    };
    const menuClick = e => {
        e.key === 'logout' && logout();
    };
    const userInfo = coverStringToJson(localStorage.getItem(config.userInfoKey)) || {};
    const menu = (
        <Menu selectedKeys={[]} onClick={menuClick}>
            <Menu.Item key="logout">
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    );
    return (
        <Header>
            <TriggerIcon onClick={toggle}>
                {state.collapsed ? <MenuUnfoldOutlinedIcon /> : <MenuFoldOutlinedIcon />}
            </TriggerIcon>
            <span style={{ paddingLeft: '40px' }}>
                <strong>亲爱的主人，欢迎你回来！</strong>
            </span>
            <RightDiv>
                <Tooltip title="帮助">
                    <a target="_blank" href={config.siteInfo.github} rel="noopener noreferrer" className="action">
                        <QuestionCircleOutlined style={{ fontSize: '18px' }} />
                    </a>
                </Tooltip>
                <Dropdown overlay={menu}>
                    <span className="action">
                        <Avatar
                            size="small"
                            src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}
                            alt="avatar"
                        />
                        <span className="name">{userInfo.account}</span>
                    </span>
                </Dropdown>
            </RightDiv>
        </Header>
    );
};
