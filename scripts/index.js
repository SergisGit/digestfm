(function () {
  'use strict';

  var mainSlider = $('#js-mainSlider');
  var mainSliderPrev = $('#js-mainSliderPrev');
  var mainSliderNext = $('#js-mainSliderNext');
  mainSlider.slick({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    touchMove: false,
    centerMode: false,
    variableWidth: false,
    prevArrow: '#js-mainSliderPrev',
    nextArrow: '#js-mainSliderNext'
  });

  mainSlider.on('afterChange', function(slick, currentSlide){
    mainSliderNext.removeClass('arrow-btn--disabled');
    mainSliderPrev.removeClass('arrow-btn--disabled');
    if (slick.currentTarget.slick.$slides.length-1 == currentSlide.currentSlide) {
      mainSliderNext.addClass('arrow-btn--disabled');
    }
    if (currentSlide.currentSlide == 0) {
      mainSliderPrev.addClass('arrow-btn--disabled');
    }
  });

  var eventSlider = $('#js-eventSlider');
  eventSlider.slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    touchMove: false,
    centerMode: true,
    variableWidth: true,
    appendArrows: '#js-eventBtns'
  });

  eventSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var curSl = $(this).find('.slick-current .events__slide');
    console.log(curSl);
  });


})();