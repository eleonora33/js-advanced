// Exercise 2
// Create a button When the button is clicked, call the StarWars api for the first person.
// Print the person name in an h1 tag.
// Print the person stats in a table:
// Height
// Birth year
// Eye color
// Hair color
// URL: https://swapi.dev/api/people/1


let buttonForSubmit = document.querySelector(".btn-submit");
let primaryContainer = document.querySelector(".primary-container");
let personName = document.querySelector(".star-wars-person-name");

function personStatsShowInTable(data) {

    let tableStatsForStarWarsPerson = `<table border="2">
    <tbody>`;

    tableStatsForStarWarsPerson += `<tr>
            <td>Height: ${data.height}</td>
            <td>Birth year: ${data.birth_year}</td>
            <td>Eye color: ${data.eye_color}</td>
            <td>Hair color: ${data.hair_color}</td>
            </tr>`;

    tableStatsForStarWarsPerson += `</tbody>
      </table>`;

    return primaryContainer.innerHTML = tableStatsForStarWarsPerson;

}

buttonForSubmit.addEventListener("click", function () {

    fetch('https://swapi.dev/api/people/1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Data:", data);
            personName.innerText = data.name;
            console.log(personName)
            personStatsShowInTable(data);
        })
        .catch(function (error) {
            console.log(`Error:`, error)
        });

});
