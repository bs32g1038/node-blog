import { pathToRegexp } from 'path-to-regexp';
import { urlToList } from '@blog/client/admin/utils/url.util';

export const getFlatMenuKeys = (menuData: any[] = []) => {
    let keys: any[] = [];
    menuData.forEach((item) => {
        if (!item) {
            return;
        }
        keys.push(item.path);
        if (item.childMenus) {
            keys = keys.concat(getFlatMenuKeys(item.childMenus));
        }
    });
    return keys;
};

export const getMenuMatches = (flatMenuKeys: string[] = [], path: string) =>
    flatMenuKeys.filter((item) => item && pathToRegexp(item).test(path));

/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = (props: {
    router?: { pathname: string } | undefined;
    flatMenuKeys: any;
}) => {
    const { router = { pathname: '/' }, flatMenuKeys } = props;
    return urlToList(router.pathname)
        .map((item) => getMenuMatches(flatMenuKeys, item)[0])
        .filter((item) => item)
        .reduce((acc, curr) => [...acc, curr], ['/']);
};

export const getSelectedMenuKeys = (flatMenuKeys: string[], pathname: string | undefined) => {
    return urlToList(pathname)
        .map((itemPath) => getMenuMatches(flatMenuKeys, itemPath).pop())
        .filter((item) => item);
};
