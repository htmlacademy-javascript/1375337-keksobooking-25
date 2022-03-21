import {getAds} from'./data.js';
import {renderPopupAd} from './card.js';
import {deactivatePage, activatePage} from './form.js';
import {validateAdForm} from './form-validation.js';

const mapCanvas = document.querySelector('#map-canvas');

const ads = getAds();
const adForm = document.querySelector('.ad-form');
const adFormElements = {
  form: adForm,
  title: adForm.querySelector('#title'),
  price: adForm.querySelector('#price'),
  rooms: adForm.querySelector('#room_number'),
  capacity: adForm.querySelector('#capacity')
};

const card = renderPopupAd(ads[0]);
mapCanvas.appendChild(card);

deactivatePage();

activatePage();

validateAdForm(adFormElements);
