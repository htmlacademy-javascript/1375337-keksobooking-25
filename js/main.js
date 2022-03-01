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
const TIME_CHECKIN_CHECOUT = [
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
const ADVERTISMENTS_NUMBER = 10;

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

const getLengthNumber = (number) => number.toString().length;

const getArray = (arrayInput) => {
  const arrayLength = getRandomNumber(1, arrayInput.length);
  const arrayOutput = [];
  for (let i = 0; i < arrayLength; i++) {
    const elementIndex = getRandomNumber(0, arrayInput.length - 1);
    const arrayElement = arrayInput[elementIndex];
    if (!arrayOutput.includes(arrayElement)) {
      arrayOutput.push(arrayElement);
    }
  }

  return arrayOutput;
};

let avatarNumber = 0;
const createAvatarNumber = (nextAvatarNumber) => {
  avatarNumber++ ;
  nextAvatarNumber++ ;
  if (getLengthNumber(nextAvatarNumber) < 2) {

    return `0${  avatarNumber}`;}

  return avatarNumber;
};

const createAuthorObj  = () => ({
  avatar: `img/avatars/user${  createAvatarNumber(avatarNumber)  }.png`
});

const createOfferObj  = () => ({
  title: getRandomArrayElement(TITLE),
  address: `${getRandomFloatNumber(LAT_MIN, LAT_MAX, FLOAT_NUMBER)  }, ${  getRandomFloatNumber(LNG_MIN, LNG_MAX, FLOAT_NUMBER)}`,
  price: getRandomNumber(PRICE_MIN, PRICE_MAX),
  type: getRandomArrayElement(TYPE_ACCOMMODATION),
  rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
  guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
  checkin: getRandomArrayElement(TIME_CHECKIN_CHECOUT),
  checkout: getRandomArrayElement(TIME_CHECKIN_CHECOUT),
  features: getArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getArray(PHOTO_URLS),
});

const createLocationObj  = () => ({
  address: `${getRandomFloatNumber(LAT_MIN, LAT_MAX, FLOAT_NUMBER)  }, ${  getRandomFloatNumber(LNG_MIN, LNG_MAX, FLOAT_NUMBER)}`,
});

const createAdvertisementObj  = () => ({
  author: createAuthorObj(),
  offer: createOfferObj(),
  location: createLocationObj()
});

const getAdvertisements = () => Array.from({length: ADVERTISMENTS_NUMBER}, createAdvertisementObj);

getAdvertisements();
