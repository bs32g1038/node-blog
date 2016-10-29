const path = require('path')

module.exports = {
    // devtool: '#source-map',
    entry: {
        app: './web/vue/client-entry.js',
        vendor: ['vue', 'vue-router', 'vuex', 'es6-promise', 'whatwg-fetch'],//'lru-cache';
    },
    output: {
        path: path.resolve(__dirname, '../../public/home/js'),
        publicPath: '/home/js/',
        filename: 'client-bundle.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    vue: {
        postcss: [
            require('autoprefixer')({
                browsers: ['last 3 versions']
            })
        ]
    }
}
