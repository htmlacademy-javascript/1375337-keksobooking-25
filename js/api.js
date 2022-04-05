import {showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './popups.js';

const ADS_NUMBER = 10;
const form = document.querySelector('.ad-form');


const getAds = (onSuccess) => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data.slice(0, ADS_NUMBER));
  })
  .catch(() => {
    showAlert('Не удалось загрузить похожие объявления. Обновите страницу');
  });

const sendAd = (formData) => fetch(
  'https://25.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    body: formData,
  }
)
  .then((response) => {
    if (response.ok) {
      showSuccessMessage();
      form.reset();
    } else {
      showErrorMessage();
    }
  })
  .catch(() => showErrorMessage());


export {getAds, sendAd};
