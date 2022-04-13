import {resetMap} from './map.js';
import {resetPictures} from './pictures.js';

const adForm = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');
const price = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');


const PRICE_SLIDER_OPTIONS = {
  min: 0,
  max: 100000,
  start: 1000,
  step: 1000,
  connect: 'lower'
};

const setAddress = (value) => {
  address.value = value;
};

const createSlider = (options) => noUiSlider.create(priceSlider, {
  range: {
    min: options.min,
    max: options.max,
  },
  start: options.start,
  step: options.step,
  connect: options.connect,
});

createSlider(PRICE_SLIDER_OPTIONS);

const initSlider = (validateValue) => {
  priceSlider.noUiSlider.on('update', () => {
    price.value = Math.round(priceSlider.noUiSlider.get());
    validateValue();
  });

  price.addEventListener ('change', (evt) => priceSlider.noUiSlider.set(evt.target.value));
};

const priceReset = () => {
  price.value = PRICE_SLIDER_OPTIONS.start;
  priceSlider.noUiSlider.set(PRICE_SLIDER_OPTIONS.start);
};


const formReset = () => {
  filter.reset();
  adForm.reset();
  priceReset();
  resetMap();
  resetPictures();
};

export {setAddress, initSlider, formReset};
