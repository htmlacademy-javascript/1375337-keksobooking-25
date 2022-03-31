const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');
const price = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');

//Автозаполнение координат
const setAddress = (value) => {
  address.value = value;
};

//Слайдер для поля цены
noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1000,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  price.value = Math.trunc(priceSlider.noUiSlider.get());
});

price.addEventListener ('change', (evt) => priceSlider.noUiSlider.set(evt.target.value));

export {setAddress, priceSlider};
