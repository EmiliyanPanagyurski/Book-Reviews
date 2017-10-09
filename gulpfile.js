const gulp = require('gulp');
const plugins = require('gulp-load-plugins');

const $ = plugins();

gulp.task('eslint', function() {
    gulp.src(['app/scripts/**/*.js', 'app/configs/*.js'])
        .pipe($.plumber())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
});

gulp.task('configs', function() {
    gulp.src('app/configs/*.js')
        .pipe($.plumber())
        .pipe($.minify({
            ext:{
                src: '.js',
                min: '.js'
            },
            noSource: {}
        }))
        .pipe(gulp.dest('dist/configs'));
});

gulp.task('scripts', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.minify({
            ext:{
                src: '.js',
                min: '.js'
            },
            noSource: {}
        }))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function() {
    gulp.src('app/styles/main.css')
        .pipe($.plumber())
        .pipe($.cssnano())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', function() {
    gulp.src('app/index.html')
        .pipe($.plumber())
        .pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
     gulp.src('app/images/*')
        .pipe($.plumber())
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('views', function() {
    gulp.src('app/views/**/*')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('fonts', function() {
    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build:dist', ['eslint', 'configs', 'fonts', 'scripts', 'styles', 'views', 'html', 'images']);