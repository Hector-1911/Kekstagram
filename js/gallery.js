'use strict';

(function () {
   /// Load and Render Photos ///

   var onLoad = function (data) {
      gallery.photos = data;
      backupPhotoArray = data;
      importPhoto(gallery.photos);
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      addEventOnSortButton();
   };

   window.backend.load(onLoad, window.errorScan.onError);

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

   pictures.addEventListener('click', window.preview.getOnClickImage);

   /// Sorting Photos ///

   var defaultButton = document.getElementById('filter-default');
   var randomButton = document.getElementById('filter-random');
   var discussedButton = document.querySelector('#filter-discussed');
   var backupPhotoArray = [];

   var removePhotos = function () {
      var collection = pictures.querySelectorAll('.picture');

      collection.forEach(function (element) {
         element.remove();
      });
   };

   var sortDefaultPhotos = function (array) {
      var defaultArray = array.slice();
      gallery.photos = defaultArray;
      removePhotos();
      importPhoto(gallery.photos);
   };

   var sortRandomPhotos = function (array) {
      var defaultArray = array.slice();
      var randomArray = [];

      for (var i = 0; i < 10; i++) {
         var randomNumber = window.tools.getRanbomNumber(0, defaultArray.length - 1);
         randomArray.push(defaultArray[randomNumber]);
         defaultArray.splice(randomNumber, 1);
      };

      gallery.photos = randomArray;
      removePhotos();
      importPhoto(gallery.photos);
   };

   var sortDiscussedPhotos = function (array) {
      var defaultArray = array.slice();
      var sorted = defaultArray.sort(function (left, right) {
         return right.comments.length - left.comments.length;
      });

      gallery.photos = sorted;
   };

   var importDefaultPhotos = function () {
      sortDefaultPhotos(backupPhotoArray);
      removePhotos();
      importPhoto(gallery.photos);
   };

   var importRandomPhotos = function () {
      sortRandomPhotos(backupPhotoArray);
      removePhotos();
      importPhoto(gallery.photos);
   };

   var importDiscussedPhotos = function () {
      sortDiscussedPhotos(backupPhotoArray);
      removePhotos();
      importPhoto(gallery.photos);
   };

   var addEventOnSortButton = function () {
      defaultButton.addEventListener('click', importDefaultPhotos);
      randomButton.addEventListener('click', importRandomPhotos);
      discussedButton.addEventListener('click', importDiscussedPhotos);
   };

   /// Export ///

   window.gallery = {
      photos: [],
   };
})();





