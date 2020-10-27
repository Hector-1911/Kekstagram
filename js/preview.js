'use strict';

/// Создание и отрисовка большой фотографии (POPUP) в DOM-дерево ///

(function () {

   /// Показ и скрытие POPUP ///
   var bigPicture = document.querySelector('.big-picture');
   var BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

   var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
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

      pictureComment.querySelectorAll('.social__comment').forEach(function (comment) {
         comment.remove();
      });
   };

   BigPictureCloseButton.addEventListener('click', hiddenBigPicture);

   /// Создание POPUP ///
   var bildBigPicture = function (picture) {
      bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
      bigPicture.querySelector('.likes-count').textContent = picture.likes;
      bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
      bigPicture.querySelector('.social__caption').textContent = picture.description;
      bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
      bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');

      importComment(picture);
      showBigPicture();
   };

   /// Добавление комментариев в POPUP ///
   var commentsTemplate = bigPicture.querySelector('.social__comment');

   /// Создание комментария ///
   var createComments = function (object, count) {
      var commentElement = commentsTemplate.cloneNode(true);

      commentElement.querySelector('.social__picture').src = object.comments[count].avatar;
      commentElement.querySelector('.social__text').textContent = object.comments[count].message;

      return commentElement;
   };

   /// Импорт комментариев ///
   var pictureComment = bigPicture.querySelector('.social__comments');

   var importComment = function (object) {
      var commentFragment = document.createDocumentFragment();

      for (var i = 0; i < object.comments.length; i++) {
         commentFragment.appendChild(createComments(object, i));
      };

      pictureComment.appendChild(commentFragment);
   };

   /// Экспорт в глобальную область видимости ///
   window.preview = {
      bildBigPicture: bildBigPicture,
   };
})();