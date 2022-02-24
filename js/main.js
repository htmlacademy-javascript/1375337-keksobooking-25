// Доработано на основе: https://dev-gang.ru/article/javascript-generirovat-sluczainoe-czislo-v-diapazone-s1azn94f4k/
const getRandomNumber = (min, max) => {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * ((max + 1) - min) + min;

    return Math.floor(randomNumber);
  } throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

getRandomNumber(1,5);

const getRandomFloatNumber = (min, max, floatNumber) => {
  if (min < max && min >= 0) {
    const randomFloatNumber = Math.random() * ((max) - min) + min;

    return Number((randomFloatNumber).toFixed(floatNumber));
  } throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

getRandomFloatNumber(1,5,3);

