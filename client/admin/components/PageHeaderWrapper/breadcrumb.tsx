import React from 'react';
import Link from 'next/Link';
import pathToRegexp from 'path-to-regexp';

export const getFlatMenuKeys = (menuData: any = []) => {
    let keys: any = [];
    menuData.forEach((item: any) => {
        if (!item) {
            return;
        }
        keys.push({
            path: item.path,
            breadcrumbName: item.title,
        });
        if (item.childMenus) {
            keys = keys.concat(getFlatMenuKeys(item.childMenus));
        }
    });
    return keys;
};

export const getMenuMatches = (flatMenuKeys: any = [], path: string) =>
    flatMenuKeys.filter(item => item && pathToRegexp(item.path).test(path));

export const itemRender = (route, _params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    // if path is home, use Link。
    if (route.path === '/') {
        return (
            <Link href={paths.join('/')}>
                <span>{route.breadcrumbName}</span>
            </Link>
        );
    }
    return last || !route.component ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link href={paths.join('/')}>
            <span>{route.breadcrumbName}</span>
        </Link>
    );
};
