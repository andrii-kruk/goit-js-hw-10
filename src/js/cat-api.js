import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_Mocl3qv6ZtxCwuqBMmTG1Yg6RkJCaPwLMzaCOF24sWV4O12QRsSlSgyPWbz0CNy7';
const option = {
  headers: {
    'x-api-key': API_KEY,
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, option).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/${breedId}`, option).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    }
    return response.json();
  });
}
