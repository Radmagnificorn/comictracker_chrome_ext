var gulp = require('gulp');

gulp.task('styles', function () {
    return gulp.src('src/styles/*min.css')
        .pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function () {
    return gulp.src('src/*.js')
        .pipe(gulp.dest('build'));
});

gulp.task('markup', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('config', function () {
    return gulp.src('src/config/*.*')
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['styles', 'scripts', 'markup', 'config']);