console.log("app.js Script Loaded");

const card = document.querySelector('.card');
const details = document.querySelector('.details');
const cityForm = document.querySelector('form');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (city, data) => {

    // details template
    details.innerHTML = `
    <h5 class="my-3">${city}</h5>/
    <div class="my-3">${data.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${data.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

    // Upadating Night & Day Image

    const timeSrc = data.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

    // Updating Icon 

    const iconSrc = `img/icons/${data.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // Remove the d-none class fro card
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Data
    cityWeather = undefined;
    // Get City Value From User
    const city = cityForm.city.value.trim();
    cityForm.reset();
    // Getting Data From The API    
    await getCityCode(`${city}`)
        .then(data => getWeather(data))
        .then(data => cityWeather = data)
        .catch();

    updateUI(city, cityWeather);
    localStorage.setItem('savedCity', city);
});

if (localStorage.getItem('savedCity')) {

    cityWeather = undefined;
    const run = async () => {
        await getCityCode(`${localStorage.getItem('savedCity')}`)
        .then(data => getWeather(data))
        .then(data => cityWeather = data)
        .catch();
        updateUI(localStorage.getItem('savedCity'), cityWeather);
        console.log(localStorage.getItem('savedCity'));
    };
    run();
};