/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "./jquery.validate"], factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
}

	(function ($) {

		/*
		* Translated default messages for the jQuery validation plugin.
		* Locale: RU (Russian; русский язык)
		*/
		$.extend($.validator.messages, {
			required: "Поле не заполнено",
			remote: "Пожалуйста, введите правильное значение.",
			email: "Пожалуйста, введите корректный e-mail",
			url: "Пожалуйста, введите корректный URL.",
			date: "Пожалуйста, введите корректную дату.",
			dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
			number: "Пожалуйста, введите число.",
			digits: "Пожалуйста, вводите только цифры.",
			creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
			equalTo: "Пароли не совпадают!",
			extension: "Пожалуйста, выберите файл с правильным расширением.",
			maxlength: $.validator.format("Введите не больше {0} символов."),
			minlength: $.validator.format("Введите не меньше {0} символов."),
			rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
			range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
			max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
			min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
			});


		/**
		 * email pattern
		 */
		$.validator.addMethod("email", function (value, element) {
			return this.optional(element) || /^[-_\.A-Za-z0-9]+@([-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/.test(value);
		}, function() {
			return "Недопустимый Email";
		});

		return $;
	}));

(function () {

	function phoneSymbols(el) {

		el.on("change keyup input click", function(){
			if(this.value.match(/[^\d\+\(\)-\s]/g)){
				this.value = this.value.replace(/[^\d\+\(\)-\s]/g, "");
			}
		});
	
		return false;
	}

	function onlyNumbers(el) {

		el.on("change keyup input click", function(){
			if(this.value.match(/[^\d]/g)){
				this.value = this.value.replace(/[^\d]/g, "");
			}
		});
	
		return false;
	}

	function onlyLetters(el) {

		el.on("change keyup input click", function(){
			if(this.value.match(/[^A-Za-zА-Яа-яЁё-\s]/g)){
				this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё-\s]/g, "");
			}
		});
	
		return false;
	}

	var textInput = $('.js-text-input');
	if (textInput.length) {
		onlyLetters(textInput);
	}

	var numericInput = $('.js-numeric-input');
	if (numericInput.length) {
		onlyNumbers(numericInput);
	}

	var phoneInput = $('.js-phone-input');
	if (phoneInput.length) {
		phoneSymbols(phoneInput);
	}

	var letterForm = $('#js-letterForm');
	if (letterForm.length) {
		letterForm.validate({
			errorElement: 'span'
		});
	}


})();