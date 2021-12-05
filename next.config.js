/* eslint-disable */
const path = require('path');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    experimental: { esmExternals: true },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.(txt|svg|ttf)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/[hash][ext][query]',
            },
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@blog': resolve('./'),
        };
        return config;
    },
};
