import {setAddress} from './form.js';
import {renderPopupAd} from './card.js';
import {activatePage} from './page-activation.js';
import {getAds} from'./data.js';


const ads = getAds();

const COORDINATORS_CENTER_TOKYO = {
  lat: 35.6833,
  lng: 139.6820
};

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

const mainPinMarker = L.marker(
  COORDINATORS_CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

//Загрузка карты
const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => activatePage())
    .setView(COORDINATORS_CENTER_TOKYO, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // --Добавляет основное объявление на карту
  mainPinMarker.addTo(map);
  setAddress(`${COORDINATORS_CENTER_TOKYO.lat}, ${COORDINATORS_CENTER_TOKYO.lng}`);

  //--Добавляет схожие объявления на карту
  ads.forEach((ad) => {
    const pinMarker = L.marker(ad.location, { pinIcon });
    pinMarker
      .addTo(map)
      .bindPopup(renderPopupAd(ad));
  });
};

//Обработчик перетаскивания главной метки
mainPinMarker.on('moveend', (evt) => {
  const coordinatorsPinMarker = evt.target.getLatLng();
  setAddress(`${coordinatorsPinMarker.lat.toFixed(5)}, ${coordinatorsPinMarker.lng.toFixed(5)}`);
});


export {loadMap};
