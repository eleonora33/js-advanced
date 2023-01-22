const header = document.querySelector(".header");
const inputForTextSize = document.querySelector("#text-size");
const color = document.querySelector("#color");
const inputForText = document.querySelector("#text");
const button = document.querySelector(".btn-submit");

let form = {
    textSize: 24,
    color: 'black'
}

const inputTextFromUser = () => {
    header.innerText = inputForText.value;
}

document.querySelector("#text-size").addEventListener("change", () => {
    form.textSize = inputForTextSize.value;
});

button.addEventListener("click", () => {
    form.color = document.querySelector("#color").value;

    changeHeaderColor(form.color);
    changeTextSize(form.textSize);
    inputTextFromUser();
    resetAllValues();
})

const changeHeaderColor = (color) => document.querySelector(".header").style.color = color;

const resetAllValues = () => {
    inputForTextSize.value = "";
    inputForText.value = "";
}

const changeTextSize = (textSize) => {
    document.querySelector(".header").style.fontSize = `${textSize}px`;
    document.querySelector("#text").style.fontSize = `${textSize}px`;
}

