// //-css样式压缩和合并
module.exports = function (gulp, plugins) {

    var inject = plugins.inject;
    var concat = plugins.concat;
    var rev = plugins.rev;
    var minifyCss = plugins.minifyCss;
    var autoprefixer = plugins.autoprefixer;


    const isProd = process.env.INIT_ENV == 'production';

    return () => {

        var target = gulp.src('./web/views/web/index.html');

        var sources = gulp.src([
                'libs/font-awesome/css/font-awesome.css',
                'stylesheets/index.css'
            ], {
                cwd: './web'
            })
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'));


        if (isProd) {
            sources = sources.pipe(minifyCss({
                    advanced: false,
                }))
                .pipe(concat('index.min.css'))
                .pipe(rev()) //- 文件名加MD5后缀
        }

        sources = sources.pipe(gulp.dest('./public/dist'));

        return target.pipe(inject(sources, {
                ignorePath: 'public'
            }))
            .pipe(gulp.dest('views/web'));

    }
}