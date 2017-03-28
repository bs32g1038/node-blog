const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')

module.exports = merge(base, {
    target: 'node',
    devtool: '#source-map',
    entry: './src/server-entry.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            'create-api': './create-api-server.js'
        }
    },
    externals: Object.keys(require('../package.json').dependencies),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
})