import pathToRegexp from 'path-to-regexp';
import config from '../configs/default.config';

let route;
export const matchParamsPath = (pathname, routes) => {
    if (routes) {
        routes.forEach(item => {
            if (pathToRegexp(item.path || '/all').test(pathname)) {
                route = item;
            } else if (item.routes) {
                matchParamsPath(pathname, item.routes);
            }
        });
        return route;
    }
    return {
        path: '',
    };
};

const getPageTitle = (props, ignoreTile) => {
    const { location, route, title = config.title } = props;
    const pageTitle = ignoreTile ? '' : title;
    if (!location.pathname) {
        return pageTitle;
    }
    const currRouterData = matchParamsPath(location.pathname, route.routes);
    if (!currRouterData) {
        return pageTitle;
    }
    let pageName = currRouterData.title;
    if (!pageName) {
        return pageTitle;
    }
    if (ignoreTile) {
        return pageName;
    }
    return `${pageName} - ${title}`;
};

export default getPageTitle;
