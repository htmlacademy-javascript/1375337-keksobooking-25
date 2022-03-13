import {getAds} from'./data.js';
import {renderPopupAd} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');

const ads = getAds();
const card = renderPopupAd(ads[0]);

mapCanvas.appendChild(card);
