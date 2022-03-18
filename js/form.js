const deactivateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  const formChildren = Object.values(form.children);

  form.classList.add(`${formClass}--disabled`);

  formChildren.forEach((child) => {
    child.classList.add('disabled');
  });
};

const activateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  const formChildren = Object.values(form.children);

  form.classList.remove(`${formClass}--disabled`);

  formChildren.forEach((child) => {
    child.classList.remove('disabled');
  });
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
