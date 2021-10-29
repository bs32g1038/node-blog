/* eslint-disable */
const path = require('path');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    experimental: { esmExternals: true },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
            {
                test: /\.(txt|svg|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[hash][ext][query]',
                },
            },
            // {
            //     test: /\.(jpg|png|gif|bmp|jpe?g)$/,
            //     type: 'asset',
            //     // //解析
            //     // parser: {
            //     //     //转base64的条件
            //     //     dataUrlCondition: {
            //     //         maxSize: 25 * 1024, // 25kb
            //     //     },
            //     // },
            //     // generator: {
            //     //     //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
            //     //     filename: 'static/[name][hash:6][ext]'
            //     // },
            // }
        );
        config.resolve.alias = {
            ...config.resolve.alias,
            '@blog': resolve('./'),
        };
        return config;
    },
};
