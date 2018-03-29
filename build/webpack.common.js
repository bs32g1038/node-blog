const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        admin: path.resolve(__dirname, '../src/admin/index.js'),
        app: path.resolve(__dirname, '../src/index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'admin'],
            filename: "admin.html",
            template: path.resolve(__dirname, '../src/admin/index.html'),
            hash: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};