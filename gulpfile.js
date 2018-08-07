var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var watch = require('gulp-watch');
var livereload = require('gulp-livereload');


/* Watch Files For Changes */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('js/**/*.js', ['webpack']);
});

/* Webpack */
gulp.task('webpack', function (callback) {
  gulp.src('js/*.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('staticfiles/webpack_bundles/'))
    .pipe(livereload());
});

gulp.task('default', ['webpack', 'watch']);

