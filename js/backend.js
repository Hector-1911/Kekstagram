'use strict';

/// Загрузка и Отправка данных ///

(function () {

   /// Загрузка Данных с сервера ///
   var uploadData = function (onLoad, onError) {
      var url = 'https://javascript.pages.academy/kekstagram/data';

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
         if (xhr.status === window.error.Code.SUCCESS) {
            onLoad(xhr.response);
         } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
         }
      });

      xhr.addEventListener('error', function () {
         onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
         onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', url);

      xhr.send();
   };

   /// Отправка данных на сервер ///
   var sendData = function (data, onLoad, onError) {
      var url = 'https://javascript.pages.academy/kekstagram';

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
         if (xhr.status === window.error.Code.SUCCESS) {
            onLoad();
         } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
         };
      });

      xhr.addEventListener('error', function () {
         onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
         onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('POST', url);

      xhr.send(data);
   };

   /// Экспорт в глобальную область видимости ///
   window.backend = {
      upload: uploadData,
      send: sendData,
   };
})();