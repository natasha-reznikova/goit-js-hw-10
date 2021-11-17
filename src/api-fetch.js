export default { fetchCountries }
 
import Notiflix from 'notiflix';
function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    Notiflix.Notify.failure("Oops, there is no country with that name");
                    console.log('woops')
                }
                
              
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

