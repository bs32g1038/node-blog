import { pathToRegexp } from 'path-to-regexp';
import { urlToList } from '@blog/client/admin/utils/url.util';

export const getFlatMenuKeys = (menuData = []) => {
    let keys = [];
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

export const getMenuMatches = (flatMenuKeys = [], path) =>
    flatMenuKeys.filter((item) => item && pathToRegexp(item).test(path));

/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = (props) => {
    const { router = { pathname: '/' }, flatMenuKeys } = props;
    return urlToList(router.pathname)
        .map((item) => getMenuMatches(flatMenuKeys, item)[0])
        .filter((item) => item)
        .reduce((acc, curr) => [...acc, curr], ['/']);
};

export const getSelectedMenuKeys = (flatMenuKeys, pathname) => {
    return urlToList(pathname)
        .map((itemPath) => getMenuMatches(flatMenuKeys, itemPath).pop())
        .filter((item) => item);
};
