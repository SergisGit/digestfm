(function () {
  'use strict';

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
    document
      .querySelector('html')
      .classList
      .add('is-ios');
  }

  var body =$('body');
  var navCheck = $('#nav-check');
  navCheck.on('change', function () {
    if ($(this).is(':checked')) {
      body.addClass('overflow-960');
    } else {
      body.removeClass('overflow-960');
    }
  });

  var streamCurrent = $('#js-streamCurrent');
  var streamStations = $('#js-streamStations');
  var defaultStation = streamStations.find('.stream__station').eq(0);
  var defaultStationLink = defaultStation.attr('data-link');

  function showCurrentStation(el) {
    var currentName = el.attr('data-name') ? '<div class="stream__current-name">'+el.attr('data-name')+'</div>' : '';
    var currentVolume = el.attr('data-volume') ? '<div class="stream__current-volume">'+el.attr('data-volume')+'</div>' : '';
    var currentSvg = el.find('svg').clone().removeClass('stream__station-svg').addClass('stream__current-svg');
    streamCurrent.empty().append(currentSvg);
    streamCurrent.append('<div class="stream__current-info">'+currentName+currentVolume+'</div>');
  }

  defaultStation.addClass('stream__station--active');
  showCurrentStation(defaultStation);

  streamStations.slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    touchMove: false,
    centerMode: false,
    variableWidth: true,
    prevArrow: '#js-streamListPrev',
    nextArrow: '#js-streamListNext'
  });

  var streamPlayer = new Playerjs({id:"js-streamPlayer", file:defaultStationLink});

  var streamSlides = streamStations.find('.slick-slide');
  var streamStation = streamStations.find('.stream__station');
  var streamPrev = $('#js-streamPrev');
  var streamNext = $('#js-streamNext');

  streamStation.on('click', function() {
    var activeLink = $(this).attr('data-link');
    streamPlayer.api('play',activeLink);
    var activeStation = streamStations.find('[data-link="'+activeLink+'"]');
    streamStation.removeClass('stream__station--active');
    activeStation.addClass('stream__station--active');
    showCurrentStation($(this));
  });

  function closestStreamIndex () {
    var currentSlide = streamStations.find('.slick-current');
    if (currentSlide.find('.stream__station--active').length) {
      return currentSlide.index();
    } else {
      var difference = 0;
      var currentIndex = currentSlide.index();
      var closestIndex = currentIndex;
      $.each(streamStations.find('.stream__station--active').closest('.slick-slide'), function (i) {
        if (i===0) {
          closestIndex = $(this).index();
          difference = Math.abs(currentIndex - closestIndex);
        } else {
          var newDifference = Math.abs(currentIndex - $(this).index());
          if(newDifference < difference) {
            closestIndex = $(this).index();
            difference = newDifference;
          }
        }
      });
      return closestIndex;
    }
  }

  streamNext.on('click', function() {
    var nextIndex = closestStreamIndex();
    streamSlides.eq(nextIndex+1).find('.stream__station').trigger('click');
    streamStations.slick('slickGoTo', nextIndex);
  });

  streamPrev.on('click', function() {
    var prevIndex = closestStreamIndex()-1;
    streamSlides.eq(prevIndex).find('.stream__station').trigger('click');
    streamStations.slick('slickGoTo', prevIndex-1);
  });
  

})();