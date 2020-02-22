'use strict';

var ESC_KEYCODE = 27;

var getRanbomNumber = function (min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

var userComments = [
   'Всё отлично!',
   'В целом всё неплохо. Но не всё.',
   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var userDescription = [
   'Тестим новую камеру!',
   'Затусили с друзьями на море',
   'Как же круто тут кормят',
   'Отдыхаем...',
   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
   'Вот это тачка!'
];

var createMasObjects = function (comments, description) {
   var masObjects = [];

   for (var i = 1; i <= 25; i++) {
      var object = {};

      var randomLikes = getRanbomNumber(15, 200);
      var randomComments = [];

      for (var j = 1; j <= getRanbomNumber(1, userComments.length); j++) {

         var comment = '';

         if (getRanbomNumber(1, 2) === 2) {
            comment = comments[getRanbomNumber(0, comments.length - 1)] + ' ' + comments[getRanbomNumber(0, comments.length - 1)];
         } else {
            comment = comments[getRanbomNumber(0, comments.length - 1)];
         };

         randomComments.push(comment);
      };

      var randomDescription = description[getRanbomNumber(0, description.length - 1)];

      object.url = 'photos/' + i + '.jpg';
      object.likes = randomLikes;
      object.comments = randomComments;
      object.description = randomDescription;

      masObjects.push(object);
   };

   return masObjects;
};

var arrayObjects = createMasObjects(userComments, userDescription);

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

importPhoto(arrayObjects);

var bigPicture = document.querySelector('.big-picture');
var BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

var onPopupEscPress = function (evt) {
   if (evt.keyCode === ESC_KEYCODE) {
      hiddenBigPicture();
   };
};

var showBigPicture = function () {
   bigPicture.classList.remove('hidden');
   document.addEventListener('keydown', onPopupEscPress);
};

var hiddenBigPicture = function () {
   bigPicture.classList.add('hidden');
   document.removeEventListener('keydown', onPopupEscPress);
};

BigPictureCloseButton.addEventListener('click', function () {
   hiddenBigPicture();
});

bigPicture.querySelector('.big-picture__img').querySelector('img').src = arrayObjects[0].url;
bigPicture.querySelector('.likes-count').textContent = arrayObjects[0].likes;
bigPicture.querySelector('.comments-count').textContent = arrayObjects[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = arrayObjects[0].description;
bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');

var commentsTemplate = bigPicture.querySelector('.social__comment');

var renderComments = function (object, count) {
   var commentElement = commentsTemplate.cloneNode(true);

   commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRanbomNumber(1, 6) + '.svg';
   commentElement.querySelector('.social__text').textContent = object.comments[count];

   return commentElement;
};

var pictureComment = bigPicture.querySelector('.social__comments');

var importComment = function (object) {
   var commentFragment = document.createDocumentFragment();

   for (var i = 0; i < object.comments.length; i++) {
      commentFragment.appendChild(renderComments(object, i));
   };

   pictureComment.appendChild(commentFragment);
};

importComment(arrayObjects[0]);

var uploadFile = document.querySelector('#upload-file');
var uploadImgOverlay = document.querySelector('.img-upload__overlay');
var imgOverlayCloseButton = uploadImgOverlay.querySelector('#upload-cancel');

var onImgOverlayEscPress = function (evt) {
   if (evt.keyCode === ESC_KEYCODE) {
      hiddenImgOverlay();
   };
};

var showImgOverlay = function () {
   uploadImgOverlay.classList.remove('hidden');
   document.addEventListener('keydown', onImgOverlayEscPress);

   if (defaultPictureNone.checked) {
      effectBar.classList.add('hidden');
   };
};

var hiddenImgOverlay = function () {
   uploadImgOverlay.classList.add('hidden');
   document.removeEventListener('keydown', onImgOverlayEscPress);
   uploadFile.value = '';
};

uploadFile.addEventListener('change', showImgOverlay);

imgOverlayCloseButton.addEventListener('click', function () {
   hiddenImgOverlay();
});

var imgScaleCounter = document.querySelector('.scale__control--value');
var imgScaleMinus = document.querySelector('.scale__control--smaller');
var imgScalePlus = document.querySelector('.scale__control--bigger');
var imgOverlayPicture = document.querySelector('.img-upload__preview img');
var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var SCALE_VALUE_STEP = 25;

var getScaleValue = function () {
   return parseInt(imgScaleCounter.value, 10);
};

var setScaleValue = function (value) {
   if (value >= MIN_SCALE_VALUE && value <= MAX_SCALE_VALUE) {
      imgScaleCounter.defaultValue = value + '%';

      imgOverlayPicture.style.transform = 'scale(' + value / 100 + ')';
   }
};

var onScaleButtonClick = function (evt) {
   if (evt.target === imgScaleMinus) {
      setScaleValue(getScaleValue() - SCALE_VALUE_STEP);
   } else if (evt.target === imgScalePlus) {
      setScaleValue(getScaleValue() + SCALE_VALUE_STEP);
   }
};

imgScaleCounter.defaultValue = '100%';

imgScaleMinus.addEventListener('click', onScaleButtonClick);
imgScalePlus.addEventListener('click', onScaleButtonClick);

var pictureEffect = document.querySelector('.img-upload__effects');
var defaultPictureNone = pictureEffect.querySelector('#effect-none');
var effectBar = document.querySelector('.img-upload__effect-level');
var effectBarPin = effectBar.querySelector('.effect-level__pin');
var effectBarValue = effectBar.querySelector('.effect-level__value');
var effectBarDepth = effectBar.querySelector('.effect-level__depth');

var setDefaultStyle = function () {
   imgOverlayPicture.removeAttribute('class');
   imgOverlayPicture.style.filter = '';
   effectBarPin.style.left = '100%';
   effectBarDepth.style.width = '100%';
   effectBarValue.defaultValue = '100';
};

var addEffect = function (evt) {
   var effectName = evt.target.value;

   setDefaultStyle();

   if (effectName !== 'none') {
      effectBar.classList.remove('hidden');
      imgOverlayPicture.classList.add('effects__preview--' + effectName);
   } else {
      effectBar.classList.add('hidden');
   }
};

pictureEffect.addEventListener('click', addEffect);

var calcEffectLevel = function () {
   var currentLevel = parseInt(effectBarPin.style.left, 10) / 100;

   effectBarValue.defaultValue = currentLevel * 100;
   
   if (imgOverlayPicture.classList.contains('effects__preview--chrome')) {
      imgOverlayPicture.style.filter = 'grayscale(' + currentLevel + ')';
   } else if (imgOverlayPicture.classList.contains('effects__preview--sepia')) {
      imgOverlayPicture.style.filter = 'sepia(' + currentLevel + ')';
   } else if (imgOverlayPicture.classList.contains('effects__preview--marvin')) {
      imgOverlayPicture.style.filter = 'invert(' + currentLevel * 100 + '%' + ')';
   } else if (imgOverlayPicture.classList.contains('effects__preview--phobos')) {
      imgOverlayPicture.style.filter = 'blur(' + currentLevel * 3 + 'px' + ')';
   } else if (imgOverlayPicture.classList.contains('effects__preview--heat')) {
      imgOverlayPicture.style.filter = 'brightness(' + ((3 - 1) * currentLevel + 1) + ')';
   };
};

effectBarPin.addEventListener('mouseup', calcEffectLevel);



