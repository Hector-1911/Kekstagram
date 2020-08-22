'use strict';

/// Устранение дребезга ///

(function () {

   var DEBOUNCE_INTERVAL = 500; // ms

   var debounce = function (callback) {
      var lastTimeout = null;

      return function (arg) {
         var parameters = [arg];
         if (lastTimeout) {
            window.clearTimeout(lastTimeout);
         }
         lastTimeout = window.setTimeout(function () {
            callback.apply(null, parameters);
         }, DEBOUNCE_INTERVAL);
      };
   };

   /// Экспорт в глобальную область видимости ///
   window.debounce = debounce;
})();