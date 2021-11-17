import './css/styles.css';
import apiFetch from './api-fetch';

const searchBox = document.querySelector('#search-boxsearch-box')
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")

// console.log(countryList)
// console.log(countryInfo)
// console.log(searchBox)

const debounce = require('lodash.debounce');
	const DEBOUNCE_DELAY = 300;
	
	function resetCountries() {
	    countryList.innerHTML = "";
	    countryInfo.innerHTML = "";
	}

	searchBox.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY))
function onInput (){
	    resetCountries();
	
	    const countryName = searchBox.value.trim();
	    
	    if (!countryName) {
	        resetCountries();
	        return;
	    }
	
	    apiFetch.fetchCountries(countryName)
	        .then(inputOption)
	          .catch(error => { console.log(error) })
	}
	
function inputOption(countries) {
	    resetCountries()
	
	    if (countries.length > 10) {
	        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
	    }
	
	    if (countries.length >= 2 && countries.length < 10) {
	        countries.map((country) => {
	            countriesMarkup(country)
	        }).join()
	    }
	    if (countries.length === 1) {
	        countries.map((country) => {
	            countryMarkup(country)
	        }).join()
	    }
	}
	
	function countriesMarkup({name,flags}) {
	    countryList.insertAdjacentHTML('beforeend',
	        `<li class ="list">
	            <img src="${flags.svg}" width="70" height= "55">
	            <p><b>Country:</b>&nbsp ${name.official}</p>
	        </li>`)
	}
	
	function countryMarkup({name,capital,population,languages,flags}) {
	    countryInfo.insertAdjacentHTML('beforeend',
	        `   <img src="${flags.svg}" width="50" height= "35"><b>&nbsp ${name.official}</b>
	            <p><b>Capital:</b> ${capital} </p
	            <p><b>Population:</b> ${population} </p>
	            <p><b>Languages: </b> ${Object.values(languages)} </p>
	         `)
	
	}
