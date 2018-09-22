(function () {
  'use strict';

  var $root = $('html, body');
  var streamStations = $('#js-streamStations');
  var streamPlayer = $('#js-streamPlayer');
  var radioBtn = $('.js-radioBtn');
  if (radioBtn.length) {
    radioBtn.on('click', function() {
      var name = $(this).attr('data-name');
      var station = streamStations.find('.stream__station[data-name="'+name+'"]').eq(0);
      if (station.length) {
        station.trigger('click');
        $root.animate({
          scrollTop: streamPlayer
            .offset()
            .top - 100
        }, 500);
      }
    });
  }

})();