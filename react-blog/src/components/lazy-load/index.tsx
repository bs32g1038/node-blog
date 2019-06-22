import React, { useEffect, useRef, useState } from 'react';

const getTop = (e: any) => {
    let T = e.offsetTop;
    while (e.offsetParent) {
        e = e.offsetParent;
        T += e.offsetTop;
    }
    return T;
};
export const LazyLoad = (props: { tag?: string, component: any, children: any }) => {
    const [tag] = useState(props.tag || 'img');
    const [attrs, setAttrs] = useState({});
    const $dom = useRef(null);
    const load = (): any => {
        const H = window.innerHeight;
        const S = document.documentElement.scrollTop || document.body.scrollTop;
        if (H + S > getTop($dom.current)) {
            setAttrs(props);
        }
    };
    useEffect(() => {
        load();
        window.addEventListener('scroll', load, false);
        return () => {
            window.removeEventListener('scroll', load);
        };
    });
    const Component = props.component;
    if (Component) {
        return (
            <Component {...attrs} ref={$dom} ></Component>
        );
    }
    console.log('ssss');
    return (
        tag === 'img' ? <img {...attrs} ref={$dom} /> : <a {...attrs} ref={$dom} />
    );
};