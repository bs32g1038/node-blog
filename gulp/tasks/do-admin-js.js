// //-js样式压缩和合并
module.exports = function (gulp, plugins) {

    var inject = plugins.inject;
    var concat = plugins.concat;
    var rev = plugins.rev;
    var uglify = plugins.uglify;

    const isProd = process.env.INIT_ENV == 'production';

    return () => {

        var target = gulp.src('./web/views/admin/js.ejs');

        var sources = gulp.src([
            'libs/jquery/jquery-1.12.4.js',
            'libs/bootstrap/js/bootstrap.js',
            'libs/webuploader/webuploader.withoutimage.js',
            'libs/editor/editor.js',
            'libs/editor/marked.js',
            'libs/editor/ext.js',
            'javascripts/upload.images.js',
            'javascripts/jquery-tag.js',
        ], {
            cwd: './web'
        })

        if (isProd) {
            sources = sources.pipe(uglify())
                .pipe(concat('admin.min.js'))
                .pipe(rev())
        }

        sources = sources.pipe(gulp.dest('./public/dist'));

        return target.pipe(inject(sources, {
                ignorePath: 'public'
            }))
            .pipe(gulp.dest('views/admin'));


    }
}