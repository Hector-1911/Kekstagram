'use strict';

(function () {
   var onLoad = function (data) {
      gallery.photos = data;
      importPhoto(gallery.photos);
   };

   var onError = function (message) {
      var node = document.createElement('div');

      node.style = 'z-index: 1000; margin: 0 auto; background-color: black; text-align: center; color: red; padding: 10px;'
      node.style.position = 'fixed';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '24px';

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(function () {
         node.remove();
      }, 10000);
   };

   window.backend.load(onLoad, onError);

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
      pictures: pictures,
      onError: onError
   };
})();





