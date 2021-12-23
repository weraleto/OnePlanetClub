"use strict";

module.exports = function () {
  //шаблонизатор twig
  $.gulp.task("twig", function () {
    return (
      $.gulp
        .src("dev/twig/pages/**/*.{htm,twig}") //откуда
        // Stay live and reload on error
        .pipe(
          $.plugin.plumber({
            handleError: function (err) {
              console.log(err);
              this.emit("end");
            },
          })
        )
        .pipe(
          $.plugin.twig({
            // locals : {
            // 	nav: JSON.parse($.fs.readFileSync('./data/navigation.json', 'utf8')),
            // 	content: JSON.parse($.fs.readFileSync('./data/content.json', 'utf8')),
            // }
          })
        )
        .on(
          "error",
          $.plugin.notify.onError(function (error) {
            return {
              title: "Twig",
              message: error.message,
            };
          })
        )
        .pipe($.gulp.dest("build")) //куда
        .on("end", $.browserSync.reload)
    );
  });
};
