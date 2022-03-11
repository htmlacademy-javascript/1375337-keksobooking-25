import {getAds} from'./data.js';
import {getPopupAd} from './load-ads.js';

const ads = getAds();
window.console.log({ads});

getPopupAd(1);
