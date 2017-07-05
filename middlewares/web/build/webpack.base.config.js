const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ?
    false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/web/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'init-data': path.resolve(__dirname, '../../../config/data.js'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd ?
          ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader'
          }) : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        use: isProd ?
          ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'postcss-loader',
              'less-loader'
            ],
            fallback: 'style-loader'
          }) : ['style-loader', 'css-loader', {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, 'sass-loader']
      }
    ]
  },

  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  ] : [
    new FriendlyErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    })
  ]
}