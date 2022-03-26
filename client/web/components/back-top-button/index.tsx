import React, { useEffect, useRef } from 'react';
import style from './style.module.scss';

const BackTopButton = () => {
    const $el = useRef(null);
    useEffect(() => {
        let timer = null;
        if ($el.current) {
            const backTopEl = $el.current;
            backTopEl.onclick = () => {
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    const t = document.documentElement && document.documentElement.scrollTop;
                    const oTop = document.body.scrollTop || t || 0;
                    if (oTop > 0) {
                        const p = oTop - 100;
                        if (document.documentElement) {
                            document.body.scrollTop = document.documentElement.scrollTop = p;
                        }
                        timer = requestAnimationFrame(fn);
                    } else {
                        cancelAnimationFrame(timer);
                    }
                });
            };
        }
    }, []);
    return (
        <div className={style.backTopButton} title="返回顶部">
            <div ref={$el}>
                <svg data-title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
                </svg>
            </div>
        </div>
    );
};

export default BackTopButton;
