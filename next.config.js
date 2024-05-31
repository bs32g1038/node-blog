/* eslint-disable */
const path = require('path');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    transpilePackages: ['antd-mobile'],
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.(txt|svg|ttf)$/,
            type: 'asset',
            generator: {
                filename: 'static/[hash][ext][query]',
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 100 * 1024,
                },
            },
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@blog': resolve('./'),
        };
        return config;
    },
};
