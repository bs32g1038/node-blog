import React, { useEffect, useRef, useState } from 'react';

export const LazyLoad = React.memo((props: { component: any; attrs: any }) => {
    const [attrs, setAttrs] = useState({});
    const $dom = useRef(null);
    useEffect(() => {
        const intersectionObserver: IntersectionObserver = new IntersectionObserver(function (entries) {
            if (entries[0].intersectionRatio <= 0) return;
            if (Object.keys(attrs).length > 0) {
                // 注意注销监听元素
                return intersectionObserver.unobserve($dom.current);
            }
            setAttrs(props.attrs);
        });
        intersectionObserver.observe($dom.current);
        const dom = $dom.current;
        return () => {
            intersectionObserver.unobserve(dom);
        };
    }, [attrs, props.attrs]);
    const Component = props.component;
    return <Component {...attrs} ref={$dom}></Component>;
});

LazyLoad.displayName = 'LazyLoad';
