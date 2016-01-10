var gulp  = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('hello-world', function(){
    console.log('hello world');
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['public/javascripts/app/productCategory/*.js',
					 'Server/*.js',
					 'Server/Dao/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('public/javascripts/app/productCategory/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['public/javascripts/app/productCategory/*.js',
	            'Server/*.js',
				'Server/Dao/*.js'],
				['lint', 'scripts']);
    // gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);

