import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import countriesListTemplate from './templates/countries-list.hbs';
import countriesCardTemplate from './templates/countries-card.hbs';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const listContainer = document.querySelector('.country-list');
const cardContainer = document.querySelector('.country-info');

const onInputEl = event => {
  let searchQuery = event.target.value.trim();

  const renderCountryCard = countries => {
    countries.languages = Object.values(countries.languages).join(', ');
    const country = countriesCardTemplate(countries);
    cardContainer.innerHTML = country;
  };

  fetchCountries(searchQuery)
    .then(data => {
      console.log(data);

      listContainer.innerHTML = '';
      cardContainer.innerHTML = '';

      if (data.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }

      if (data.length >= 2) {
        listContainer.innerHTML = countriesListTemplate(data);
      }

      if (data.length === 1) {
        renderCountryCard(data[0]);
      }
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
};

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

//  1 створити новий обєкт з переписаним полем languages
// 3 використати метод джойн
// 4 передавати новий обєкт

// 2 з обєкту зробити масив значень обєкту
