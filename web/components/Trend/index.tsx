import React from 'react';

const normalizeX = (len = 10, width = 155) => {
    return Math.floor(width / len);
};

export const normalizeY = ({ value = 1, min = 1, max = 28 }) => {
    if (value <= 1) {
        return 1;
    }
    const part = (max - min) / 3;

    // 三个刻度
    const part10 = part * 10;
    const part100 = part * 100;
    const part1000 = part * 1000;

    if (1 < value && value < part10) {
        return value / part10 + 1;
    } else if (value < part100) {
        return value / part100 + 10;
    } else if (value < part1000) {
        return value / part1000 + 19;
    } else {
        return max;
    }
};

const buildLinearPath = (data: Array<any>) => {
    const len = data.length;
    return data
        .map((value, index) => {
            return `${normalizeX(len) * index},${normalizeY({ value })}`;
        })
        .join(' ');
};

export default (props: any) => {
    const uid = props.data.join('') + '01234567890123456789'.substring(Math.floor(Math.random() * 18));
    return (
        <svg width="155" height="30">
            <defs>
                <linearGradient id={`gradient-${uid}`} x1="0" x2="0" y1="1" y2="0">
                    <stop offset="10%" stopColor="#c6e48b"></stop>
                    <stop offset="33%" stopColor="#7bc96f"></stop>
                    <stop offset="66%" stopColor="#239a3b"></stop>
                    <stop offset="90%" stopColor="#196127"></stop>
                </linearGradient>
                <mask id={`sparkline-${uid}`} x="0" y="0" width="155" height="28">
                    <polyline
                        transform={`translate(${normalizeX(props.data.length) / 2}, 28) scale(1,-1)`}
                        points={buildLinearPath(props.data)}
                        fill="transparent"
                        stroke="#8cc665"
                        strokeWidth="2"
                    ></polyline>
                </mask>
            </defs>

            <g transform="translate(0, 2.0)">
                <rect
                    x="0"
                    y="-2"
                    width="155"
                    height="30"
                    style={{ stroke: 'none', fill: `url(#gradient-${uid})`, mask: `url(#sparkline-${uid})` }}
                ></rect>
            </g>
        </svg>
    );
};
