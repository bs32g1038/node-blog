const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const autoprefixer = {
    loader: "postcss-loader",
    options: {
        plugins: function () {
            return [
                require('autoprefixer')
            ];
        }
    }
};

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../../nginx/static/app'),
        publicPath: '/static/app/',
        filename: '[name].bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })

    ],
    module: {
        rules: [
            {// cssmodule
                test: /\.scss$/,
                include: [/cssmodule/],
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        minimize: true,
                        localIdentName: '[hash:base64:6]'
                    }
                }, autoprefixer, 'sass-loader']
            },
            {// 普通css文件打包
                test: /\.scss$/,
                exclude: [/cssmodule/],
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, autoprefixer, 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, autoprefixer]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    }
});