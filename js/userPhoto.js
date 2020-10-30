'use strict';

/// Локальная фотография пользователя ///

(function () {

   /// Массив для проверки расширения загруженой фотографии ///
   var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

   /// Тут будет содержатся информация о загруженной фотографии
   var fileChooser = document.querySelector('.img-upload input[id=upload-file]');
   /// DOM-елемент в который будет отображатся фотография
   var prewiew = document.querySelector('.img-upload__preview img');

   fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
         return fileName.endsWith(it);
      });

      if (matches) {
         var reader = new FileReader();

         reader.addEventListener('load', function () {
            prewiew.src = reader.result;
         });

         reader.readAsDataURL(file);
      };
   });
})();