// //-css样式压缩和合并
module.exports = function (gulp, plugins) {

    var inject = plugins.inject;
    var concat = plugins.concat;
    var rev = plugins.rev;
    var cleanCss = plugins.cleanCss;
    var autoprefixer = plugins.autoprefixer;

    const isProd = process.env.INIT_ENV == 'production';

    return () => {

        var target = gulp.src('./web/home/index.html');

        var sources = gulp.src([
                'libs/font-awesome/css/font-awesome.css',
                'home/css/index.css'
            ], {
                cwd: './web'
            })
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'));


        if (isProd) {
            sources = sources.pipe(cleanCss({
                    advanced: false,
                }))
                .pipe(concat('index.css'))
                .pipe(rev()) //- 文件名加MD5后缀
        }

        sources = sources.pipe(gulp.dest('./public/home/css'));

        return target.pipe(inject(sources, {
                ignorePath: 'public'
            }))
            .pipe(gulp.dest('views/home'));

    }
}