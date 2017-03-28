const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base, {
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        // generate output HTML
        new HTMLPlugin({
            template: 'src/index.template.html',
            projectPath: '/web'
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
        new ExtractTextPlugin('css/[name].[hash].css'),
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
        }),
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
        })
    )
} else {
    config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    });
}

module.exports = config