import {setAddress} from './form.js';
import {renderPopupAd} from './card.js';
import {activateAdForm} from './page-activation.js';


const COORDINATORS_CENTER_TOKYO = {
  lat: 35.6833,
  lng: 139.6820
};

const MAP_ZOOM = 10;

const OPEN_MAP = {
  picture:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

const map = L.map('map-canvas');
const markerGroop = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createPinMarker = () => L.marker(
  COORDINATORS_CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMarkers = (pins) => {
  pins.forEach((ad) => {
    const pinMarker = L.marker(ad.location, { pinIcon });
    pinMarker
      .addTo(markerGroop)
      .bindPopup(renderPopupAd(ad));
  });
};

const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};

const setPinMarker = () => {
  const mainPinMarker = createPinMarker();
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);
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

export {initMap, renderMarkers, setPinMarker};
