const TYPE_MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const validateAdForm = (elms) => {
  const pristine = new Pristine(elms.form, {
    classTo: 'ad-form__element',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  });

  //Валидация заголовка
  const validateTitle = (value) => value.length >= 30 && value.length <= 100;

  const getTitleErrorMessage = () => `Текст длиной от 30 до 100 символов. Вы ввели ${elms.title.value.length}.`;

  pristine.addValidator(
    elms.title,
    validateTitle,
    getTitleErrorMessage
  );

  //Валидация цены
  const validatePrice = (value) => {
    const selectedType = elms.type.querySelector('option:checked');

    return value % 1 === 0 && value >= TYPE_MIN_PRICE[selectedType.value] && value <= 100000;
  };

  const getPriceErrorMessage = () => {
    const selectedType = elms.type.querySelector('option:checked');

    return `Цена: от ${TYPE_MIN_PRICE[selectedType.value]} до 100 000`;
  };

  pristine.addValidator(
    elms.price,
    validatePrice,
    getPriceErrorMessage
  );

  //Изменение мин. цены в зависимости от типа жилья
  const changeMinPrice = () => {
    const selectedType = elms.type.querySelector('option:checked');
    elms.price.placeholder = TYPE_MIN_PRICE[selectedType.value];
  };

  elms.type.addEventListener('change', changeMinPrice);

  // Валидация Комнат и гостей
  const validateRoomsAndCapacity = () => {
    const roomsCount = parseInt(elms.rooms.value, 10);
    const capacityCount = parseInt(elms.capacity.value, 10);

    return roomsCount === 100
      ? capacityCount === 0
      : capacityCount > 0 && roomsCount >= capacityCount;
  };

  pristine.addValidator(
    elms.rooms,
    validateRoomsAndCapacity,
    'Комнат должно быть >= гостей. 100 комнат - "не для гостей"'
  );

  pristine.addValidator(
    elms.capacity,
    validateRoomsAndCapacity,
    'Гостей должно быть <= комнат'
  );

  // Валидация времени Заезда/выезда
  const changeTime = (timeArSelected, timeArToChange) => {
    const selectedTime = timeArSelected.querySelector('option:checked');

    for (let i = 0; i < timeArToChange.length; i++) {
      if (timeArToChange[i].value === selectedTime.value) {
        timeArToChange[i].selected = true;
      }
    }
  };

  const changeTimeIn = () => {
    changeTime(elms.timeout, elms.timein);
  };

  const changeTimeOut = () => {
    changeTime(elms.timein, elms.timeout);
  };

  elms.timeout.addEventListener('change', changeTimeIn);

  elms.timein.addEventListener('change', changeTimeOut);

  // Обработчики
  elms.form.addEventListener('change', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  elms.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  document.addEventListener('DOMContentLoaded', () => {
    pristine.validate();
  });
};

export {validateAdForm};
