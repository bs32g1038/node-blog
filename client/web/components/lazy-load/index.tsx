import React, { useEffect, useRef, useState } from 'react';

const getTop = (e: any) => {
    let T = e.offsetTop;
    while (e.offsetParent) {
        e = e.offsetParent;
        T += e.offsetTop;
    }
    return T;
};
export const LazyLoad = (props: { component: any; attrs: any }) => {
    const [attrs, setAttrs] = useState({});
    const $dom = useRef(null);
    const load = (): any => {
        const H = window.innerHeight;
        const S = document.documentElement.scrollTop || document.body.scrollTop;
        if (H + S > getTop($dom.current)) {
            setAttrs(props.attrs);
        }
    };
    useEffect(() => {
        load();
        window.addEventListener('scroll', load, false);
        return () => {
            window.removeEventListener('scroll', load);
        };
    }, [1]);
    const Component = props.component;
    return <Component {...attrs} ref={$dom}></Component>;
};
