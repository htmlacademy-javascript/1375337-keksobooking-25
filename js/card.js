//Формирование схожего объявления
import {getDeclination} from './util.js';

const TYPE_ACCOMMODATION_RUS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const WORD_FORMS = {
  rooms: [' комната', ' комнаты', ' комнат'],
  guests: [' гостя', ' гостей', ' гостей']
};

const template = document.querySelector('#card')
  .content
  .querySelector('.popup');

const fillFeatures = (featuresList, features) => {
  featuresList.innerHTML = '';

  features.forEach ( (feature) => {
    const li = `<li class="popup__feature popup__feature--${feature}"></li>`;
    featuresList.insertAdjacentHTML('beforeend', li);
  });
};

const fillPhotos = (photosList, photos) => {
  photosList.innerHTML = '';

  photos.forEach ( (photo) => {
    const img = `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    photosList.insertAdjacentHTML('beforeend', img);
  });
};

const renderPopupAd = (ad) => {
  const {author, offer} = ad;
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos
  } = offer;

  const card = template.cloneNode(true);
  const featuresList = card.querySelector('.popup__features');
  const photosList = card.querySelector('.popup__photos');
  const cardDescription = card.querySelector('.popup__description');

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = title;
  card.querySelector('.popup__text--address').textContent = address;
  card.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPE_ACCOMMODATION_RUS[type];
  card.querySelector('.popup__text--capacity').textContent = `${getDeclination(rooms, WORD_FORMS.rooms)} для ${getDeclination(guests, WORD_FORMS.guests)}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  if (description && description.length > 0) {
    cardDescription.textContent = description;
  } else {
    cardDescription.remove();
  }

  if (features && features.length > 0) {
    fillFeatures(featuresList, features);
  } else {
    featuresList.remove();
  }

  if (photos && photos.length > 0) {
    fillPhotos(photosList, photos);
  } else {
    photosList.remove();
  }

  return card;
};

export {renderPopupAd};
