const path = require('path');

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx|mjs)$/,
                    /\.(ts|tsx)$/,
                    /\.(vue)$/,
                    /\.(less)$/,
                    /\.(re)$/,
                    /\.(s?css|sass)$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                ],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'assets/[name].[hash:8].[ext]',
                    publicPath: '/static',
                    outputPath: path.resolve(__dirname, './static'),
                    emitFile: true,
                }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:8].[ext]',
                    publicPath: '/static',
                    outputPath: path.resolve(__dirname, './static'),
                    emitFile: true,
                }
            }
        );
        return config;
    }
};