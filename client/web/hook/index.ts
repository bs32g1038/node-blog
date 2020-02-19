import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

const getTop = (e: any) => {
    let T = e.offsetTop;
    while (e.offsetParent) {
        e = e.offsetParent;
        T += e.offsetTop;
    }
    return T + e.offsetHeight;
};

export const useFixedTopInScroll = () => {
    const $dom: any = useRef(null);
    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const load = debounce((): any => {
            const S = document.documentElement.scrollTop || document.body.scrollTop;
            if (S >= getTop($dom.current)) {
                setIsFixed(() => true);
            } else {
                setIsFixed(() => false);
            }
        });
        load();
        window.addEventListener('scroll', load, false);
        return () => {
            window.removeEventListener('scroll', load);
        };
    }, [1]);
    return [$dom, isFixed];
};
