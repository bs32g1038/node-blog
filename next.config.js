/* eslint-disable */
const path = require('path');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    experimental: { esmExternals: true },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.(txt|png|svg|gif|bmp|jpe?g|ttf)$/,
            type: 'asset/resource',
            // assetModuleFilename: 'images/[hash][ext][query]'
            // use: [
            //     {
            //         loader: 'url-loader',
            //         options: {
            //             context: '',
            //             outputPath: 'static',
            //             publicPath: '/_next/static',
            //             name: 'assets/[name].[hash:8].[ext]',
            //             limit: 1024 * 30, // 20kb
            //             esModule: false,
            //         },
            //     },
            // ],
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@blog': resolve('./'),
        };
        return config;
    },
};
