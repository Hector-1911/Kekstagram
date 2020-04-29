'use strict';

(function () {
   var onLoad = function (data) {
      gallery.photos = data;
      importPhoto(gallery.photos);
   };

   window.backend.load(onLoad);

   var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');

   var renderPhoto = function (photo) {
      var photoElement = photosTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
   };

   var pictures = document.querySelector('.pictures');

   var importPhoto = function (mas) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < mas.length; i++) {
         fragment.appendChild(renderPhoto(mas[i]));
      };

      pictures.appendChild(fragment);
   };

   window.gallery = {
      pictures: pictures
   };
})();





