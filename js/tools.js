'use strict';

/// Инструменты ///

(function () {

	/// Генератор рандомного числа ///
	var randomNumberGenerator = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/// Экспорт в глобальную область видимости ///
	window.tools = {
		getRandomNumber: randomNumberGenerator,
	};
})();