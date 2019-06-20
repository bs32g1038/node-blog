'use strict';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
    modify: (config, { target, dev }, webpack) => {
        const appConfig = config;
        appConfig.resolve.extensions = [...appConfig.resolve.extensions, '.ts', '.tsx'];
        appConfig.module.rules.push({
            test: /\.(ts|tsx)?$/,
            loader: 'ts-loader',
            options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
            }
        });
        appConfig.plugins.push(new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
            tslint: dev ? path.resolve(__dirname, './tslint.json') : '',
            useTypescriptIncrementalApi: true,
            checkSyntacticErrors: dev,
            watch: [path.resolve(__dirname, './src')],
            silent: true
        }))
        return appConfig;
    },
};
