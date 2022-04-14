import {debounce} from './util.js';
import {renderMarkers} from './map.js';

const RENDER_PINS_AMOUNT = 10;

const filters = document.querySelector('.map__filters');

const typeFilter = filters.querySelector('#housing-type');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const priceFilter = filters.querySelector('#housing-price');
const featuresFilter = filters.querySelector('#housing-features');

const RANGE_PRICE = {
  low: 10000,
  high: 50000,
};

const checkTypeValue = (ad) => typeFilter.value === 'any' || typeFilter.value === ad.offer.type;
const checkRoomsValue = (ad) => roomsFilter.value === 'any' || roomsFilter.value === ad.offer.rooms.toString();
const checkGuestsValue = (ad) => guestsFilter.value === 'any' || guestsFilter.value === ad.offer.guests.toString();

const checkPriceValue = (ad) => {
  if (priceFilter.value === 'middle') {
    return (ad.offer.price >= RANGE_PRICE.low && ad.offer.price <= RANGE_PRICE.high);
  }
  else if (priceFilter.value === 'low') {
    return (ad.offer.price  < RANGE_PRICE.low);
  }
  else if (priceFilter.value === 'high') {
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
  const filteredAds = ads
    .filter((ad) => checkTypeValue(ad) &&
        checkRoomsValue(ad) &&
        checkGuestsValue(ad) &&
        checkPriceValue(ad) &&
        checkFeaturesValue(ad));

  setPins(filteredAds.slice(0, RENDER_PINS_AMOUNT));
};

const setFiltersListeners = (ads) => {
  filters.addEventListener('change', debounce(() => filterAds(ads, renderMarkers)));
  filters.addEventListener('reset', debounce(() => renderMarkers(ads)));
};

export {setFiltersListeners};
