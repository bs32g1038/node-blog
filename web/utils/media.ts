import { css } from '@emotion/core';

const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 576,
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc: any, label) => {
    acc[label] = (...args: any) => css`
        @media (max-width: ${sizes[label] / 16}em) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});

export default media as { phone: any; tablet: any; desktop: any };
