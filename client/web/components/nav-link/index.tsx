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

    if (router.pathname === aimRouter.url && aimRouter.query.cid === router.query.cid) {
        className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    } else {
        className = className.replace(` ${props.activeClassName}`, '');
    }
    if (aimRouter.url === '/blog' && router.pathname === '/blog/articles' && !props.exact) {
        className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    }

    delete props.activeClassName;
    delete props.exact;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
