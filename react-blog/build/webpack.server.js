// const path = require('path');
// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const base = require('./webpack.common');
// const nodeExternals = require('webpack-node-externals');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const autoprefixer = {
//     loader: "postcss-loader",
//     options: {
//         plugins: function () {
//             return [
//                 require('autoprefixer')
//             ];
//         }
//     }
// };

// module.exports = merge(base, {
//     mode: 'production',
//     target: 'node',
//     devtool: '#source-map',
//     entry: path.resolve(__dirname, '../src/server'),
//     output: {
//         filename: 'server-bundle.js',
//         libraryTarget: 'commonjs2',
//         path: path.resolve(__dirname, '../../node-server/ssr'),
//     },
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, '../src')
//         }
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: "app.css",
//             chunkFilename: "app.css"
//         }),
//         new webpack.ProvidePlugin({
//             document: 'global/document',
//             window: 'global/window'
//         }),
//         new HtmlWebpackPlugin({
//             chunks: ['app'],
//             template: path.resolve(__dirname, '../src/index.html'),
//             hash: true,
//             title: "Lizc博客"
//         })
//     ],
//     externals: nodeExternals({
//         whitelist: /\.css$/
//     }),
//     module: {
//         rules: [
//             {// cssmodule
//                 test: /\.scss$/,
//                 include: [/cssmodule/],
//                 use: [MiniCssExtractPlugin.loader, {
//                     loader: 'css-loader',
//                     options: {
//                         modules: true,
//                         minimize: true,
//                         localIdentName: '[hash:base64:6]'
//                     }
//                 }, autoprefixer, 'sass-loader']
//             },
//             {// 普通css文件打包
//                 test: /\.scss$/,
//                 exclude: [/cssmodule/],
//                 use: [MiniCssExtractPlugin.loader, {
//                     loader: 'css-loader',
//                     options: {
//                         minimize: true
//                     }
//                 }, autoprefixer, 'sass-loader']
//             },
//             {
//                 test: /\.css$/,
//                 use: [MiniCssExtractPlugin.loader, {
//                     loader: 'css-loader',
//                     options: {
//                         minimize: true
//                     }
//                 }, autoprefixer]
//             }
//         ]
//     },
// });

//此js用来将client/server-entry.js 打包成node能够执行的文件
const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.common');

const config = webpackMerge(baseConfig, {
    mode: 'development',
    target: 'node',//打包成node端执行
    entry: {
        app: path.join(__dirname, '../src/server-entry.js'),
    },
    output: {
        path: path.resolve(__dirname, '../../nginx/static'),
        publicPath: '/static/test/',
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2'//使用配置方案 commonjs2
    },
});

module.exports = config;
