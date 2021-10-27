import { extendTheme } from '@chakra-ui/react';
import { rgba, darken, rgb } from 'polished';

export const fontFamily =
    '-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';

const mainBgColor = '#141414';
const red = '#ff7a45';
const gray = '#8c8c8c';

/**
 * 主要颜色
 */
const title = rgba(255, 255, 255, 0.85);
const primaryText = rgba(255, 255, 255, 0.65);
const secondaryText = rgba(255, 255, 255, 0.45);
const disabal = rgba(255, 255, 255, 0.25);
const border = rgba(255, 255, 255, 0.15);
const dividers = rgba(255, 255, 255, 0.06);
const blackground = rgba(255, 255, 255, 0.04);

// 2. Add your color mode config
export const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
        theme: {
            name: 'dark',
            title,
            primaryText,
            secondaryText,
            disabal,
            border,
            dividers,
            blackground,
            header: {
                fill: gray,
                color: title,
                bg: mainBgColor,
                borderColor: border,
                headerBorderBottomColor: border,
                boxShadowColor: darken(0.42, gray),
            },
            articles: {
                bg: mainBgColor,
                titleColor: title,
                color: primaryText,
                secondaryText: secondaryText,
                borderColor: border,
            },
            article: {
                bg: mainBgColor,
                titleColor: title,
                primaryText: primaryText,
                secondaryText: secondaryText,
                borderColor: gray,
                badgeAuthorColor: red,
                badgeVisitorColor: gray,
            },
            categories: {
                border: border,
                color: primaryText,
            },
            footer: {
                bg: mainBgColor,
                text: secondaryText,
            },
            imageBg: darken(0.45, gray),
            pagination: {
                bg: darken(0.4, gray),
            },
            backTop: {
                bg: mainBgColor,
            },
            markdown: {
                border,
            },
            mobileFooter: {
                bg: rgb(23, 23, 23),
            },
            errorPage: {
                bg: mainBgColor,
            },
        },
    },
};
// 3. extend the theme
const theme = extendTheme(config);
export default theme;
