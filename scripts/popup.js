(function () {
  'use strict';

  var body = $('body');
  var letterBtn = $('.js-letterBtn');
  var letterPopup = $('#js-letterPopup');
  var letterForm = letterPopup.find('#js-letterForm');

  var tokenMeta = $('meta[name="csrf-token"]');
  var token;

  if (tokenMeta.length) {
    token = tokenMeta.attr('content');
  }

  function showPopup(popup, hiddenEl) {
    var popupMsg = popup.find('.popup__msg');
    if (popupMsg.length) {
      popupMsg.removeClass('popup__msg--active');
    }
    if (hiddenEl.length) {
      hiddenEl.removeClass('hide-block');
    }

    body.addClass('overflow');
    popup.addClass('popup--active');
    var closeBtn = popup.find('.popup__close-btn');

    function closePopup () {
      closeBtn.off('click');
      $(window).off('keydown.popup');
      body.removeClass('overflow');
      popup.removeClass('popup--active');
    }

    closeBtn.on('click', function(){
      closePopup ();
    });

    $(window).on('keydown.popup', function (event) {
      if (event.keyCode === 27) {
        closePopup ();
      }
    });

  }

  if (letterForm.length) {

    var letterAction = letterForm.attr('action');
    var workerInput = letterPopup.find('#js-workerInput');
    var letterFormEl = letterPopup.find('input,textarea');
    var letterMsg = letterPopup.find('#js-letterMsg');
    var letterError = letterPopup.find('#js-letterError');
    var letterErrorBtn = letterPopup.find('#js-letterErrorBtn');
    var letterOkBtn = letterPopup.find('#js-letterOkBtn');

    var formCloseBtn = letterForm.siblings('.popup__close-btn');

    $.each(letterBtn, function (i) {
      var thisBtn = $(this);
      var workerId = thisBtn.attr('data-id');
  
      thisBtn.on('click', function() {
        if (workerInput.length && workerId) {
          workerInput.val(workerId);
        }
        showPopup(letterPopup, letterForm);
      });
  
    });

    letterForm.on('submit', function(event) {
      event.preventDefault();

      var formData = new FormData();

      if (token) formData.append('_token', token);

      $.each(letterFormEl, function (i) {
        var thisEl = $(this);
        formData.append(thisEl.attr('name'), thisEl.val());

        if (i === letterFormEl.length-1 && !letterFormEl.hasClass('error')) {
          
          $.ajax(letterAction, {
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
              letterForm.addClass('hide-block');
              letterMsg.addClass('popup__msg--active');
              letterFormEl.val('');
              letterOkBtn.on('click', function() {
                if (formCloseBtn.length) formCloseBtn.trigger('click');
                letterMsg.removeClass('popup__msg--active');
                letterForm.removeClass('hide-block');
                letterOkBtn.off('click');
              });
            },
            error: function () {
              letterForm.addClass('hide-block');
              letterError.addClass('popup__msg--active');
              letterErrorBtn.on('click', function() {
                letterError.removeClass('popup__msg--active');
                letterForm.removeClass('hide-block');
                letterErrorBtn.off('click');
              });
            }
          });
        }
      });
    });


  }



})();