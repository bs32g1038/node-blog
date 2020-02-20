import { rgba, lighten } from 'polished';

const white = '#fff';
const red = '#ff7a45';
const gray = '#8c8c8c';

/**
 * 主要颜色
 */
const title = rgba(0, 0, 0, 0.85);
const primaryText = rgba(0, 0, 0, 0.65);
const secondaryText = rgba(0, 0, 0, 0.45);
const disabal = rgba(0, 0, 0, 0.25);
const border = rgba(0, 0, 0, 0.15);
const dividers = rgba(0, 0, 0, 0.06);
const blackground = rgba(0, 0, 0, 0.04);

export default {
    title,
    primaryText,
    secondaryText,
    disabal,
    border,
    dividers,
    blackground,
    header: {
        fill: '#2b414d',
        color: title,
        bg: white,
        borderColor: border,
        headerBorderBottomColor: lighten(0.32, gray),
        boxShadowColor: lighten(0.4, gray),
    },
    articles: {
        bg: white,
        titleColor: title,
        color: primaryText,
        secondaryText: secondaryText,
        borderColor: lighten(0.36, gray),
    },
    article: {
        bg: white,
        titleColor: title,
        primaryText: primaryText,
        secondaryText: secondaryText,
        borderColor: gray,
        badgeAuthorColor: red,
        badgeVisitorColor: gray,
    },
    categories: {
        border: lighten(0.36, gray),
        color: primaryText,
    },
    footer: {
        bg: white,
        text: secondaryText,
    },
    imageBg: white,
    pagination: {
        bg: blackground,
    },
    backTop: {
        bg: white,
    },
    skeleton: {
        bgStart: blackground,
        bgEnd: primaryText,
        border: blackground,
    },
};
