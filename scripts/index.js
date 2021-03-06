(function () {
  'use strict';

  var mainSlider = $('#js-mainSlider');
  mainSlider.slick({
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 1,
    adaptiveHeight: true,
    touchMove: false,
    centerMode: false,
    variableWidth: false,
    appendArrows: '#js-mainSliderBtns'
  });

  var eventSlider = $('#js-eventSlider');
  eventSlider.slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    touchMove: false,
    centerMode: true,
    variableWidth: true,
    appendArrows: '#js-eventsSliderWrapper'
  });

})();