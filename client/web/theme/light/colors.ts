import tinycolor from 'tinycolor2';
import {
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors';

const gray = {
    1: '#fff',
    2: '#fafafa',
    3: '#f5f5f5',
    4: '#f0f0f0',
};

export default {
    title: tinycolor('black')
        .setAlpha(0.85)
        .toPercentageRgbString(),
    primaryText: tinycolor('black')
        .setAlpha(0.65)
        .toPercentageRgbString(),
    secondaryText: tinycolor('black')
        .setAlpha(0.45)
        .toPercentageRgbString(),
    disabal: tinycolor('black')
        .setAlpha(0.25)
        .toPercentageRgbString(),
    border: tinycolor('black')
        .setAlpha(0.15)
        .toPercentageRgbString(),
    dividers: tinycolor('black')
        .setAlpha(0.06)
        .toPercentageRgbString(),
    blackground: tinycolor('black')
        .setAlpha(0.04)
        .toPercentageRgbString(),
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
    gray,
};
