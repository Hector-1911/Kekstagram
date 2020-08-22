'use strict';

/// Обработка ошибок ///

(function () {

   /// Коды ошибок ///
   var Code = {
      SUCCESS: 200,
   };

   /// Callback функция - отрисовки ошибки в DOM дерево ///
   var errorMessage = function (message) {
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

   /// Экспорт в глобальную область видимости ///
   window.error = {
      onError: errorMessage,
      Code: Code,
   };
})();