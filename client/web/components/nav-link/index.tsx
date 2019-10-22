import Link from 'next/link';
import { withRouter } from 'next/router';
import React, { Children } from 'react';

const ActiveLink = (data: any) => {
    const { router, children, ...props } = data;

    const child = Children.only(children);

    let className = child.props.className || null;
    props.activeClassName = props.activeClassName || 'active';
    if (props.exact) {
        if (router.asPath === props.href && props.activeClassName) {
            className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
        }
    } else if (router.asPath.includes(props.href.split('?')[0]) && props.activeClassName) {
        className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    }

    delete props.activeClassName;
    delete props.exact;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
