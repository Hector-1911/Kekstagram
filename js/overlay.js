'use strict';

/// Загрузка фотографии ///

(function () {

   var barEffect = document.querySelector('.img-upload__effect-level');
   var uploadImgOverlay = document.querySelector('.img-upload__overlay');
   var imgOverlayCloseButton = document.querySelector('#upload-cancel');
   var defaultPictureNone = document.querySelector('#effect-none');

   var onImgOverlayEscPress = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
         hiddenImgOverlay();
      };
   };

   var showImgOverlay = function () {
      uploadImgOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onImgOverlayEscPress);

      if (defaultPictureNone.checked) {
         barEffect.classList.add('hidden');
      };
   };

   var hiddenImgOverlay = function () {
      uploadImgOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onImgOverlayEscPress);
      uploadFile.value = '';
   };

   imgOverlayCloseButton.addEventListener('click', function () {
      hiddenImgOverlay();
   });

   var commentInput = document.querySelector('.text__description');

   commentInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImgOverlayEscPress);
   });

   commentInput.addEventListener('blur', function () {
      document.addEventListener('keydown', onImgOverlayEscPress);
   });

   var photoHashtagInput = document.querySelector('.text__hashtags');

   photoHashtagInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImgOverlayEscPress);
   });

   photoHashtagInput.addEventListener('blur', function () {
      document.addEventListener('keydown', onImgOverlayEscPress);
   });

   var uploadFile = document.querySelector('#upload-file');

   uploadFile.addEventListener('change', showImgOverlay);

   var form = document.querySelector('.img-upload__form');

   form.addEventListener('submit', function (evt) {
      window.backend.send(new FormData(form), hiddenImgOverlay, window.error.onError);
      evt.preventDefault();
   });
})();