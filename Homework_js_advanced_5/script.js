
let getPlanetsButton = document.querySelector("#get-planets-btn");
let nextButton = document.querySelector("#next-btn");
let previousButton = document.querySelector("#previous-btn");
let table = document.querySelector(".table-container");

function showPlanets(planets) {
    let tableForPlanets = `<table class="table"><tbody>`
    tableForPlanets += `<tr>
    <th>Name</th>
    <th>Climate</th>
    <th>Gravity</th>
    <th>Population</th>
  </tr>
  `
    for (let i = 0; i < planets.length; i++) {
        tableForPlanets +=
            `<tr>
                    <td> ${planets[i].name}</td>
                    <td> ${planets[i].climate}</td>
                    <td> ${planets[i].gravity}</td>
                    <td> ${planets[i].population}</td>
                </tr>`
    }
    tableForPlanets += `</tbody></table>`
    return table.innerHTML = tableForPlanets;
}

getPlanetsButton.addEventListener("click", function () {
    fetch('https://swapi.dev/api/planets/?page=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getPlanetsButton.classList.add('hidden');
            nextButton.classList.remove('hidden');

            showPlanets(data.results);
        })
        .catch(function (error) {
            console.log(`Error:`, error)
        });
});

nextButton.addEventListener("click", function () {
    fetch('https://swapi.dev/api/planets/?page=2')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            nextButton.classList.add('hidden');
            previousButton.classList.remove('hidden');

            showPlanets(data.results);
        })
        .catch(function (error) {
            console.log(`Error:`, error)
        });
});

previousButton.addEventListener("click", function () {
    fetch('https://swapi.dev/api/planets/?page=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            previousButton.classList.add('hidden');
            nextButton.classList.remove('hidden');

            showPlanets(data.results);
        })
        .catch(function (error) {
            console.log(`Error:`, error)
        });
});