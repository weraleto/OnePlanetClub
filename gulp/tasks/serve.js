"use strict";

//локальный сервер
module.exports = function () {
  $.gulp.task("serve", function () {
    $.browserSync.init({
      //запуск сервера
      open: false, //не открывать браузер
      server: "./build",
    });
  });
};
