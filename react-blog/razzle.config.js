'use strict';
const path = require('path');

module.exports = {
    modify: (config, { target, dev }, webpack) => {
        const appConfig = config;
        appConfig.resolve.extensions = [...appConfig.resolve.extensions, '.ts', '.tsx'];
        appConfig.module.rules[1].test = /\.(ts|js|jsx|mjs|tsx)$/;
        return appConfig;
    },
};
