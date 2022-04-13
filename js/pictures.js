const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const adPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewAdPhoto = document.querySelector('.ad-form__photo');


avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

adPhotoChooser.addEventListener('change', () => {
  const file = adPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (!previewAdPhoto.firstChild) {
      const pictureOfAd = `<img src='${URL.createObjectURL(file)}' width="100%" height="100%" style="objectFit: cover" alt="Фотография жилья">`;
      previewAdPhoto.insertAdjacentHTML('beforeend', pictureOfAd);
    } else {
      previewAdPhoto.firstChild.src = URL.createObjectURL(file);
    }
  }
});

const resetPictures = () => {
  previewAvatar.src = DEFAULT_AVATAR_IMAGE;
  previewAdPhoto.firstChild.remove();
};


export {resetPictures};
