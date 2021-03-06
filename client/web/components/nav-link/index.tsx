import Link from '../link';
import { withRouter } from 'next/router';
import React, { Children } from 'react';
import queryString from 'query-string';

const ActiveLink = (data: any) => {
    const { router, children, ...props } = data;

    const child = Children.only(children);

    let className = child.props.className || null;
    props.activeClassName = props.activeClassName || 'active';

    const aimRouter = queryString.parseUrl(props.href);

    if (router.pathname === aimRouter.url) {
        className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    } else if (router.pathname.includes(aimRouter.url)) {
        // 映射类似 /blog/articles -> /blog 的url，激活 带有 /blog 的导航链接
        className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    }
    if (props.exact) {
        if (router.query.cid || aimRouter.query.cid) {
            // 当路由带有 ?cid= 激活相对应的链接
            if (router.pathname === aimRouter.url && aimRouter.query.cid === router.query.cid) {
                className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
            } else {
                className = null;
            }
        }
    }

    delete props.activeClassName;
    delete props.exact;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
