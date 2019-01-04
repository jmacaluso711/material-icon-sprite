const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');

gulp.task('svg', function (svg) {
  return gulp
    .src(`./icons/*.svg`)
    .pipe(svgmin())
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: false }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(gulp.dest(`./svg-sprite/`))
});

gulp.task('build:svg', ['svg']);