import {debounce} from './util.js';
import {renderMarkers} from './map.js';

const RENDER_PINS_AMOUNT = 10;

const filters = document.querySelector('.map__filters');

const typeFilter = filters.querySelector('#housing-type');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const priceFilter = filters.querySelector('#housing-price');
const featuresFilter = filters.querySelectorAll('.map__checkbox');

const filtersValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

const RANGE_PRICE = {
  low: 10000,
  high: 50000,
};

const checkTypeValue = (type) => filtersValues.type === 'any' || filtersValues.type === type;
const checkRoomsValue = (rooms) => filtersValues.rooms === 'any' || filtersValues.rooms === rooms.toString();
const checkGuestsValue = (guests) => filtersValues.guests === 'any' || filtersValues.guests === guests.toString();

const checkPriceValue = (price) => {
  if (filtersValues.price === 'middle') {
    return (price  >= RANGE_PRICE.low && price  <= RANGE_PRICE.high);
  }
  else if (filtersValues.price === 'low') {
    return (price  < RANGE_PRICE.low);
  }
  else if (filtersValues.price === 'high') {
    return  (price  > RANGE_PRICE.high);
  }

  return true;
};

const checkFeaturesValue = (adFeatures) => {
  if (!adFeatures || filtersValues.features.length > adFeatures.length) {
    return false;
  }
  if (filtersValues.features.length === 0 || filtersValues.features.every((feature) => adFeatures.includes(feature))) {
    return true;
  }
};

const filterAds = (ads, setPins) => {
  const offers = [];

  for (let i = 0; i < ads.length; i++) {
    const offer = ads[i].offer;
    if (checkTypeValue(offer.type) &&
        checkRoomsValue(offer.rooms) &&
        checkGuestsValue(offer.guests) &&
        checkPriceValue(offer.price) &&
        checkFeaturesValue(offer.features)&&
        offers.length <= RENDER_PINS_AMOUNT) {

      offers.push(ads[i]);
    }
  }

  setPins(offers);
};

const setFiltersListeners = (ads) => {
  typeFilter.addEventListener('change', debounce((evt) => {
    filtersValues.type = evt.target.value;
    filterAds(ads, renderMarkers);
  }));

  priceFilter.addEventListener('change', debounce((evt) => {
    filtersValues.price = evt.target.value;
    filterAds(ads, renderMarkers);
  }));

  roomsFilter.addEventListener('change', debounce((evt) => {
    filtersValues.rooms = evt.target.value;
    filterAds(ads, renderMarkers);
  }));

  guestsFilter.addEventListener('change', debounce((evt) => {
    filtersValues.guests = evt.target.value;
    filterAds(ads, renderMarkers);
  }));

  featuresFilter.forEach((feature) => {
    feature.addEventListener('click', debounce((evt) => {
      if (evt.target.checked) {
        filtersValues.features.push(evt.target.value);
      } else {
        filtersValues.features = filtersValues.features.filter((value) => value !== evt.target.value);
      }
      filterAds(ads, renderMarkers);
    }));
  });

};

export {setFiltersListeners};
