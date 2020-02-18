import React, { useEffect } from 'react';
import { Box, Tooltip } from '@chakra-ui/core';
import { css } from 'emotion';

const loadBackTopBtnEvent = () => {
    let timer: any = null;
    const backTopEl = document.getElementById('backTop');
    if (backTopEl) {
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
};

export default () => {
    useEffect(() => {
        loadBackTopBtnEvent();
    }, [1]);
    return (
        <Tooltip aria-label="back top" hasArrow={true} showDelay={110} label="返回顶部" placement="right">
            <Box
                aria-label="返回顶部"
                id="backTop"
                className={css`
                    color: #333;
                    cursor: pointer;
                    position: absolute;
                    right: -40px;
                    bottom: 40px;
                    text-align: center;
                    width: 44px;
                    background: #fff;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    background-color: #fff;
                    transition: all 0.5s ease;
                    svg {
                        fill: #8590a6;
                        vertical-align: middle;
                        display: inline-block;
                    }
                `}
            >
                <svg data-title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
                </svg>
            </Box>
        </Tooltip>
    );
};
