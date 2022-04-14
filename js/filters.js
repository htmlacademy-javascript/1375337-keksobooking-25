import {debounce} from './util.js';
import {renderMarkers} from './map.js';

const RENDER_PINS_AMOUNT = 10;

const FILTER_TYPES = {
  any: 'any',
  middle: 'middle',
  low: 'low',
  high: 'high'
};

const RANGE_PRICE = {
  low: 10000,
  high: 50000,
};

const filters = document.querySelector('.map__filters');

const typeFilter = filters.querySelector('#housing-type');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const priceFilter = filters.querySelector('#housing-price');
const featuresFilter = filters.querySelector('#housing-features');

const checkTypeValue = (ad) => typeFilter.value === FILTER_TYPES.any || typeFilter.value === ad.offer.type;
const checkRoomsValue = (ad) => roomsFilter.value === FILTER_TYPES.any || roomsFilter.value === ad.offer.rooms.toString();
const checkGuestsValue = (ad) => guestsFilter.value === FILTER_TYPES.any || guestsFilter.value === ad.offer.guests.toString();

const checkPriceValue = (ad) => {
  if (priceFilter.value === FILTER_TYPES.middle) {
    return (ad.offer.price >= RANGE_PRICE.low && ad.offer.price <= RANGE_PRICE.high);
  }
  else if (priceFilter.value === FILTER_TYPES.low) {
    return (ad.offer.price  < RANGE_PRICE.low);
  }
  else if (priceFilter.value === FILTER_TYPES.high) {
    return  (ad.offer.price  > RANGE_PRICE.high);
  }

  return true;
};

const checkFeaturesValue = ({ offer }) => {
  const featuresChecked = Array.from(featuresFilter.querySelectorAll('.map__checkbox:checked'));
  if (!offer.features || featuresChecked.length > offer.features.length) {
    return false;
  }
  if (featuresChecked.length === 0 || featuresChecked.every((feature) => offer.features.includes(feature.value))) {
    return true;
  }
};

const filterAds = (ads, setPins) => {
  const filteredAds = [];

  for (let i = 0; i < ads.length; i++) {
    if (checkTypeValue(ads[i]) &&
        checkRoomsValue(ads[i]) &&
        checkGuestsValue(ads[i]) &&
        checkPriceValue(ads[i]) &&
        checkFeaturesValue(ads[i])&&
        filteredAds.length <= RENDER_PINS_AMOUNT) {

      filteredAds.push(ads[i]);
    }
  }

  setPins(filteredAds);
};

const setFiltersListeners = (ads) => {
  filters.addEventListener('change', debounce(() => filterAds(ads, renderMarkers)));
  filters.addEventListener('reset', debounce(() => renderMarkers(ads)));
};

export {setFiltersListeners};
