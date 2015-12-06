'use strict';

var _ = require('lodash');
var exec = require('child_process').exec;
var es = require('event-stream');

var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('perf', function() {
  var filename = gutil.env.file || '*';
  var gc = !!gutil.env.gc;

  gulp.src([
      './perf/func-comparator/**/sample.' + filename + '.js'
    ])
    .pipe(es.map(function(file, next) {
      var filepath = _.first(file.history);
      var command = ['node', gc ? '--expose_gc' : '', filepath].join(' ');
      exec(command, function(err, result) {
        console.log(result);
        next(err);
      });
    }));
});