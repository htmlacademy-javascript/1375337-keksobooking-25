import {deactivatePage} from './page-activation.js';
import {setFormListeners} from './form-validation.js';
import {loadMap} from './map.js';

deactivatePage();

loadMap();

setFormListeners();
