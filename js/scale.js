'use strict';

(function () {
    var imgScaleCounter = document.querySelector('.scale__control--value');
    var imgScaleMinus = document.querySelector('.scale__control--smaller');
    var imgScalePlus = document.querySelector('.scale__control--bigger');
    var imgOverlayPicture = document.querySelector('.img-upload__preview img');
    var MAX_SCALE_VALUE = 100;
    var MIN_SCALE_VALUE = 25;
    var SCALE_VALUE_STEP = 25;

    var getScaleValue = function () {
        return parseInt(imgScaleCounter.value, 10);
    };

    var setScaleValue = function (value) {
        if (value >= MIN_SCALE_VALUE && value <= MAX_SCALE_VALUE) {
            imgScaleCounter.defaultValue = value + '%';

            imgOverlayPicture.style.transform = 'scale(' + value / 100 + ')';
        }
    };

    var onScaleButtonClick = function (evt) {
        if (evt.target === imgScaleMinus) {
            setScaleValue(getScaleValue() - SCALE_VALUE_STEP);
        } else if (evt.target === imgScalePlus) {
            setScaleValue(getScaleValue() + SCALE_VALUE_STEP);
        }
    };

    imgScaleCounter.defaultValue = '100%';

    imgScaleMinus.addEventListener('click', onScaleButtonClick);
    imgScalePlus.addEventListener('click', onScaleButtonClick);
})();