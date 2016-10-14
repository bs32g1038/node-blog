var gulp = require('gulp');
var nodemon = require('gulp-nodemon'); //- 启动node
var gulpSequence = require('gulp-sequence'); //- 任务序列
var del = require('del'); //- 删除文件
var plugins = require('gulp-load-plugins')();
var minimist = require('minimist');
var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'development'
    }
};
var options = minimist(process.argv.slice(2), knownOptions);

process.env.INIT_ENV = options.env;

function getTask(name) {
    return require(`./gulp/tasks/${name}`)(gulp, plugins);
}

gulp.task("vue-webpack", getTask('vue-webpack'));
gulp.task("do-admin-css", getTask('do-admin-css'));
gulp.task("do-index-css", getTask('do-index-css'));
gulp.task("do-admin-js", getTask('do-admin-js'));


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

//- 复制文件到public下
gulp.task('copy-public', function () {
    return gulp.src([
            './web/libs/bootstrap/fonts/**',
            './web/libs/editor/fonts/**',
            './web/libs/font-awesome/fonts/**',
            './web/libs/webuploader/Uploader.swf',
            './web/images/**'
        ], {
            base: './web'
        })
        .pipe(gulp.dest('./public'))
});


//- node服务器启动，支持动态检测重启
gulp.task('node', function () {
    nodemon({
        script: 'bin/www',
        ext: 'js html css',
        env: {
            'NODE_ENV': process.env.INIT_ENV || 'development'
        },
        ignore: [
            'public/',
            'web/',
            'views/'
        ],
    })
})

gulp.task('sequence-all', function (cb) {
    if (process.env.INIT_ENV == 'production') {
        gulpSequence('del-public', 'do-admin-css', 'do-admin-js', 'do-index-css', 'vue-webpack', 'copy-public', cb);
    } else {
        gulpSequence('del-public', 'do-admin-css', 'do-admin-js', 'do-index-css', 'copy-public', cb);
    }
});

gulp.task('build', ['sequence-all']);

gulp.task('watch', function () {
    gulp.watch('web/stylesheets/*.css', ['sequence-all']);
    gulp.watch('web/javascripts/*.js', ['sequence-all']);
    gulp.watch('web/libs/*.js', ['sequence-all']);
    gulp.watch('web/vue/**', ['sequence-all']);
});

gulp.task('server', ['node']);

gulp.task('default', gulpSequence('sequence-all', ['node', 'watch']));

gulp.task('help', function () {
    console.log('	gulp build			文件打包');
    console.log('	gulp watch			文件监控打包');
    console.log('	gulp help			gulp参数说明');
    console.log('	gulp server			测试server');
    console.log('	gulp                开发环境（默认开发环境）');
    console.log('	gulp xxxx --env production      生产模式下进行调试或者打包文件');
});