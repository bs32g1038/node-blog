import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';


const renderMenuItem = item => ( // item.route 菜单单独跳转的路由
    <Menu.Item
        key={item.path}
    >
        <Link to={(item.route || item.path) + (item.query || '')}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => (
    <Menu.SubMenu
        key={item.path}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text">{item.title}</span>
            </span>
        }
    >
        {item.routes.filter(item => item.title && !item.hideInMenu).map(item => renderMenuItem(item)).filter((item) => item)}
    </Menu.SubMenu>
);

export default ({ menus, ...props }) => (
    <Menu {...props}>
        {menus&& menus.filter(item => item.title && !item.hideInMenu)
            .map(item => {
                if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.title)) {
                    return renderSubMenu(item)
                }
                return renderSubMenu(item)
            })
            .filter(item => item)
        }
    </Menu>
);