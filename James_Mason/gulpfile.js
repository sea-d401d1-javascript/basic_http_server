var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
gulp.task('default', ['eslint_check', 'mocha_tests', 'watch']);
gulp.task('eslint_check', function() {
  return gulp.src(['**/*.js','!node_modules/**','!dist/*.js']).pipe(plugins.eslint(
    {
      'settings': {
        'ecmascript': 5
      },
      'ecmaFeatures': {
      },
      'env': {
        'node': true,
        'mocha': true
      },
      'rules': {
        'semi': 1,
        'strict': 0,
        'indent': [2, 2],
        'quotes': [1, 'single'],
        'no-multi-spaces': [1, {
          'exceptions': {
            'VariableDeclarator': true,
            'FunctionExpression': true
          }
        }],
        'key-spacing': [0, {'align': 'value'}],
        'no-underscore-dangle': 0
      }
    }
  )).pipe(plugins.eslint.format()).pipe(plugins.eslint.failAfterError());
});
gulp.task('mocha_tests', function () {
  return gulp.src('test/*.js', {read: false}).pipe(plugins.mocha({reporter: 'nyan'}));
});
gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!package.json', '!node_modules/**', '!dist/*.js'], ['eslint_check', 'mocha_tests']);
});
