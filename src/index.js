import './css/styles.css';

const searchBox = document.querySelector('#search-boxsearch-box')
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")

console.log(countryList)
console.log(countryInfo)
console.log(searchBox)
// https://restcountries.com/v3.1/name/{name}
const DEBOUNCE_DELAY = 300;


fetchCountry();
fetchCountry().then(countries =>renderCountry(countries))

function fetchCountry() {
    return fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error("Error");
        });
}
        

function renderCountry(countries) {
    const markup = countries
        .map(({ name, capital, population, flags, languages }) => {
            return `<li>
          <img src="${flags.svg}" alt="" width ="30"><span>Country: ${name.official}</span>        <p><b>Population</b>: ${population}</p>
          <p><b>Flag</b>: </p>
          <p><b>Languages</b>: ${languages}</p>
        </li>`;
        })
        .join("");

  countryList.innerHTML = markup;
    console.log(countries)
}
