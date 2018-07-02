const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true,
            title: "Lizc博客"
        })
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        "targets": {
                            "node": 'current'
                        }
                    }], '@babel/preset-react'],
                    plugins: ["@babel/plugin-syntax-dynamic-import", ["import", { libraryName: "antd", style: "css" }]]
                }
            }
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};