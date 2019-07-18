/* eslint-disable */
module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.(txt|png|svg|gif|bmp|jpe?g)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        context: '',
                        outputPath: 'static',
                        publicPath: '_next/static',
                        name: 'assets/[name].[hash:8].[ext]',
                        limit: 1024 * 20, // 20kb
                    },
                },
            ],
        });
        return config;
    },
};
