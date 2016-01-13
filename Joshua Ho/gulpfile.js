const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');
const gulp = require('gulp');

//IS NOT WORKING BUT NECESSARY
const eslint = require('gulp-eslint');

//Run JS Hint
gulp.task('jshint' , () => {
	return gulp.src()
	.pipe( jshint() )
	.pipe( jshint.reporter() );
});

//Run mocha
gulp.task('mocha' , () => {
	return gulp.src(['./test/*.js'])
				 .pipe(mocha({ reporter: 'spec'}));
});

//Watch tasks
gulp.task('watch' , function() {
	return gulp.watch(['jshint' , 'mocha' , __dirname + 'index.html' , __dirname + 'server.js']);
});

//Run everything!!!
gulp.task('default' , ['watch' , 'mocha' , 'jshint']);
