'use strict';

module.exports = {
    plugins: ['typescript'],
    modify: (config, { target, dev }, webpack) => {
        const appConfig = config;
        return appConfig;
    },
};
