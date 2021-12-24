"use strict";

//шаблонизатор sass
module.exports = function () {
  $.gulp.task("sass:dev", function () {
    return $.gulp
      .src(["dev/static/sass/*.{sass,scss}"]) //от куда
      .on(
        "error",
        $.plugin.notify.onError(function (error) {
          //обработчик ошибок
          return {
            title: "Sass",
            message: error.message,
          };
        })
      )
      .pipe($.plugin.sourcemaps.init()) //Инициализируем sourcemap, помогает при отладке кода
      .pipe($.plugin.sass())
      .pipe($.plugin.sourcemaps.write()) //Пропишем карты
      .pipe($.gulp.dest("./build/static/css/")) //куда
      .pipe($.browserSync.reload({ stream: true }));
  });

  $.gulp.task("sassLibs", function () {
    return $.gulp
      .src([
        // 'node_modules/animate.css/animate.css',
        "node_modules/accordion/src/accordion.css",
        // 'node_modules/owl.carousel2/dist/assets/owl.carousel.css',
        // 'node_modules/slick-carousel/slick/slick.css',
        // 'node_modules/lightgallery/dist/css/lightgallery.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'dev/static/sass/libs/select2.css'
        // 'dev/static/sass/libs/ion.calendar.css'
      ])
      .pipe(
        $.plugin.autoprefixer({
          //автоматически добавляет вендорные префиксы к CSS свойствам
          browsers: ["last 10 versions", "> 5%", "ie 8"],
          cascade: true,
        })
      )
      .pipe($.plugin.csscomb())
      .pipe($.plugin.csso()) //minify css, объединение правил для селекторов
      .pipe($.plugin.concat("libs.min.css"))
      .pipe($.gulp.dest("./build/static/css/")); //куда
  });

  $.gulp.task("sass:build", function () {
    return $.gulp
      .src(["dev/static/sass/*.{sass,scss}"]) //от куда
      .pipe($.plugin.sass())
      .pipe(
        $.plugin.autoprefixer({
          //автоматически добавляет вендорные префиксы к CSS свойствам
          browsers: ["last 10 versions", "> 5%", "ie 8"],
          cascade: true,
        })
      )
      .pipe($.plugin.csscomb())
      .pipe($.plugin.csso()) //minify css, объединение правил для селекторов
      .pipe($.gulp.dest("./build/static/css/")); //куда
  });
};
