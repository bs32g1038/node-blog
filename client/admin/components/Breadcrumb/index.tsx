import React from 'react';
import { Breadcrumb } from 'antd';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { pathToRegexp } from 'path-to-regexp';
import { urlToList } from '@blog/client/admin/utils/url.util';
import menu from '@blog/client/configs/admin.menu.config';

export const getFlatMenuKeys = (menuData = []) => {
    let keys = [];
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

export const getMenuMatches = (flatMenuKeys: any = [], path: string) =>
    flatMenuKeys.filter((item) => item && pathToRegexp(item.path).test(path));

export const getBreadCrumbRoutes = (menus, router) => {
    const breadcrumbs = urlToList(router.pathname)
        .map((item) => getMenuMatches(getFlatMenuKeys(menus), item)[0])
        .filter((item) => item)
        .reduce((acc, curr) => [...acc, curr], []);
    return breadcrumbs;
};

const _Breadcrumb = styled(Breadcrumb)`
    font-size: 20px;
    padding: 24px 24px 0px;
    font-weight: 700;
    .anticon {
        font-size: 20px;
        font-weight: 700;
        svg {
            margin-right: 4px;
        }
    }
`;

export default () => {
    const router = useRouter();
    const items = getBreadCrumbRoutes(menu, router);
    return (
        <_Breadcrumb>
            {items.map((item) => {
                return (
                    <Breadcrumb.Item key={item.path}>
                        {item.breadcrumbIcon}
                        <span>{item.breadcrumbName}</span>
                    </Breadcrumb.Item>
                );
            })}
        </_Breadcrumb>
    );
};
