import refs from './js/refs';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';
import SlimSelect from 'slim-select';
refs.select.addEventListener('change', onSelect);

function onSelect(event) {
  const selectedBreed = event.target.value;
  refs.loader.classList.remove('is-hidden');
  refs.selectContainer.classList.add('is-hidden');
  fetchCatByBreed(selectedBreed)
    .then(response => {
      renderCatMarkup(response);
      refs.loader.classList.add('is-hidden');
      refs.selectContainer.classList.remove('is-hidden');
    })
    .catch(error => {
      error;
      refs.loader.classList.add('is-hidden');
    });
}

fetchBreeds()
  .then(breeds => {
    const optionsData = breeds.map(breed => ({
      text: breed.name,
      value: breed.reference_image_id,
    }));

    const select = new SlimSelect({
      select: refs.select,
      data: [
        {
          label: 'Breeds',
          options: optionsData,
        },
      ],
    });

    refs.selectContainer.classList.remove('is-hidden');
    refs.loader.classList.add('is-hidden');
  })
  .catch(error => {
    error;
    refs.loader.classList.add('is-hidden');
  });

function renderCatMarkup(cat) {
  const markup = `
  <img src="${cat.url}" alt="${cat.id}" class="cat-img" />

    <div class="about-container">
    <h1 class="name">${cat.breeds[0].name}</h1>
    <p class="about">${cat.breeds[0].description}</p>
    <p class="temperament"><span>Temperament:</span>${cat.breeds[0].temperament}</p>
    </div>`;

  refs.container.innerHTML = markup;
}

export { renderCatMarkup };
