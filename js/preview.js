'use strict';

(function () {
    var bigPicture = document.querySelector('.big-picture');
    var BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
    var ESC_KEYCODE = 27;

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
            for (var i = 0; i < arrayObjects.length; i++) {
                if (arrayObjects[i].url === picture) {
                    pictureObject = arrayObjects[i];
                }
            };

            bildBigPicture(pictureObject);
        }
    };

    var commentsTemplate = bigPicture.querySelector('.social__comment');

    var renderComments = function (object, count) {
        var commentElement = commentsTemplate.cloneNode(true);

        commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.tools.getRanbomNumber(1, 6) + '.svg';
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

    pictures.addEventListener('click', getOnClickImage);
})();