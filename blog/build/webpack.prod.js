const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../static/app'),
        publicPath: '/static/app/',
        filename: '[name].bundle.js'
    },
    plugins: [
        new UglifyJSPlugin({
            parallel: true,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    drop_console: true
                }
            }
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader?minimize', {
                loader: "postcss-loader",
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }, 'sass-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
});