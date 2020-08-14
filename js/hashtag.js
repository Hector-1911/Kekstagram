'use strict';

(function () {
   /// Hashtag Filters ///
   
   var hashtagInput = document.querySelector('.text__hashtags');

   var checkTheSameHashtag = function (array) {

      for (var i = 0; i < array.length; i++) {
         array[i] = array[i].toLowerCase();
      };

      var counter = 0;

      for (var x = 0; x < array.length; x++) {
         var currentString = array[x];
         var hitCounter = 0;

         for (var y = 0; y < array.length; y++) {

            if (currentString === array[y]) {
               hitCounter = hitCounter + 1;
            }

            if (hitCounter > 1) {
               counter = counter + 1;
            }
         };
      };

      if (counter > 0) {
         return true;
      } else {
         return false;
      };
   };

   var checkTooMoreHashtag = function (string) {
      var result = 0;

      for (var i = 0; i < string.length; i++) {
         if (string[i] === '#') {
            result += 1;
         }
      };

      if (result > 1) {
         return true;
      } else {
         return false;
      };
   };

   var checkInputValueHashtag = function (inputValue) {

      if (inputValue === '') {
         return '';
      };

      var array = inputValue.split(' ');

      for (var i = 0; i < array.length; i++) {
         if (array[i][0] !== '#') {
            return 'invalid first latter';
         }
         if (array[i].length === 1) {
            return 'tag length too small';
         }
         if (array[i].length > 20) {
            return 'tag langth too long';
         }
         if (checkTooMoreHashtag(array[i]) === true) {
            return 'too much hashtag in string';
         }
      };

      if (checkTheSameHashtag(array) === true) {
         return 'invalid similar tags';
      }
      if (array.length > 5) {
         return 'invalid count tags';
      }
   };

   hashtagInput.addEventListener('input', function (evt) {
      var target = evt.target;

      if (checkInputValueHashtag(target.value) === 'invalid first latter') {
         target.setCustomValidity('Хэш-тег должен начинаться со знака # и отделяться пробелом');
      } else if (checkInputValueHashtag(target.value) === 'tag length too small') {
         target.setCustomValidity('Хэш-тег не быть меньше 2 символов');
      } else if (checkInputValueHashtag(target.value) === 'tag langth too long') {
         target.setCustomValidity('Хэш-тег не должен превышать 20 символов');
      } else if (checkInputValueHashtag(target.value) === 'too much hashtag in string') {
         target.setCustomValidity('Нельзя использовать знак # в теле хэш-тега');
      } else if (checkInputValueHashtag(target.value) === 'invalid similar tags') {
         target.setCustomValidity('Нельзя использовать один и тотже хэш-тег дважды');
      } else if (checkInputValueHashtag(target.value) === 'invalid count tags') {
         target.setCustomValidity('Нельзя указывать больше 5 хэш-тегов');
      } else {
         target.setCustomValidity('');
      };
   });
})();