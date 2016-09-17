const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./build/webpack.client.config.js");


//use nginx,tomcat or other servers
gulp.task("webpack", function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
    })
})

//use webpack-dev-server
gulp.task("webpack-dev-server", function (callback) {

    new webpackDevServer(webpack(webpackConfig), {
        hot: true,
        inline: true,
        stats: {colors: true}
    }).listen(8080, "localhost", function (err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        gutil.log("[webpack-dev-server]", "http://localhost:8080");
    });
});




