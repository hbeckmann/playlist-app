var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('default', function(){
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      PORT:8080
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('restarting!');
  });

});

gulp.task('test', function(){
  env({vars: {ENV: 'Test'}});
  gulp.src('source/tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}))

});
