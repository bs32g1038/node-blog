/*
 * a theme inspired by github
 */
import { theme } from '@chakra-ui/core';
import colors from './colors';

const mainBgColor = '#fff';

const light = {
    ...colors,
    header: {
        fill: '#2b414d',
        color: colors.title,
        bg: mainBgColor,
        borderColor: colors.border,
        headerBorderBottomColor: colors.gray[4],
    },
    articles: {
        bg: mainBgColor,
        titleColor: colors.title,
        color: colors.primaryText,
        secondaryText: colors.secondaryText,
        borderColor: colors.gray[4],
    },
    article: {
        bg: mainBgColor,
        titleColor: colors.title,
        primaryText: colors.primaryText,
        secondaryText: colors.secondaryText,
        borderColor: colors.gray[4],
        badgeAuthorColor: colors.red[4],
        badgeVisitorColor: colors.grey[2],
    },
    categories: {
        border: colors.gray[4],
        color: colors.primaryText,
    },
    footer: {
        bg: mainBgColor,
        text: colors.secondaryText,
    },
    imageBg: 'white',
};

export default light;
