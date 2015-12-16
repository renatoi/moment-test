'use strict';

var gulp = require('gulp');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var browserify = require('browserify');

// clean up
gulp.task('clean', function () {
    del(['./app/build']);
});

// js
gulp.task('browserify', ['clean'], function () {
  var b = browserify({
    entries: './app/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/build/'));
});

// server
gulp.task('webserver', function() {
  gulp.src('./app/')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }));
});


gulp.task('default', ['browserify', 'webserver']);
