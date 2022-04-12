import {setAddress} from './form.js';
import {renderPopupAd} from './card.js';
import {activateAdForm} from './page-activation.js';

const MAIN_PIN_SIZE = 52;
const PIN_SIZE = 40;
const MAP_ZOOM = 10;

const RENDER_PINS_AMOUNT = 10;

const COORDINATORS_CENTER_TOKYO = {
  lat: 35.6833,
  lng: 139.6820
};

const OPEN_MAP = {
  picture:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

const map = L.map('map-canvas');
const markerGroop = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});

const createPinMarker = () => L.marker(
  COORDINATORS_CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMarkers = (pins) => {
  const renderPins = pins.slice(0, RENDER_PINS_AMOUNT);
  markerGroop.clearLayers();
  renderPins.forEach((ad) => {
    const pinMarker = L.marker(ad.location, { icon: pinIcon });
    pinMarker
      .addTo(markerGroop)
      .bindPopup(renderPopupAd(ad));
  });
};

const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};

const mainPinMarker = createPinMarker();

const setPinMarker = () => {
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);
  setAddress(`${COORDINATORS_CENTER_TOKYO.lat}, ${COORDINATORS_CENTER_TOKYO.lng}`);
};

const resetMap = () => {
  map.setView(COORDINATORS_CENTER_TOKYO, MAP_ZOOM);
  mainPinMarker.setLatLng(new L.LatLng(COORDINATORS_CENTER_TOKYO.lat, COORDINATORS_CENTER_TOKYO.lng));
  setAddress(`${COORDINATORS_CENTER_TOKYO.lat}, ${COORDINATORS_CENTER_TOKYO.lng}`);
};

const initMap = (cb) => {
  map.on('load', () => {
    activateAdForm();
    cb();
  })
    .setView(COORDINATORS_CENTER_TOKYO, MAP_ZOOM);

  L.tileLayer(
    OPEN_MAP.picture,
    {
      attribution: OPEN_MAP.attribution,
    },
  ).addTo(map);

  setPinMarker();
};

export {initMap, renderMarkers, resetMap};
