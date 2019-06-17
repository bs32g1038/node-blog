const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
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
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/static/admin/',
        filename: '[name].[hash].bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        })
    ],
    module: {
        rules: [
            {
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
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader'
                }, autoprefixer]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                parallel: true,
                cache: true,
                sourceMap: true,
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: module => module.nameForCondition
                        && /\.(css|scss)$/.test(module.nameForCondition())
                        && !/^javascript/.test(module.type),
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
});