const path = require('path');
const express = require('express');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../../nginx/static'),
        publicPath: '/static/test',
        filename: '[name].bundle.js'
    },
    devServer: {
        port: 3001,
        compress: true,
        before: function (app) {
            app.use('/static', express.static(path.resolve(__dirname, '../../nginx/static')));
        },
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                secure: false,
                changeOrigin: true
            },
            '/static/upload': {
                target: 'http://127.0.0.1:8080',
                secure: false,
                changeOrigin: true
            }
        },
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/static/test/index.html' }
            ]
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            include: [/cssmodule/],
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]-[hash:base64:5]'
                }
            }, 'sass-loader']
        }, {
            test: /\.scss$/,
            exclude: [/cssmodule/],
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /react|react-router-dom|axios/, // you may add "vendor.js" here if you want to
                    name: "vendor",
                    chunks: "initial",
                    enforce: true,
                }
            }
        }
    }
});