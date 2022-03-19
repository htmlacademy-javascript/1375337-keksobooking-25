const activityFormToggle = (formClass) => {
  const form = document.querySelector(`.${formClass}`);

  if (form.classList.contains(`${formClass}--disabled`)) {
    form.classList.remove(`${formClass}--disabled`);

    Array.from(form.children).forEach((child) => {
      child.removeAttribute('disabled');
    });
  } else {
    form.classList.add(`${formClass}--disabled`);

    Array.from(form.children).forEach((child) => {
      child.setAttribute('disabled', 'true');
    });
  }
};

const activityToggle = () => {
  activityFormToggle('ad-form');
  activityFormToggle('map__filters');
};

export {activityToggle};
