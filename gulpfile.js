'use strict';

var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var del          = require('del');
var sass         = require('gulp-ruby-sass');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');

gulp.task('default', ['clean'], function () {
  gulp.start('dist', 'watch');
});

// Concert SCSS to CSS
gulp.task('dist', function () {
  return sass('scss/', { style: 'expanded' })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
});

// Watch for changes
gulp.task('watch', function () {
  gulp.watch('scss/*.scss', ['dist']);
});

// Clean dist folder
gulp.task('clean', function () {
  del(['dist/*']);
});
