const successMessage = document.querySelector('#success').content.children[0];
const errorMessage = document.querySelector('#error').content.children[0];

const onSuccessMessageAction = (evt) => {
  if (evt.key === 'Escape' || evt.type === 'click') {
    successMessage.remove();

    document.removeEventListener('click', onSuccessMessageAction);
    document.removeEventListener('keydown', onSuccessMessageAction);
  }
};

const showSuccessMessage = () => {
  document.body.insertAdjacentElement('beforeend', successMessage);

  document.addEventListener('click', onSuccessMessageAction);
  document.addEventListener('keydown', onSuccessMessageAction);
};

const onErrorMessageAction = (evt) => {
  if (evt.key === 'Escape' || evt.type === 'click') {
    errorMessage.remove();

    document.removeEventListener('click', onErrorMessageAction);
    document.removeEventListener('keydown', onErrorMessageAction);
  }
};

const showErrorMessage = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);

  document.addEventListener('click', onErrorMessageAction);
  document.addEventListener('keydown', onErrorMessageAction);
};


export {showSuccessMessage, showErrorMessage};
