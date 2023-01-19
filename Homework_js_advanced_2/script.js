// ## Reminder App
// * Create a reminder app
// * There should be:
//     * An input for entering the title
//     * An input for entering priority
//     * An input for color
//     * A textarea for adding a description
//     * A button for adding the reminder
//     * A button for showing all reminders
// * When the button for adding is clicked an object needs to be created with the properties from the inputs ( title, priority, color, and description )
// * The object should then be added to an array of reminders
// * When the button for showing all reminders is clicked it should show a table with title, priority, and description columns
// * The title should be the color of the "color" property

const title = document.querySelector(".title");
const priority = document.querySelector("#priority");
const color = document.querySelector("#color");
const description = document.querySelector("#text-area");
const buttonForAdd = document.querySelector(".add-remainder");
const buttonForShow = document.querySelector(".show-remainders");
const containerApp = document.querySelector(".conatiner-display");

function Reminder(title, priority, color, description) {
    this.title = title;
    this.priority = priority;
    this.color = color;
    this.description = description;
    this.reminderApp = function () {
        return `For this day remainedrs are: ${this.title} ${this.priority} ${this.color} ${this.description}`
    }
}

let reminders = [];

buttonForAdd.addEventListener("click", function () {

    if (!title.value) {
        alert('Enter the title');
        return;
    }
    if (!priority.value) {
        alert('Enter priority');
        return;
    }
    if (!color.value) {
        alert('Pick a color');
        return;
    }
    if (!description.value) {
        alert('Enter description');
        return;
    }

    reminders.push(new Reminder(title.value, priority.value, color.value, description.value));
    printReminders(reminders);

});

function printReminders(reminderArray) {
    console.log("Reminders");
    for (reminder of reminderArray) {
        console.log(`${reminder.title} ${reminder.priority} ${reminder.color} ${reminder.description}`);
    }
}

function showReminders(reminderArray) {
    console.log("Reminders:");

    let reminderTable = `<table border="2">
    <tbody>`;

    for (reminder of reminderArray) {
        reminderTable += `<tr>
            <td style="color:${reminder.color};">${reminder.title}</td>
            <td>${reminder.priority}</td>
            <td>${reminder.description}</td>
            </tr>`;
    }

    reminderTable += `</tbody>
      </table>`;

    containerApp.innerHTML = reminderTable;
}

buttonForShow.addEventListener("click", function () {

    showReminders(reminders);
    changeTitleColor();

})

color.addEventListener("change", function () {

    let pickColor = color.value;
    console.log(pickColor);
})

function changeTitleColor() {

    document.querySelector(".title").style.color = document.querySelector("#color").value;
}





