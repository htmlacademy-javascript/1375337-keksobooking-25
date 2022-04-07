const API_URL = 'https://25.javascript.pages.academy/keksobooking';


const getAds = (onSuccess, onFail) => fetch(`${API_URL}/data`)
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    onFail();
  });

const sendAd = (formData, onSuccess, onFail) => fetch(
  API_URL,
  {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => onFail());


export {getAds, sendAd};
