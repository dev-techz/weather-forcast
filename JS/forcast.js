console.log("forcast.js Script Loaded");
const key = 'JzVi4HgcAQuKTkUN2qYlcbiCVIrKeGA2';

// Get City Key
const getCityCode = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query =  `?apikey=${key}&q=${city}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0].Key;
};

// Get Weather
const getWeather = async (CityKey) => {
    const base = `https://dataservice.accuweather.com/currentconditions/v1/`;
    const query =  `${CityKey}?apikey=${key}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0];
}

// getCityCode('bettiah')
// .then(data => getWeather(data))
// .then(data => console.log(data));