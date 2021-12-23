"use strict";

//копируем изображения
module.exports = function () {
  $.gulp.task("img:dev", () => {
    return $.gulp
      .src("./dev/static/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,svg,SVG,ico}")
      .pipe($.gulp.dest("./build/static/img/"));
  });

  //оптимизация изображений tinypng
  $.gulp.task("img:build", () => {
    return (
      $.gulp
        .src("./dev/static/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,ico}")
        // .pipe($.plugin.tinypng("EJEFC_KcQukE79WvXKi9utNDDodA1Kxj"))
        .pipe($.gulp.dest("./build/static/img/"))
    );
  });
  $.gulp.task("img:svg", () => {
    return $.gulp
      .src("./dev/static/img/**/*.{svg,SVG}")
      .pipe($.gulp.dest("./build/static/img/"));
  });
};
