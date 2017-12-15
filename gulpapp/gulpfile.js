var gulp = require("gulp");
//命令
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
/*
gulp.task 定义任务
gulp.src 找到需要执行任务的文件
gulp.dest 执行任务的文件的去处
gulp.watch 观察文件发生变化

 */

//定义任务  定义什么名称，就执行什么名称 命令gulp message
gulp.task("message",function () {
    return console.log("Gulp is running!")
});

// gulp.task("default",function () {
//     return console.log("默认任务 Gulp is running!")
// });

//拷贝文件 ,gulp 是以数据流的方式输出文件 命令 gulp copyHtml
gulp.task("copyHtml",function () {
    // gulp.src("src/index.html");//单个拷贝
    // gulp.src("src/*.html");//拷贝某个文件夹下面的所有
    gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
})
//图片压缩 命令imageTest
gulp.task("imageTest",function () {
    // gulp.src("src/image/gulp.jpg");//压缩一张图片
    gulp.src("src/image/*")
        .pipe(imageMin()) //压缩模块（图片） var imageMin = require("gulp-image"); 和这个定义的名称相同
        .pipe(gulp.dest("dist/image"));//执行压缩
});

//压缩js 命令gulp minfy
gulp.task("minfy",function () {
    // gulp.src("src/js/file.js")//压缩一个js
    gulp.src("src/js/*.js")//压缩多个js
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
});
//sass转换为css 命令gulp sassTest
gulp.task("sassTest",function () {
    gulp.src("src/sass/*.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(gulp.dest("dist/css"));
});
//代码合并cmd gulp concatTest
gulp.task("concatTest",function () {
    gulp.src("src/js/*.js")
        .pipe(concat("main.js")) //合并完之后的名字叫main.js
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});
//执行多个任务 命令 gulp
// gulp.task("default",["message","copyHtml","imageTest","sassTest","minfy"]);
gulp.task("default",["message","copyHtml","imageTest","sassTest","concatTest"]);

//监听文件是否发生变化 命令 gulp watch
gulp.task("watchTest",function () {
  gulp.watch("scr/js/*.js",['concatTest']);
  gulp.watch("scr/image/*",['imageTest']);
  gulp.watch("scr/sass/*.scss",['sassTest']);
  gulp.watch("scr/*.html",['copyHtml']);
});