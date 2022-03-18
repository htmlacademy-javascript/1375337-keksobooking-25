const getRandomNumber = (min, max) => {
  if (min < max && min >= 0) {
    const randomNumber = Math.random() * ((max + 1) - min) + min;

    return Math.floor(randomNumber);
  } throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

const getRandomFloatNumber = (min, max, floatNumber) => {
  if (min < max && min >= 0) {
    const randomFloatNumber = Math.random() * ((max) - min) + min;

    return Number((randomFloatNumber).toFixed(floatNumber));
  } throw new Error('Диапазон задан неверно: минимальное значение диапазона должно быть меньше максимального. Граничные значения диапазона не могут быть меньше 0.');
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getShuffleArraySlice = (arrayInput) => {
  const arrayLength = getRandomNumber(0, arrayInput.length);
  const arrayOutput = shuffle(arrayInput);

  return arrayOutput.slice(arrayLength);
};

const getDeclination = (num, word) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return num + word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
};

export {getRandomNumber, getRandomFloatNumber, getShuffleArraySlice, getRandomArrayElement, getDeclination};
