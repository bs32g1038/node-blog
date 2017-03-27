var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, '../src/index'),
        vendor: [
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
            "redux-thunk"
        ]
    },
    // 入口文件路径
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash:8].js', //编译后的文件名字
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        publicPath: '/admin/'
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [{
                test: /\.(js|jsx)$/, // babel 转换为兼容性的 js
                include: path.resolve(__dirname, '../src'),
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['import', [{ libraryName: "antd", style: 'css' }]],
                    ],
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "../src")
        ],
        extensions: ['.js', '.json', '.jsx']
    }
}