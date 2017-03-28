const path = require('path')
const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const merge = require('webpack-merge')
process.env.NODE_ENV = 'development';

module.exports = function setupDevServer(app, opts) {
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'index.html')
        if (fs.existsSync(filePath)) {
            const index = fs.readFileSync(filePath, 'utf-8');
            opts.indexUpdated(index)
        }
    })

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler))

}