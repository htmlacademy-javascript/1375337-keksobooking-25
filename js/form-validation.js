const form = document.querySelector('.ad-form');

const validateAdForm = (elms) => {
  const pristine = new Pristine(elms.form, {
    classTo: 'ad-form__element',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'form__error',
  });

  const validateTitle = (value) => value.length >= 30 && value.length <= 100;

  const validatePrice = (value) => value % 1 === 0 && value > 0 && value <= 100000;

  const validateRoomsAndCapacity = () => {
    const roomsCount = parseInt(elms.rooms.value, 10);
    const capacityCount = parseInt(elms.capacity.value, 10);

    return roomsCount === 100
      ? capacityCount === 0
      : capacityCount > 0 && roomsCount >= capacityCount;
  };

  const getTitleErrorMessage = () => `Текст длиной от 30 до 100 символов. Вы ввели ${elms.title.value.length}.`;

  pristine.addValidator(
    elms.title,
    validateTitle,
    getTitleErrorMessage
  );

  pristine.addValidator(
    elms.price,
    validatePrice,
    'Целое число от 1 до 100 000 руб.'
  );

  pristine.addValidator(
    elms.rooms,
    validateRoomsAndCapacity,
    'Не может быть комнат < гостей. 100 комнат - "не для гостей".'
  );

  pristine.addValidator(
    elms.capacity,
    validateRoomsAndCapacity,
    'Не может быть гостей > комнат.'
  );

  form.addEventListener('change', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  document.addEventListener('DOMContentLoaded', () => {
    pristine.validate();
  });
};

export {validateAdForm};
