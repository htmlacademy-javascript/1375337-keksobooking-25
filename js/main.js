const TITLE = [
  'Amara Resort & Spa',
  'Desert Quail Inn',
  'Villas at Poco Diablo'
];

const TYPE_ACCOMMODATION = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIME_CHKIN_CHKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTION = [
  'Great location',
  'Cozy and sweet',
  'modern design'
];

const PHOTO_URLS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const FLOAT_NUMBER = 5;
const PRICE_MIN = 2000;
const PRICE_MAX = 10000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 5;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;
const ADS_NUMBER = 10;

const getRandomNumber = (min, max) => {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * ((max + 1) - min) + min;

    return Math.floor(randomNumber);
  } throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

const getRandomFloatNumber = (min, max, floatNumber) => {
  if (min < max && min >= 0) {
    const randomFloatNumber = Math.random() * ((max) - min) + min;

    return Number((randomFloatNumber).toFixed(floatNumber));
  } throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getArray = (arrayInput) => {
  const arrayLength = getRandomNumber(1, arrayInput.length);
  const arrayOutput = shuffle(arrayInput);

  return arrayOutput.slice(0, arrayLength);
};

const getlocationOfAd = () => {
  const locationOfAd = {
    lat: getRandomFloatNumber(LAT_MIN, LAT_MAX, FLOAT_NUMBER),
    lng: getRandomFloatNumber(LNG_MIN, LNG_MAX, FLOAT_NUMBER)
  };

  return locationOfAd;
};

const createOffer  = (lat, lng) => ({
  title: getRandomArrayElement(TITLE),
  address: `${lat}, ${lng}`,
  price: getRandomNumber(PRICE_MIN, PRICE_MAX),
  type: getRandomArrayElement(TYPE_ACCOMMODATION),
  rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
  guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
  checkin: getRandomArrayElement(TIME_CHKIN_CHKOUT),
  checkout: getRandomArrayElement(TIME_CHKIN_CHKOUT),
  features: getArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getArray(PHOTO_URLS),
});

const createAd  = (index) => {
  const locationOfAd = getlocationOfAd();

  const Ad = {
    author: {
      avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
    },
    offer: createOffer(locationOfAd.lat, locationOfAd.lng),
    locationOfAd
  };

  return Ad;
};

const getAds = () => Array.from({ length: ADS_NUMBER }, (_, idx) => createAd(idx + 1));

const ads = getAds();
window.console.log({ads});
