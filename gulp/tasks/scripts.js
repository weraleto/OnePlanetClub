"use strict";

//minify js
module.exports = function () {
  $.gulp.task("libsJS", () => {
    return $.gulp
      .src([
        'node_modules/jquery/dist/jquery.min.js',
        "node_modules/accordion/src/accordion.js",
        // 'dev/static/js/libs/check-gadged.js',
        // 'node_modules/jquery-validation/dist/jquery.validate.min.js',
        // 'node_modules/jquery-validation/dist/additional-methods.min.js',
        // 'node_modules/owl.carousel2/dist/owl.carousel.min.js',
        // 'node_modules/slick-carousel/slick/slick.min.js',
        // 'node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        // 'node_modules/moment/min/moment-with-locales.min.js',
        // 'dev/static/js/libs/ion.calendar.js'
      ])
      .pipe($.plugin.concat("libs.min.js"))
      .pipe($.plugin.uglifyjs())
      .pipe($.gulp.dest("./build/static/js/"))
      .pipe(
        $.browserSync.reload({
          stream: true,
        })
      );
  });

  $.gulp.task("js:copy", () => {
    return $.gulp
      .src(["./dev/static/js/*.js", "!./dev/static/js/libs.min.js"])
      .pipe($.gulp.dest("./build/static/js/"))
      .pipe(
        $.browserSync.reload({
          stream: true,
        })
      );
  });
};
