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

// const { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } = presetDarkPalettes,

const gray = {
    1: '#fff',
    2: '#fafafa',
    3: '#f5f5f5',
    4: '#f0f0f0',
};

export default {
    title: tinycolor('white')
        .setAlpha(0.85)
        .toPercentageRgbString(),
    primaryText: tinycolor('white')
        .setAlpha(0.65)
        .toPercentageRgbString(),
    secondaryText: tinycolor('white')
        .setAlpha(0.45)
        .toPercentageRgbString(),
    disabal: tinycolor('white')
        .setAlpha(0.3)
        .toPercentageRgbString(),
    border: tinycolor('#fff')
        .setAlpha(0.2)
        .toPercentageRgbString(),
    dividers: tinycolor('white')
        .setAlpha(0.12)
        .toPercentageRgbString(),
    blackground: tinycolor('black')
        .setAlpha(0.8)
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
