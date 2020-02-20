import { theme } from '@chakra-ui/core';
import customIcons from '../icon';

export const fontFamily =
    '-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';

export const codeFamily = 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace';

export const headingColor = 'rgba(0,0,0,0.85)';

export const textColor = 'rgba(0,0,0,0.65)';

export const textColorSecondary = 'rgba(0,0,0,0.45)';

export default {
    ...theme,
    fonts: {
        heading: '"Avenir Next", sans-serif',
        body: fontFamily,
        mono: 'Menlo, monospace',
    },
    icons: {
        ...theme.icons,
        ...customIcons,
    },
};
