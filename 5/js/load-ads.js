//Загрузка на карту схожих объявлений
import {getAds} from'./data.js';

const TYPE_ACCOMMODATION_RUS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const ads = getAds();
const mapCanvas = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();

const getPopupfeatures = (templateFeaturesList, adsFeatures) => {
  templateFeaturesList.forEach((featuresListItem) => {
    const isNecessary = adsFeatures.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (isNecessary) {
      featuresListItem.remove();
    }
  });
};

const getPopupPhotos = (templatePhotosList, adsPhotos) => {
  templatePhotosList.innerHTML = '';

  for (let i = 0; i < adsPhotos.length; i++) {
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.src = adsPhotos[i];
    popupPhoto.alt = 'Фотография жилья';
    popupPhoto.width = '45';
    popupPhoto.height= '40';
    templatePhotosList.appendChild(popupPhoto);
  }
};

const getPopupAd = (adsAmount) => {
  for (let i = 0; i < adsAmount; i++) {
    const card = template.cloneNode(true);
    card.querySelector('.popup__avatar').src = ads[i].author.avatar;
    card.querySelector('.popup__title').textContent = ads[i].offer.title;
    card.querySelector('.popup__text--address').textContent = ads[i].offer.address;
    card.querySelector('.popup__text--price').textContent = `${ads[i].offer.price} ₽/ночь`;
    card.querySelector('.popup__type').textContent = TYPE_ACCOMMODATION_RUS[ads[i].offer.type];
    card.querySelector('.popup__text--capacity').textContent = `${ads[i].offer.rooms} комнаты для ${ads[i].offer.guests} гостей`;
    card.querySelector('.popup__text--time').textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
    card.querySelector('.popup__description').textContent = ads[i].offer.description;
    getPopupfeatures(card.querySelectorAll('.popup__feature'), ads[i].offer.features);
    getPopupPhotos(card.querySelector('.popup__photos'), ads[i].offer.photos);
    fragment.appendChild(card);
    mapCanvas.appendChild(fragment);
  }
};

export {getPopupAd};
