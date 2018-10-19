(function () {
  'use strict';

  var body = $('body');

  var galleryList = $('.js-galleryList');
  if (galleryList.length) {
    $.each(galleryList, function () {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        fixedContentPos: false,
        tLoading: 'Loading...',
        mainClass: 'mfp-img-popup',
        closeBtnInside: false,
        closeOnBgClick: true,
        gallery: {
          enabled: true,
          navigateByImgClick: true,

          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: 'Не удалось загрузить',
          navigateByImgClick: true,
          titleSrc: function (item) {
            var title = '';
            var time = '';
            var result;

            var cardTitle = item.el.siblings('.card__info').find('.card__title');
            var cardTime = item.el.siblings('.card__info').find('.card__time');
           
            if (cardTitle.length) {
              title = cardTitle.text();
            }

            if (cardTime.length) {
              time = cardTime.text();
            }

            if (title.length && time.length) {
              return '<div class="mfp-title-time">' + time + '</div><div class="mfp-title-heading">' + title + '</div>';
            }

            if (title.length) {
              return '<div class="mfp-title-heading">' + title + '</div>';
            }
          }
        },
        callbacks: {
          open: function () {
            body.addClass('overflow');
            var magnificPopup = $.magnificPopup.instance;
            document
              .querySelector('.mfp-container')
              .addEventListener('touchstart', handleTouchStart, false);
            document
              .querySelector('.mfp-container')
              .addEventListener('touchmove', handleTouchMove, false);
            var xDown = null;
            var yDown = null;

            function handleTouchStart(evt) {
              xDown = evt.touches[0].clientX;
              yDown = evt.touches[0].clientY;
            }

            function handleTouchMove(evt) {
              if (!xDown || !yDown) {
                  return;
              }

              var xUp = evt.touches[0].clientX;
              var yUp = evt.touches[0].clientY;

              var xDiff = xDown - xUp;
              var yDiff = yDown - yUp;
              if (Math.abs(xDiff) + Math.abs(yDiff) > 150) { //to deal with to short swipes

                if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                    if (xDiff > 0) {/* left swipe */
                        magnificPopup.next();
                    } else {/* right swipe */
                        magnificPopup.prev();
                    }
                }
                /* reset values */
                xDown = null;
                yDown = null;
              }
            }
          },
          close: function () {
              body.removeClass('overflow');
          }
        }
      });
    });
  }

  var videoList = $('.js-videoList');
  if (videoList.length) {
    $.each(videoList, function () {

      $(this).magnificPopup({
        delegate: 'a',
        type: 'iframe',
        fixedContentPos: false,
        tLoading: 'Loading...',
        mainClass: 'mfp-img-popup',
        closeBtnInside: false,
        closeOnBgClick: true,
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          tCounter: '',
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        iframe: {
          markup: '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                  '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
        
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: 'v=',
              src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
            },
            youtube2: {
              index: 'youtu.be/',
              id: '/',
              src: 'https://www.youtube.com/embed/%id%?autoplay=1'
            },
            vimeo: {
              index: 'vimeo.com/',
              id: '/',
              src: 'https://player.vimeo.com/video/%id%?autoplay=1'
            }        
          },
        
          srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        },
        callbacks: {
          open: function () {
            body.addClass('overflow');
          },
          close: function () {
              body.removeClass('overflow');
          }
        }
      });

    });
  }

  var audio = $('.js-audio');
  if (audio.length) {
    $.each(audio, function (index) {
      var thisAudio = $(this);
      var counter = 1 + index;
      var thisId = 'js-audio-'+counter;
      thisAudio.attr('id',thisId);
      var link = thisAudio.attr('data-link');
      var audioPlayer = new Playerjs({id:thisId, file:link, player:2});

    });
  }

})();