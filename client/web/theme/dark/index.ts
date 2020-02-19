/*
 * 黑暗主题
 */
import colors from './colors';

const mainBgColor = '#141414';

const light = {
    ...colors,
    header: {
        fill: colors.grey[0],
        color: colors.title,
        bg: mainBgColor,
        borderColor: colors.border,
        headerBorderBottomColor: colors.border,
    },
    articles: {
        bg: mainBgColor,
        titleColor: colors.title,
        color: colors.primaryText,
        secondaryText: colors.secondaryText,
        borderColor: colors.border,
    },
    article: {
        bg: mainBgColor,
        titleColor: colors.title,
        primaryText: colors.primaryText,
        secondaryText: colors.secondaryText,
        borderColor: colors.gray[4],
        badgeAuthorColor: colors.red[7],
        badgeVisitorColor: colors.gray[6],
    },
    categories: {
        border: colors.border,
        color: colors.primaryText,
    },
    footer: {
        bg: mainBgColor,
        text: colors.secondaryText,
    },
    imageBg: 'rgb(25, 25, 25)',
    pagination: {
        bg: colors.grey[6],
    },
    backTop: {
        bg: mainBgColor,
    },
};

export default light;
