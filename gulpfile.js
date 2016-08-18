var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');

var appFiles = ['src/**/*'];

gulp.task('jshint:app', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('webpack:dev', function() {
  gulp.src('src/index.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build', ['jshint:app', 'webpack:dev']);
gulp.task('watch', function() {
  gulp.watch(['./**/*', '!./package.json'], ['build']);
});
