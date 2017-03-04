var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin');

var paths = {
    scripts: 'admin/js/**/*.*',
    styles: 'admin/less/**/*.*',
    images: 'admin/img/**/*.*',
    templates: 'admin/templates/**/*.jade',
    index: 'admin/index.html',
    bower_fonts: 'admin/components/**/*.{ttf,woff,woff2,eof,svg}',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
            // outputRelativePath: '../'
        }))
        .pipe(gulp.dest('.tmp/public/admin'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('.tmp/public/admin/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('.tmp/public/admin/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('.tmp/public/admin/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('.tmp/public/admin/css'));
});

// gulp.task('custom-templates', function() {
//     return gulp.src(paths.templates)
//         .pipe(minifyHTML())
//         .pipe(gulp.dest('.tmp/public/admin/templates'));
// });

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(jade())
        .pipe(gulp.dest('.tmp/public/admin/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: '.tmp/public',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['.tmp/public/admin/**/*.*'])
        .pipe(watch(['.tmp/public/admin/**/*.*']))
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
// gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
gulp.task('default', ['build', 'watch']);