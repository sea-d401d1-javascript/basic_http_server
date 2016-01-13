var gulp = require('gulp');
var mocha = require('gulp-mocha');
gulp.task('default', ['mocha_tests', 'watch']);
gulp.task('function', function() {
  /* Place code for your "function" task here, what is run when:
  $gulp function
  is called. */
});

gulp.task('mocha_tests', function () {
  return gulp.src('**/*.js', {read: false}).pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!package.json', '!node_modules/**'], ['mocha_tests']);
});
