"use strict";
const temp = "twig"; //pug or twig

global.$ = {
  path: {
    task: require("./gulp/paths/tasks.js"),
  },
  gulp: require("gulp"),
  del: require("del"),
  fs: require("fs"),
  browserSync: require("browser-sync").create(),
  plugin: require("gulp-load-plugins")(),
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});

//сборка для разработки

$.gulp.task(
  "dev",
  $.gulp.series(
    "clean",
    "fonts",
    // $.gulp.parallel(temp, 'sass:dev', 'libsJS', 'js:copy', 'img:dev', 'svg','fonts','sassLibs')
    $.gulp.parallel(
      temp,
      "sass:dev",
      "libsJS",
      "js:copy",
      "img:dev",
      "sassLibs"
    )
  )
);

//сборка для пользователя

$.gulp.task(
  "build",
  $.gulp.series(
    "clean",
    "fonts",
    // $.gulp.parallel(temp, 'sass:build', 'libsJS', 'js:copy', 'img:build', 'img:svg', 'svg', 'fonts','sassLibs')
    $.gulp.parallel(
      temp,
      "sass:build",
      "libsJS",
      "js:copy",
      "img:build",
      "img:svg",
      "sassLibs"
    )
  )
);

//сборка png файлов
$.gulp.task("sprite", $.gulp.series("cleansprite", "spritemade"));

//task по умолчанию
$.gulp.task("default", $.gulp.series("dev", $.gulp.parallel("watch", "serve")));
