//Валидация полей формы
import {priceSlider} from './form.js';

const TYPE_MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const MAX_PRICE = 100000;

const TITLE_SYMBOLS = {
  min: 30,
  max: 100
};

const CAPACITY_ROOMS = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const createPristineInstance = () => new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

//--Валидация заголовка
const validateTitle = (value) => value.length >= TITLE_SYMBOLS.min && value.length <= TITLE_SYMBOLS.max;
const getTitleErrorMessage = () => `Вы ввели ${title.value.length}.`;

//--Валидация цены
const validatePrice = (value) => Number.isInteger(Number(value)) && value >= TYPE_MIN_PRICE[type.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () => `Цена: от ${TYPE_MIN_PRICE[type.value]} до ${MAX_PRICE}`;

//--Валидация времени Заезда/выезда
const onTimeinChange = (evt) => {
  timein.value = evt.target.value;
};

const onTimeoutChange = (evt) => {
  timeout.value = evt.target.value;
};

//--Изменение мин. цены в зависимости от типа жилья
const onPriceChange = (evt) => (price.placeholder = TYPE_MIN_PRICE[evt.target.value]);


//--Валидация Комнат и гостей
const validateRoomsAndCapacity = () => CAPACITY_ROOMS[rooms.value].includes(capacity.value);

const onFormSubmit = (evt, pristine) => {
  evt.preventDefault();
  pristine.validate();
};

const onFormChange = (evt, pristine) => {
  evt.preventDefault();
  pristine.validate();
};

//--Добавляет Валидаторы
const addValidators = (pristine) => {
  pristine.addValidator(
    title,
    validateTitle,
    getTitleErrorMessage,
    2,
    true
  );

  pristine.addValidator(
    price,
    validatePrice,
    getPriceErrorMessage,
    2,
    true
  );

  pristine.addValidator(
    rooms,
    validateRoomsAndCapacity,
    'Комнат должно быть >= гостей. 100 комнат - "не для гостей"',
    2,
    true
  );

  pristine.addValidator(
    capacity,
    validateRoomsAndCapacity,
    'Гостей должно быть <= комнат',
    2,
    true
  );

};

//--Запускает обработчики
const setFormListeners = () => {
  const pristine = createPristineInstance();

  timeout.addEventListener('change', onTimeinChange);
  timein.addEventListener('change', onTimeoutChange);
  type.addEventListener('change', onPriceChange);

  adForm.addEventListener('submit', (evt) => onFormSubmit(evt, pristine));
  adForm.addEventListener('change', (evt) => onFormChange(evt, pristine));

  priceSlider.noUiSlider.on('update', () => pristine.validate(price));

  addValidators(pristine);
};

export {setFormListeners};