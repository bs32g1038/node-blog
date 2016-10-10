var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),            //- 处理css样式前缀
    rename = require('gulp-rename'),                        //- 用于重命名文件
    notify = require('gulp-notify'),                        //- 用于任务完成提示
    nodemon = require('gulp-nodemon'),                      //- 启动node
    concat = require('gulp-concat'),                        //- 文件合并
    uglify = require("gulp-uglify"),                        //- js混淆压缩
    gulpSequence = require('gulp-sequence'),                //- 任务序列
    del = require('del'),                                   //- 删除文件
    rev = require('gulp-rev'),                              //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),           //- 路径替换
    gutil = require("gulp-util"),                           //- gulp工具增强
    minifycss = require('gulp-minify-css');                 //- css压缩

var webpack = require("webpack"),
    webpackClient = require("./web/build/webpack.client.config"),       
    webpackServer = require("./web/build/webpack.server.config");

//-css样式压缩和合并
gulp.task('admin-css', function () {
    return gulp.src([
            'web/libs/bootstrap/css/bootstrap.css',
            'web/libs/editor/editor.css',
            'web/libs/webuploader/webuploader.css',
            'web/libs/font-awesome/css/font-awesome.css',
            'web/stylesheets/admin.css',
        ])
        .pipe(minifycss({
            advanced: false,
        }))
        .pipe(concat('admin.min.css'))
        .pipe(rev())                                        //- 文件名加MD5后缀
        .pipe(gulp.dest('web/dist'))
        .pipe(rev.manifest())                               //- 生成一个rev-manifest.json
        .pipe(gulp.dest('web/rev/css'))                     //- 将 rev-manifest.json 保存到 rev 目
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

//-js文件压缩和合并
gulp.task('admin-js', function () {
    return gulp.src([
            'web/libs/jquery/jquery-1.12.4.js',
            'web/libs/bootstrap/js/bootstrap.js',
            'web/libs/webuploader/webuploader.withoutimage.js',
            'web/libs/editor/editor.js',
            'web/libs/editor/marked.js',
            'web/libs/editor/ext.js',
            'web/javascripts/upload.images.js',
            'web/javascripts/jquery-tag.js',
        ])
        .pipe(uglify())
        .pipe(concat('admin.min.js'))
        .pipe(rev()) 
        .pipe(gulp.dest('web/dist'))
        .pipe(rev.manifest()) 
        .pipe(gulp.dest('web/rev/js')) 
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

//-css样式压缩和合并
gulp.task('index-css', function () {
    return gulp.src(['web/libs/font-awesome/css/font-awesome.css', 'web/stylesheets/index.css'])
        .pipe(concat('index.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('web/noncompressed'))
        .pipe(minifycss({
            advanced: false,
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('web/dist'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

//- 生成md5的命名，分别替换html中的link和script。
gulp.task('rev', function () {
    return gulp.src(['web/rev/**/*.json', 'web/views/admin/header.ejs', 'web/views/admin/js.ejs'])
        .pipe(revCollector())
        .pipe(gulp.dest('views/admin'));
});

//- 删除public目录下文件
gulp.task('del-public', function (cb) {
    del([
        'public/**',
        '!public',
        '!public/favicon.ico',
        '!public/uploads/**',
    ]).then(() => {
        return cb()
    });
});

//- 删除web/dist目录下文件
gulp.task('del-web-dist', function (cb) {
    del(['web/dist/**',
        '!web/dist'
    ]).then(() => {
        return cb()
    });
});

//- 拷贝文件目录结构到public
gulp.task('copy', function () {
    return gulp.src([
            'web/dist/*',
            'web/images/*',
            'web/libs/bootstrap/fonts/*',
            'web/libs/editor/fonts/*',
            'web/libs/font-awesome/fonts/*',
            'web/jquery/Uploader.swf',
        ], {
            base: './web'
        })
        .pipe(gulp.dest('public/'));
});


//- 后台界面任务序列
gulp.task('sequence-1', function (cb) {
    gulpSequence('del-web-dist', 'admin-css', 'admin-js', 'index-css', 'rev', 'del-public', 'copy', cb);
})


//- 前台界面任务序列
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

gulp.task("webpack", gulpSequence('webpack-client', 'webpack-server'));

//- node服务器启动，支持动态检测重启
gulp.task('node', function () {
    nodemon({
        script: 'bin/www',
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        },
        ignore: [
            'public/',
            'web/',
            'views/'
        ],
    })
})

//- 监听静态文件改变
gulp.task('watch', function () {
    gulp.watch('web/stylesheets/*.css', ['sequence-1']);
    gulp.watch('web/javascripts/*.js', ['sequence-1']);
    gulp.watch('web/libs/*.js', ['sequence-1']);
});

//- 预设任务-生成线上产品
gulp.task('default', ['sequence-1', 'webpack']);

//- 调试模式-开发模式使用
gulp.task('debug', ['watch', 'node']);