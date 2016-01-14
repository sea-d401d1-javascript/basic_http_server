var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var files = ['**/*.js'];

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
  .pipe(mocha({ reporter: 'list' }));
});

gulp.task('lint', function() {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['lint', 'mocha']);
