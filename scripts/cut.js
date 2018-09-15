(function () {
  'use strict';

  var dotOptions = {
    ellipsis: "\u2026 ",
    truncate: "word",
    keep: null,
    watch: "true",
    tolerance: 0
  };
  
  var cuttedText = $(".js-cut");
  
  if (cuttedText.length) {
    $.each(cuttedText, function (i) {
      if ($(this).is('[data-text]')) {
        $(this).attr('data-text',$(this).text());
      }
      $(this).dotdotdot(dotOptions);
    });
    $(window).on('resize', function () {
      cuttedText.dotdotdot(dotOptions);
    });
  }

})();