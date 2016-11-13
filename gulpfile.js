// 载入外挂
var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    //livereload = require('gulp-livereload'),  // - -原来有connect插件就好了不需要livereload
    connect = require('gulp-connect');

 
// 样式
gulp.task('styles', function() { 
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 
// 脚本
gulp.task('scripts', function() { 
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
 
// 图片
gulp.task('images', function() { 
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// 图片
gulp.task('htmls', function() { 
  return gulp.src('src/**/*.html') 
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Htmls task complete' }));
});
 
// 清理
gulp.task('clean', function() { 
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
});
 
//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});


// 预设任务
gulp.task('default', ['clean'], function() { 
    gulp.start('connect','styles', 'scripts', 'images', 'htmls','watch');
});
 
// 看守
gulp.task('watch', function() {
 
  // 看守所有.scss档
  gulp.watch('src/styles/**/*.scss', ['styles']);
 
  // 看守所有.js档
  gulp.watch('src/scripts/**/*.js', ['scripts']);
 
  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);

  // 看守所有HTML
  gulp.watch('src/**/*.html', ['htmls']);
 
  // 建立即时重整伺服器
  //var server = livereload();
  // livereload.listen();
  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  //gulp.watch(['dist/**']).on('change', function(file) {
   // server.changed(file.path);
  //});
 
});
