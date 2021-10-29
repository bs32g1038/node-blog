import React, { useEffect, useRef, useState } from 'react';

export const LazyLoad = (props: { component: any; attrs: any }) => {
    const [attrs, setAttrs] = useState({});
    const $dom = useRef(null);
    useEffect(() => {
        var intersectionObserver = new IntersectionObserver(function (entries) {
            if (entries[0].intersectionRatio <= 0) return;
            if (Object.keys(attrs).length > 0) {
                // 注意注销监听元素
                return intersectionObserver.unobserve($dom.current);
            }
            setAttrs(props.attrs);
        });
        intersectionObserver.observe($dom.current);
    }, [1]);
    const Component = props.component;
    return <Component {...attrs} ref={$dom}></Component>;
};
