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
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function ($) {
        $('svg').attr('width', 0);
        $('svg').attr('height', 0);
        $('[fill]').each(function () {
          if ($(this).attr('fill') !== 'none') {
            $(this).attr('fill', 'none');
          }
        });
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(`./svg-sprite/`))
});

gulp.task('build:svg', ['svg']);
