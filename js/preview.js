'use strict';

(function () {
   var bigPicture = document.querySelector('.big-picture');
   var BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

   /// Show and Hidden Big Picture ///

   var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.keyCode.ESC) {
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

   BigPictureCloseButton.addEventListener('click', function () {
      hiddenBigPicture();
   });

   /// Create Big Picture ///

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

   var getOnClickImage = function (evt) {
      var picture = evt.target.getAttribute('src');
      var pictureObject;

      if (evt.target.classList.contains('picture__img')) {
         for (var i = 0; i < gallery.photos.length; i++) {
            if (gallery.photos[i].url === picture) {
               pictureObject = gallery.photos[i];
            }
         };

         bildBigPicture(pictureObject);
      }
   };

   /// Comments ///

   var commentsTemplate = bigPicture.querySelector('.social__comment');

   var renderComments = function (object, count) {
      var commentElement = commentsTemplate.cloneNode(true);

      commentElement.querySelector('.social__picture').src = object.comments[count].avatar;
      commentElement.querySelector('.social__text').textContent = object.comments[count].message;

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

   /// Export ///

   window.preview = {
      getOnClickImage: getOnClickImage,
   };
})();