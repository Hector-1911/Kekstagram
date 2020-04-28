'use strict';

(function () {
   var onLoad = function (data) {
      console.log(data);
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

         var randomLikes = window.tools.getRanbomNumber(15, 200);
         var randomComments = [];

         for (var j = 1; j <= window.tools.getRanbomNumber(1, userComments.length); j++) {

            var comment = '';

            if (window.tools.getRanbomNumber(1, 2) === 2) {
               comment = comments[window.tools.getRanbomNumber(0, comments.length - 1)] + ' ' + comments[window.tools.getRanbomNumber(0, comments.length - 1)];
            } else {
               comment = comments[window.tools.getRanbomNumber(0, comments.length - 1)];
            };

            randomComments.push(comment);
         };

         var randomDescription = description[window.tools.getRanbomNumber(0, description.length - 1)];

         object.url = 'photos/' + i + '.jpg';
         object.likes = randomLikes;
         object.comments = randomComments;
         object.description = randomDescription;

         masObjects.push(object);
      };

      return masObjects;
   };

   window.arrayObjects = createMasObjects(userComments, userDescription);

   var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');

   var renderPhoto = function (photo) {
      var photoElement = photosTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
   };

   window.pictures = document.querySelector('.pictures');

   var importPhoto = function (mas) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < mas.length; i++) {
         fragment.appendChild(renderPhoto(mas[i]));
      };

      pictures.appendChild(fragment);
   };

   importPhoto(arrayObjects);
})();





