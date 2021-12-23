"use strict";

module.exports = function () {
  //слежка за изменениями в файлах
  $.gulp.task("watch", function () {
    // $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch("./dev/twig/**/*.{htm,twig}", $.gulp.series("twig"));
    $.gulp.watch(
      "./dev/static/sass/**/*.{sass,scss}",
      $.gulp.series("sass:dev")
    );
    // $.gulp.watch('./dev/static/img/svg/*.svg', $.gulp.series('svg'));
    // $.gulp.watch('./dev/static/js/**/*.js', $.gulp.series('libsJS', 'js:copy'));
    $.gulp.watch("./dev/static/js/**/*.js", $.gulp.series("js:copy"));
    $.gulp.watch(
      ["./dev/static/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,svg,SVG}"],
      $.gulp.series("img:dev")
    );
  });
};
