var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),      
    rename = require('gulp-rename'),                //用于重命名文件
    notify = require('gulp-notify'),                //用于任务完成提示
    minifycss = require('gulp-minify-css');         //css压缩


// 样式
gulp.task('styles', function () {
    return gulp.src('web/css/*.css')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('web/dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('web/dist/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// 预设任务
gulp.task('default', function () {
    gulp.start('styles');
});

gulp.task('watch', function () {
    // 看守所有.css档
    gulp.watch('web/css/*.css', ['styles']);

});