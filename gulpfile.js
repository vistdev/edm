var gulp   = require('gulp'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    htmlmin = require('gulp-htmlmin'),
    smoosher = require('gulp-smoosher'),
    watch  = require('gulp-watch');

gulp.task('cssminify', function(){
  gulp.src('./css/ui.css')
      .pipe(prefix())
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./css/'));
});

gulp.task('htmlminify', function(){
  gulp.src('./index.html')
      .pipe(htmlmin({
        removeComments: true,
        ignoreCustomFragments: [ /<!-- smoosh -->/, /<!-- endsmoosh --/ ],
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseInlineTagWhitespace: true
      }))
      // replace external css with inline code
      .pipe(smoosher({
        cssTags: {
          begin: '<style>',
          end: '</style>'
        }
      }))
      // put new site into dist
      .pipe(gulp.dest('./dist'))

  // copy png files as well into dist folder
  gulp.src('./*.png')
      .pipe(gulp.dest('./dist'))
  // copy jpg files as well into dist folder
  gulp.src('./*.jpg')
      .pipe(gulp.dest('./dist'))
});


gulp.task('watch', function(){
  gulp.watch('./css/**/*.css', ['cssminify']);
});


gulp.task('build', ['htmlminify'], function(done){
  done();
});

gulp.task('default', ['watch']);
