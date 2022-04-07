import {isEscEvent} from './util.js';

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const showPopup = (message) => {
  const tmpl = message.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', tmpl);

  const onMessageKeydown = (evt) => {
    if (isEscEvent(evt)) {
      tmpl.remove();
      document.removeEventListener('keydown', onMessageKeydown);
    }
  };

  tmpl.addEventListener('click', () => {
    tmpl.remove();
    document.removeEventListener('keydown', onMessageKeydown);
  });

  document.addEventListener('keydown',onMessageKeydown);
};

const showErrorMessage = () => showPopup(errorMessage);

const showSuccessMessage = () => showPopup(successMessage);


export {showSuccessMessage, showErrorMessage};
