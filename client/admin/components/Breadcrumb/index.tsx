import React from 'react';
import { Breadcrumb, Space } from 'antd';
import { NextRouter, useRouter } from 'next/router';
import { pathToRegexp } from 'path-to-regexp';
import { urlToList } from '@blog/client/admin/utils/url.util';
import menu from '@blog/client/configs/admin.menu.config';
import style from './style.module.scss';

export const getFlatMenuKeys = (menuData: any[] = []) => {
    let keys: any[] = [];
    menuData.forEach((item: any) => {
        if (!item) {
            return;
        }
        keys.push({
            path: item.path,
            breadcrumbName: item.title,
            breadcrumbIcon: item.icon,
        });
        if (item.childMenus) {
            keys = keys.concat(getFlatMenuKeys(item.childMenus));
        }
    });
    return keys;
};

export const getMenuMatches = (flatMenuKeys: any[] = [], path: string) =>
    flatMenuKeys.filter((item) => item && pathToRegexp(item.path).test(path));

export const getBreadCrumbRoutes = (menus: any[], router: NextRouter) => {
    const breadcrumbs = urlToList(router.pathname)
        .map((item) => getMenuMatches(getFlatMenuKeys(menus), item)[0])
        .filter((item) => item)
        .reduce((acc, curr) => [...acc, curr], []);
    return breadcrumbs;
};

export default function _Breadcrumb() {
    const router = useRouter();
    const items = getBreadCrumbRoutes(menu, router);
    return (
        <Breadcrumb
            className={style.breadcrumb}
            items={items.map((item: any) => {
                return {
                    title: (
                        <Space>
                            {item.breadcrumbIcon}
                            <span style={{ fontSize: 14 }}>{item.breadcrumbName}</span>
                        </Space>
                    ),
                };
            })}
        />
    );
}
