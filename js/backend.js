'use strict';

(function () {
   window.backend = {
      load: function (onLoad, onError) {
         var url = 'https://javascript.pages.academy/kekstagram/data';

         var xhr = new XMLHttpRequest();

         xhr.responseType = 'json';

         xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
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
      },

      save: function (data, onLoad, onError) {
         var url = 'https://javascript.pages.academy/kekstagram';

         var xhr = new XMLHttpRequest();

         xhr.responseType = 'json';

         xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
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
      }
   };
})();