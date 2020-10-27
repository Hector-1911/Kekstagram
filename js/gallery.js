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

   /// Отрисовка фотографий в галерею ///
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

   /// Отслеживаем 'клик' по DOM-элементу гелереи фотографий ///
   var getOnClickImage = function (evt) {

      /// Сохраняем url фотографии ///
      var imgUrl = evt.target.getAttribute('src');

      /// Ищем совпадения по url в массиве фотографий, и создаем новый массив /// 
      var imgArray = window.data.photos.slice().filter(function (element) {
         return element.url === imgUrl; 
      });

      /// Создаем объект с информацией о фотографии из нового массива ///
      var imgObject = imgArray[0];

      /// Отрисовываем большую фотографию на основе полученного объекта ///
      window.preview.bildBigPicture(imgObject);
   };

   /// Вешаем обработчик события 'клика' по галереи фотографий ///
   pictures.addEventListener('click', getOnClickImage);

   /// Экспорт в глобальную область видимости ///
   window.gallery = {
      create: createPhoto,
      render: renderPhoto,
      remove: removePhoto,
   };
})();





