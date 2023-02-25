let linkForStatistics = document.querySelector("#statistic");
let linkForHourly = document.querySelector("#hourly");
let linkForAbout = document.querySelector("#about");

let pageForStatistic = document.querySelector(".page-statistic");
let pageForHourly = document.querySelector(".page-hourly");
let pageForAbout = document.querySelector(".page-about");

let dataFromInput = document.querySelector("#search");
let button = document.querySelector("#btn-submit");

let errorMessage = document.querySelector(".error");

linkForStatistics.addEventListener('click', function (e) {
    showStatistic();
    hideAbout();
    hideHourly();
})

linkForHourly.addEventListener('click', function (e) {
    hide();
    showHourly();
})

linkForAbout.addEventListener('click', function (e) {
    hide();
    showAbout();
})

function hide() {
    pageForStatistic.style.display = 'none';
    pageForHourly.style.display = 'none';
    pageForAbout.style.display = 'none';
}

function showStatistic() {
    pageForStatistic.style.display = 'block';
}

function showHourly() {
    pageForHourly.style.display = 'block';
}

function showAbout() {
    pageForAbout.style.display = 'block';
}

function hideAbout() {
    pageForAbout.style.display = 'none';
}

function hideHourly() {
    pageForHourly.style.display = 'none';
}

dataFromInput.addEventListener('change', function (e) {
    let input = e.target.value
    console.log(input);
})

button.addEventListener('click', function () {
    getDataFromFetch();
})

async function getDataFromFetch() {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${document.querySelector("#search").value},mk&APPID=347ee9790ac31d23f5b6d8e1c6016ca1`)
    errorMessage.style.display = 'none';
    try {
        let data = await response.json()
        fillHourlyDataInTable(data);
        fillWeatherAlertPage(data);

    } catch (err) {
        errorMessage.style.display = 'block';
        console.log(err)
        document.querySelector(".error").innerHTML = `City not found!`;
    }

}

function fillHourlyDataInTable(data) {
    pageForHourly.innerHTML = "";
    let table = `<table class="table"><tbody><thead><h1>${data.city.name}</h1>`
    table += `<tr>
    <th>Icon</th>
    <th>Description</th>
    <th>Date and Time</th>
    <th>Temperature</th>
    <th>Humidity</th>
    <th>Wind speed</th>
  </tr>
  `
    for (const hourData of data.list) {
        table +=
            `<tr>
                        <td><img src="http://openweathermap.org/img/w/${hourData.weather[0].icon}.png"</td>
                        <td> ${hourData.weather[0].description}</td>
                        <td> ${hourData.dt_txt.slice(0, 16)}</td>
                        <td> ${convertKelvinToCelcius(hourData.main.temp)}</td>
                        <td> ${hourData.main.humidity}%</td>
                        <td> ${Math.round(hourData.wind.speed)} km/h</td>
                    </tr>`
    }
    table += `</thead></tbody></table>`
    return pageForHourly.innerHTML = table;
}

const convertKelvinToCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}

function fillWeatherAlertPage(data) {
    pageForStatistic.innerHTML = "";
    let tableForWeatherAlert = `<table class="table" id="tableStat"><tbody><thead><h1>Weather Alert ${data.city.name}</h1>`
    tableForWeatherAlert += `<tr>
    <th>Highest Temperature</th>
    <th>Lowest Temperature</th>
    <th>Average Temperature</th>
    <th>Max Humidity</th>
    <th>Min Humidity</th>
    <th>Avg Humidity</th>
    <th>Warmest Time</th>
    <th>Coldest Time</th>
    </tr>
    `
    const tempsMax = data.list.map(i => i.main.temp_max);
    const tempsMin = data.list.map(i => i.main.temp_min);

    let temperatureAdvancedMetrics = data.list.reduce((acc, curr) => {
        acc.temp_max = acc.temp_max > curr.main.temp_max ? acc.temp_max : curr.main.temp_max;
        acc.temp_min = acc.temp_min < curr.main.temp_min ? acc.temp_min : curr.main.temp_min;

        return acc;
    }, {
        temp_max: -Infinity,
        temp_min: Infinity,
        temp_avg: 0
    });

    const allTemps = tempsMax.concat(tempsMin);

    temperatureAdvancedMetrics.temp_avg = allTemps.reduce((acc, curr) => acc + curr) / (allTemps.length);

    const warmestTime = data.list.find(x => x.main.temp === Math.max(...allTemps));
    const coldestTime = data.list.find(x => x.main.temp === Math.min(...allTemps));

    const allHumidity = data.list.map(i => i.main.humidity);
    const maxHumidity = Math.max(...allHumidity);
    const minHumidity = Math.min(...allHumidity);
    const sumHumidity = allHumidity.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    })

    const avgHumidity = sumHumidity / allHumidity.length;

    tableForWeatherAlert +=
        `<tr>
                    <td> ${convertKelvinToCelcius(temperatureAdvancedMetrics.temp_max)}</td>
                    <td> ${convertKelvinToCelcius(temperatureAdvancedMetrics.temp_min)}</td>
                    <td> ${convertKelvinToCelcius(temperatureAdvancedMetrics.temp_avg)}</td>
                    <td> ${maxHumidity}%</td>
                    <td> ${minHumidity}%</td>
                    <td> ${avgHumidity.toFixed(0)}%</td>
                    <td> ${warmestTime.dt_txt.slice(0, 16)}</td>
                    <td> ${coldestTime.dt_txt.slice(0, 16)}</td>
                    </tr>`

    tableForWeatherAlert += `</thead></tbody></table>`
    return pageForStatistic.innerHTML = tableForWeatherAlert;

}





