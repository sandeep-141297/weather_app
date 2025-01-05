let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");

let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelslike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");


// default city
let city = 'delhi';

// search functionality
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    // console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = '';
});

// get the actual country name by code
const getCountryName = (countryCode) => {
    const countryName = new Intl.DisplayNames([countryCode], {
        type: 'region'
    }).of(countryCode);
    return countryName;
}

// get the date & time
const getDateTime = (dt) => {
    // convert seconds to milliseconds
    const curDate = new Date(dt * 1000);
    // console.log(curDate);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        //second: "numeric"
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    // console.log(formatter);
    return formatter.format(curDate);
}

const getWeatherData = async () => {
    // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=42e4d73aa0ac95bbd0fc37b2ef56e964`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=42e4d73aa0ac95bbd0fc37b2ef56e964`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        const {
            main,
            name,
            weather,
            wind,
            sys,
            dt
        } = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        w_feelslike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
    } catch (error) {
        console.log(error);
    }
};

document.body.addEventListener("load", getWeatherData());