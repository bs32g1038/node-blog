import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const C = (props: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return props.children;
};

export const ScrollToTop = withRouter(C as any);