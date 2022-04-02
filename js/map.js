import {setAddress} from './form.js';
import {renderPopupAd} from './card.js';
import {activateAdForm, activateFilters} from './page-activation.js';
import {getAds} from'./data.js';


const ads = getAds();

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

  activateFilters();
};

const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};

const initMap = () => {
  map.on('load', activateAdForm)
    .setView(COORDINATORS_CENTER_TOKYO, MAP_ZOOM);

  L.tileLayer(
    OPEN_MAP.picture,
    {
      attribution: OPEN_MAP.attribution,
    },
  ).addTo(map);

  const mainPinMarker = createPinMarker();
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMarkerMove);
  setAddress(`${COORDINATORS_CENTER_TOKYO.lat}, ${COORDINATORS_CENTER_TOKYO.lng}`);

  //--Добавляет схожие объявления на карту
  renderMarkers(ads);
};

export {initMap};
