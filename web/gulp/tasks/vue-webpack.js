var webpack = require("webpack"),
    webpackClient = require("../../build/webpack.client.config"),
    webpackServer = require("../../build/webpack.server.config");

module.exports = function (gulp, plugins) {

    var sequence = plugins.sequence;
    var gutil = plugins.gutil;

    gulp.task("webpack-client", function (cb) {
        webpack(webpackClient, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            cb();
        });
    });

    gulp.task("webpack-server", function (cb) {
        webpack(webpackServer, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            cb();
        });
    });

    return sequence('webpack-client', 'webpack-server');
}