const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../static'),
        publicPath: '/static/test',
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            "inferno": path.join(__dirname, "../node_modules/inferno/dist/inferno.js"),
            "inferno-router": path.join(__dirname, "../node_modules/inferno-router/dist/inferno-router.js"),
        },
    },
    devServer: {
        port: 3000,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                secure: false,
                changeOrigin: true
            },
            '/admin/api': {
                target: 'http://127.0.0.1:8080',
                secure: false,
                changeOrigin: true
            }
        },
        historyApiFallback: {
            rewrites: [
                { from: /blog\/admin/, to: '/static/test/admin.html' },
                { from: /./, to: '/static/test/index.html' }
            ]
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /inferno|inferno-router|axios/, // you may add "vendor.js" here if you want to
                    name: "vendor",
                    chunks: "initial",
                    enforce: true,
                }
            }
        }
    }
});