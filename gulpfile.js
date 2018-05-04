'use strict';

var pkg = require('./package.json'),
  autoprefixer = require('gulp-autoprefixer'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  connect = require('gulp-connect'),
  csso = require('gulp-csso'),
  del = require('del'),
  ghpages = require('gh-pages'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  source = require('vinyl-source-stream'),
  stylus = require('gulp-stylus'),
  through = require('through'),
  uglify = require('gulp-uglify'),
  isdocs = process.argv.indexOf('serve') === -1,
  // browserifyPlumber fills the role of plumber() when working with browserify
  browserifyPlumber = function(e) {
    if (isdocs) throw e;
    gutil.log(e.stack);
    this.emit('end');
  };

gulp.task('js', ['clean:js'], function() {
  // see https://wehavefaces.net/gulp-browserify-the-gulp-y-way-bb359b3f9623
  return browserify('src/scripts/main.js').bundle()
    .on('error', browserifyPlumber)
    .pipe(source('src/scripts/main.js'))
    .pipe(buffer())
    .pipe(isdocs ? uglify() : through())
    .pipe(rename('build.js'))
    .pipe(gulp.dest('docs/build'))
    .pipe(connect.reload());
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('docs'))
    .pipe(connect.reload());
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src('src/styles/main.styl')
    .pipe(isdocs ? through() : plumber())
    .pipe(stylus({ 'include css': true, paths: ['./node_modules'] }))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(isdocs ? csso() : through())
    .pipe(rename('build.css'))
    .pipe(gulp.dest('docs/build'))
    .pipe(connect.reload());
});

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('docs/images'))
    .pipe(connect.reload());
});

gulp.task('fonts', ['clean:fonts'], function() {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('docs/fonts'))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return del.sync('docs');
});

gulp.task('clean:html', function() {
  return del('docs/index.html');
});

gulp.task('clean:js', function() {
  return del('docs/build/build.js');
});

gulp.task('clean:css', function() {
  return del('docs/build/build.css');
});

gulp.task('clean:images', function() {
  return del('docs/images');
});

gulp.task('clean:fonts', function() {
  return del('docs/fonts');
});

gulp.task('connect', ['build'], function() {
  connect.server({ root: 'docs', port: process.env.PORT || 8080, livereload: true });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/scripts/**/*.js', ['js']);
  gulp.watch('src/styles/**/*.styl', ['css']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/fonts/*', ['fonts']);
});

gulp.task('publish', ['clean', 'build'], function(done) {
  ghpages.publish(path.join(__dirname, 'docs'), { logger: gutil.log }, done);
});

// old alias for publishing on gh-pages
gulp.task('deploy', ['publish']);

gulp.task('build', ['js', 'html', 'css', 'images', 'fonts']);

gulp.task('serve', ['connect', 'watch']);

gulp.task('default', ['build']);
