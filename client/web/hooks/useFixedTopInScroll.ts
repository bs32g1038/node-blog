import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

const getTop = (e: HTMLElement) => {
    let T = e.offsetTop;
    while (e.offsetParent) {
        e = e.offsetParent as HTMLElement;
        T += e.offsetTop;
    }
    return T + e.offsetHeight;
};

export const useFixedTopInScroll = () => {
    const $dom = useRef(null);
    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const load = debounce(() => {
            const S = document.documentElement.scrollTop || document.body.scrollTop;
            const eleBottomToDocumentTopLength = getTop($dom.current);
            // 当滚动超过元素距离顶部距离时，采用 fixed 模式
            if (S >= eleBottomToDocumentTopLength - eleBottomToDocumentTopLength / 2) {
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
    }, []);
    return [$dom, isFixed];
};
