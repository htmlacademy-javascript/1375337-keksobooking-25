import {deactivatePage, activateFilters} from './page-activation.js';
import {setFormListeners} from './form-validation.js';
import {initMap, renderMarkers} from './map.js';
import {getAds} from'./api.js';
import {showAlert} from'./util.js';

const ERROR_MESSAGE = 'Не удалось загрузить похожие объявления. Обновите страницу';

deactivatePage();

const onLoadSuccess = (data) => {
  renderMarkers(data.slice(0, 10));
  activateFilters();
};

const onLoadFail = () => showAlert(ERROR_MESSAGE);

const loadAds = () => getAds(onLoadSuccess, onLoadFail);

initMap(loadAds);

setFormListeners();
