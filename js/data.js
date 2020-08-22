'use strict';

/// Загрузка данных с сервера ///

(function () {

   /// Callback функция - Сохранения и отрисовки скачанные с сервера фотографии ///
   var onSuccess = function (arr) {
      window.data.photos = arr.slice();
      window.gallery.render(arr);
      
      /// Показываем кнопки сортировки галереи ///
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
   };

   /// Отправка запроса на сервер для скачивания данных ///
   window.backend.upload(onSuccess, window.error.onError);

   /// Экспорт 'массива скачанных с сервера фотографий' в глобальную область видимости ///
   window.data = {
      photos: [],
   };
})();