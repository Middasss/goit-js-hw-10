const MAIN_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = name => {
  return fetch(
    `${MAIN_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
};
