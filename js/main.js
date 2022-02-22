// Доработано на основе: https://dev-gang.ru/article/javascript-generirovat-sluczainoe-czislo-v-diapazone-s1azn94f4k/
const GET_RANDOM_NUMBER = (min, max) => {
  if (min > max) {
    const SWAP = min;
    min = max;
    max = SWAP;
  }
  const RANDOM_NUMBER = Math.random()*((max+1)-min) + min;
  return Math.floor(RANDOM_NUMBER);
};

GET_RANDOM_NUMBER(1,5);

const GET_RANDOM_FLOATNUMBER = (min, max, floatNumber) => {
  if (min > max) {
    const SWAP = min;
    min = max;
    max = SWAP;
  }
  const RANDOM_FLOATNUMBER = Math.random()*((max)-min) + min;
  return (RANDOM_FLOATNUMBER).toFixed(floatNumber);
};

GET_RANDOM_FLOATNUMBER(1,5,3);
