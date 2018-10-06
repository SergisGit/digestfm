(function () {
  'use strict';

  var collapseBtn = $('.js-collapseBtn');
  $.each(collapseBtn, function (i) {
    var btn = $(this);
    var collapsed = btn.siblings('.js-collapsed');
    btn.on('click', function() {
      btn.toggleClass('expanded');
      collapsed.toggleClass('expanded');
    });
  });

})();