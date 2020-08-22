'use strict';

/// Создание и отрисовка галереи фотографий /// 

(function () {

   /// Галерея фотографий ///
   var pictures = document.querySelector('.pictures');

   /// Шаблон фотографии ///
   var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');

   /// Создание фотографии ///
   var createPhoto = function (photo) {
      var photoElement = photosTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
   };

   /// Отрисовка фотографий в галерею///
   var renderPhoto = function (arr) {
      var fragment = document.createDocumentFragment();

      arr.forEach(element => {
         fragment.appendChild(createPhoto(element));
      });

      pictures.appendChild(fragment);
   };

   /// Удаление фотографий из DOM дерева ///
   var removePhoto = function () {
      var collection = pictures.querySelectorAll('.picture');

      collection.forEach(element => {
         element.remove();
      });
   };

   /// Обработчик события 'клика' по фотографии ///
   // pictures.addEventListener('click', window.preview.getOnClickImage);

   /// Экспорт в глобальную область видимости ///
   window.gallery = {
      create: createPhoto,
      render: renderPhoto,
      remove: removePhoto,
   };
})();





