var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
  return gulp.src(['jquery.videosequence.js'])
    .pipe(uglify())
    .pipe(concat('jquery.videosequence.min.js'))
    .pipe(gulp.dest('.'));
});
