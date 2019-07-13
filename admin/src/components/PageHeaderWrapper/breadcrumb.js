import React from 'react';
import { Link } from 'react-router-dom';
import { matchRoutes } from "react-router-config";

const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    // if path is home, use Link。
    if (route.path === '/') {
        return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }
    return last || !route.component ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
};

export const generateBreadcrumbList = ({ routes, location }) => {
    const branch = matchRoutes(routes, location.pathname);
    const rs = branch.map(item => {
        if (item.route && item.route.title) {
            return {
                path: item.route.path,
                breadcrumbName: item.route.title
            }
        }
        return null
    }).filter(item => item)
    rs.unshift({
        path: '/',
        breadcrumbName: '首页'
    })
    return {
        routes: rs,
        itemRender
    }
}

