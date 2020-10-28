'use strict';

/// Фильтры и масштаб для фотографий ///

(function () {

   /// Фильт фотографии ///
   var filterBigPicture = document.querySelector('.img-upload__preview img');
   var pictureEffect = document.querySelector('.img-upload__effects');
   var effectBar = document.querySelector('.img-upload__effect-level');
   var effectBarPin = effectBar.querySelector('.effect-level__pin');
   var effectBarValue = effectBar.querySelector('.effect-level__value');
   var effectBarDepth = effectBar.querySelector('.effect-level__depth');
   var effectBarContainer = effectBar.querySelector('.effect-level__line');
   var MAX_EFFECT_LEVEL = 100;
   var MIN_EFFECT_LEVEL = 1;

   /// Установка стилей по-умолчанию ///
   var setDefaultStyle = function () {
      filterBigPicture.removeAttribute('class');
      filterBigPicture.style.filter = '';
      effectBarPin.style.left = '100%';
      effectBarDepth.style.width = '100%';
      effectBarValue.defaultValue = '100';
   };

   /// Добавление фильтра к фотографии ///
   var addEffect = function (evt) {
      var effectName = evt.target.value;

      setDefaultStyle();

      if (effectName !== 'none') {
         effectBar.classList.remove('hidden');
         filterBigPicture.classList.add('effects__preview--' + effectName);
      } else {
         effectBar.classList.add('hidden');
      }
   };

   pictureEffect.addEventListener('click', addEffect);

   /// Расчет уровня эффекта фильтра ///
   var calcEffectLevel = function () {
      var currentLevel = parseInt(effectBarPin.style.left, 10) / 100;

      effectBarValue.defaultValue = currentLevel * 100;

      if (filterBigPicture.classList.contains('effects__preview--chrome')) {
         filterBigPicture.style.filter = 'grayscale(' + currentLevel + ')';
      } else if (filterBigPicture.classList.contains('effects__preview--sepia')) {
         filterBigPicture.style.filter = 'sepia(' + currentLevel + ')';
      } else if (filterBigPicture.classList.contains('effects__preview--marvin')) {
         filterBigPicture.style.filter = 'invert(' + currentLevel * 100 + '%' + ')';
      } else if (filterBigPicture.classList.contains('effects__preview--phobos')) {
         filterBigPicture.style.filter = 'blur(' + currentLevel * 3 + 'px' + ')';
      } else if (filterBigPicture.classList.contains('effects__preview--heat')) {
         filterBigPicture.style.filter = 'brightness(' + ((3 - 1) * currentLevel + 1) + ')';
      };
   };

   /// Установка ползунка перемещения ///
   var setPinPosition = function (value) {
      effectBarValue.value = Math.round(value);
      effectBarPin.style.left = value + '%';
      effectBarDepth.style.width = value + '%';
   };

   /// Расчет текущего положения ползунка ///
   effectBarPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = evt.clientX;

      var scaleWidth = effectBarContainer.offsetWidth;

      var onMouseMove = function (moveEvt) {
         moveEvt.preventDefault();

         var shift = startCoords - moveEvt.clientX;

         startCoords = moveEvt.clientX;

         var currentCoords = effectBarPin.offsetLeft - shift;

         if (currentCoords < MIN_EFFECT_LEVEL) {
            currentCoords = MIN_EFFECT_LEVEL;
         } else if (currentCoords > scaleWidth) {
            currentCoords = scaleWidth;
         };

         var currentValue = currentCoords * MAX_EFFECT_LEVEL / scaleWidth;

         setPinPosition(currentValue);
         calcEffectLevel();
      };

      var onMouseUp = function (upEvt) {
         upEvt.preventDefault();

         document.removeEventListener('mousemove', onMouseMove);
         document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
   });

   /// Масштаб фотографии ///
   var imgScaleCounter = document.querySelector('.scale__control--value');
   var imgScaleMinus = document.querySelector('.scale__control--smaller');
   var imgScalePlus = document.querySelector('.scale__control--bigger');
   var imgOverlayPicture = document.querySelector('.img-upload__preview img');
   var MAX_SCALE_VALUE = 100;
   var MIN_SCALE_VALUE = 25;
   var SCALE_VALUE_STEP = 25;

   /// Получение текущего масштаба фотографии ///
   var getScaleValue = function () {
      return parseInt(imgScaleCounter.value, 10);
   };

   /// Установка масштаба фотографии ///
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