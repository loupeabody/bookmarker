var gulp = require("gulp"),
		concat = require("gulp-concat"),
		karma = require("karma").Server,
		livereload = require("gulp-livereload")

var paths = {
	scripts: ['app/app.js','app/**/*.js','app/**/*.directive.html','!app/app.build.js']
}

gulp.task('test', function(done) {
	new karma({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('build', function() {
	return gulp.src([
		'app/utility/iife-o.js',
		'app/app.js',
		'app/**/*.js',
		'!app/lib/*.js',
		'!app/**/*.spec.js',
		'!app/app.build.js',
		'app/utility/iife-c.js'
		])
		.pipe(concat('app.build.js', {newLine: '\n\r\n\r'}))
		.pipe(gulp.dest('app/'))
		.pipe(livereload())
})

gulp.task('watch', function() {
	livereload.listen()
	gulp.watch(paths.scripts, ['build','test'])
	gulp.watch('index.html', function() { livereload.reload() })
})

gulp.task('default', ['watch'])