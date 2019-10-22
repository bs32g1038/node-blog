import { useEffect } from 'react';

export const ScrollToTop = (props: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return props.children;
};
