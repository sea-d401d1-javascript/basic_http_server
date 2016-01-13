const gulp = require('gulp'),
      eslint = require('gulp-eslint'),
      mocha = require('gulp-mocha'),
      files = ['test/*.js', '!node_modules//**'];

gulp.task('lint', function() {
  return gulp.src(files)
    .pipe(eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        'modules': true,
        'blockBindings': true
      },
      'rules': {
        'no-console': 0,
        'semi': 2,
      },
      envs: [
        'node',
        'mocha'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', function() {
  gulp.watch(files, ['lint']);
});

gulp.task('default', ['mocha', 'lint']);
