var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
const HTMLPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')

const config = merge(base, {
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.REACT_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        // generate output HTML
        new HTMLPlugin({
            template: 'src/index.template.html',
            projectPath: '/admin'
        })
    ]
})

if (process.env.NODE_ENV === 'production') {
    config.module.rules.push({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            loader: 'css-loader',
            fallbackLoader: 'style-loader'
        })
    });
    config.plugins.push(
        new ExtractTextPlugin('css/[name].[contenthash:8].css'),
        // this is needed in webpack 2 for minifying CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: function() {
                    return [postcss, autoprefixer];
                }
            }
        }),
        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
} else {
    config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    });
}

module.exports = config