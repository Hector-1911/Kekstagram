'use strict';

(function () {
	window.tools = {
		getRanbomNumber: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
	};
})();