/*
 * 亮主题
 */
import theme from '../default';
import colors from './colors';

const light = {
    ...theme,
    colors: {
        ...theme.colors,
        theme: colors,
    },
};

export default light;
