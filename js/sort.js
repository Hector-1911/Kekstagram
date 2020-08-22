'use strict';

/// Сортировка галереи фотографий ///

(function () {

   /// Сортировка по-умолчанию ///
   var sortDefaultPhotos = function () {
      var defaultArray = window.data.photos.slice();

      return defaultArray;
   };

   /// Сортировка 10 случайных фотографий ///
   var sortRandomPhotos = function () {
      var defaultArray = window.data.photos.slice();
      var randomArray = [];

      for (var i = 0; i < 10; i++) {
         var randomNumber = window.tools.getRandomNumber(0, defaultArray.length - 1);
         randomArray.push(defaultArray[randomNumber]);
         defaultArray.splice(randomNumber, 1);
      };

      return randomArray;
   };

   /// Сортировка по количеству комментариев ///
   var sortDiscussedPhotos = function () {
      var defaultArray = window.data.photos.slice();
      var sortedArray = defaultArray.sort(function (left, right) {
         return right.comments.length - left.comments.length;
      });

      return sortedArray;
   };

   /// DOM контеинер с кнопками сортировки ///
   var sortButtonsContainer = document.querySelector('.img-filters__form');

   /// Обновлениие галереи фотографий в зависимости от id нажатой кнопки сортировки ///
   var updatePhotos = window.debounce(function (buttonId) {
      window.gallery.remove();
      var photos = [];

      switch(buttonId) {

         case 'filter-default':
            photos = sortDefaultPhotos();
            break;

         case 'filter-random':
            photos = sortRandomPhotos();
            break;

         case 'filter-discussed':
            photos = sortDiscussedPhotos();
            break;

         default:
            photos = window.data.photos.slice();
      };

      window.gallery.render(photos);
   });

   /// Обработчик клика по кнопке сортировки ///
   var onSortButtonClick = function (evt) {
      var currentButton = evt.target;

      /// Забираем класс "Активной кнопки" со всех кнопок сортировки ///
      sortButtonsContainer.querySelectorAll('button').forEach(element => {
         element.classList.remove('img-filters__button--active');
      });

      /// Добавляем класс "Активной кнопки" на нажатую кнопку ///
      currentButton.classList.add('img-filters__button--active');

      updatePhotos(currentButton.id);
   };

   /// Вешаем обработчик клика на контейнер с кнопками сортировки ///
   sortButtonsContainer.addEventListener('click', onSortButtonClick);
})();