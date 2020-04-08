'use strict';

(function () {
    var uploadFile = document.querySelector('#upload-file');
    var uploadImgOverlay = document.querySelector('.img-upload__overlay');
    var imgOverlayCloseButton = document.querySelector('#upload-cancel');
    var defaultPictureNone = document.querySelector('#effect-none');
    var ESC_KEYCODE = 27;

    window.onImgOverlayEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
            hiddenImgOverlay();
        };
    };

    var showImgOverlay = function () {
        uploadImgOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onImgOverlayEscPress);

        if (defaultPictureNone.checked) {
            window.effectBar.classList.add('hidden');
        };
    };

    var hiddenImgOverlay = function () {
        uploadImgOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onImgOverlayEscPress);
        uploadFile.value = '';
    };

    uploadFile.addEventListener('change', showImgOverlay);

    imgOverlayCloseButton.addEventListener('click', function () {
        hiddenImgOverlay();
    });
})();