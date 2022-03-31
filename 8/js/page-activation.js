// Активная/неактивная страница
const toggleElements = (form, state) => {
  Array.from(form.children).forEach((child) => {
    child.disabled = state;
  });
};

const deactivateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);

  form.classList.add(`${formClass}--disabled`);
  toggleElements(form, true);
};

const activateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);

  form.classList.remove(`${formClass}--disabled`);
  toggleElements(form, false);
};

const deactivatePage = () => {
  deactivateForm('ad-form');
  deactivateForm('map__filters');
};

const activatePage = () => {
  activateForm('ad-form');
  activateForm('map__filters');
};

export {deactivatePage, activatePage};
