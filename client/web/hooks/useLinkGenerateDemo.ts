import { useEffect, useRef } from 'react';
import DemoElement from '@blog/client/web/components/demo';

const cache = {};

export default () => {
    const markdownContent = useRef();
    useEffect(() => {
        const $el: any = markdownContent.current;
        if ($el) {
            $el.onclick = event => {
                const el = event.target;
                if (el.nodeName.toLowerCase() === 'a' && el.href.includes('/blog/demos?name=')) {
                    event.preventDefault();
                    const arr = el.href.split('/blog/demos?name=');
                    const demoName = arr[arr.length - 1];
                    if (cache[el.href]) {
                        el.parentNode.removeChild(cache[el.href]);
                        delete cache[el.href];
                    }
                    Object.assign(cache, {
                        [el.href]: DemoElement({ demoName }),
                    });
                    el.parentNode.append(cache[el.href]);
                    return false;
                }
            };
            return () => {
                $el.onclick = null;
            };
        }
    }, [1]);
    return markdownContent;
};
