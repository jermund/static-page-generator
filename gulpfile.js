var gulp = require('gulp'),
	del = require('del'),
	bs = require('browser-sync'),
	sass = require('gulp-sass'),
	image = require('gulp-image'),
	jslint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	runSequence = require('run-sequence'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');

// General configuration
var config = {
	developPath: 'dev/',
	publicPath: 'public_html/'
};

// js config
var js = {
	dependencies: [
		// Add dependencies to this array
		'node_modules/jquery/dist/jquery.js'
	],
	scripts: [
		// Add your own js files to this array
		'dev/js/scripts.js'
	],
	developName: 'dependencies.js',
	productionName: 'app.js'
};

// Local environment setup
gulp.task('server', function(){
	bs.init({
		server: {
			baseDir: './dev'
		}
	});
	gulp.watch(config.developPath+"scss/**/*.scss", ['sass']);
	gulp.watch(js.scripts, ['lint-js']);
	gulp.watch(config.developPath+"*.html").on('change', bs.reload);
});

// Compile sass into CSS with autoprefixer
gulp.task('sass', function() {
    return gulp.src(config.developPath+'scss/*.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass()
			.on('error', sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.developPath+'css'))
        .pipe(bs.stream());
});

// Lint all files defined in js.scripts array.
gulp.task('lint-js', function() {
	return gulp.src( js.scripts )
		.pipe(jslint())
		.pipe(jslint.reporter(stylish))
		.pipe(bs.stream())
});

// Concat all files defined in js.dependencies array.
gulp.task('build-js-dependencies', function() {
	return gulp.src(js.dependencies)
		.pipe(sourcemaps.init())
		.pipe(concat( js.developName ))
        .pipe(sourcemaps.write('./'))
		.pipe( gulp.dest( config.developPath+'js/build' ) );
});

// Concat files in js.dependencies[] and js.scripts[] and minify
gulp.task('build-js', ['lint-js'], function() {

	// Add dependencies
	var source = [ config.developPath + 'js/build' + js.developName ];

	// Loop js.scripts
	for( var i = 0; i < js.scripts.length; i++ ) {
		source.push(js.scripts[i]);
	}

	console.log(js.productionName + ' consist of',  source);

	return gulp.src(source)
		.pipe(sourcemaps.init())
		.pipe(concat( js.productionName ))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest( config.developPath+'js' ));
});

// Default task
gulp.task('default', ['server', 'sass', 'build-js-dependencies', 'lint-js']);



// Production tasks
//
// Clean out public path
gulp.task('clean', function(){
	return del( config.publicPath+'**', {force:true} );
});
// Copy files from develop to public path
gulp.task('copy-html', function() {
	return gulp.src( config.developPath+'*.html' )
		.pipe( gulp.dest( config.publicPath ) );
});
gulp.task('copy-css', function() {
	return gulp.src( config.developPath+'css/**/*' )
		.pipe( gulp.dest( config.publicPath + 'css' ) );	
});
gulp.task('copy-js', function() {
	return gulp.src( config.developPath+'js/**/*' )
		.pipe( gulp.dest( config.publicPath + 'js' ) );
});
gulp.task('copy-images', function() {
	return gulp.src( config.developPath+'images/**/*' )
		.pipe( gulp.dest( config.publicPath + 'images' ) );
});
// Run tasks above sequential
gulp.task('copy-files', function( done ) {
	runSequence('clean', 'copy-html', 'copy-css', 'copy-js', 'copy-images', done);
});

// copy-files alias
gulp.task('production', ['copy-files']);

