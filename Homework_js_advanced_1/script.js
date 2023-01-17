// # Homework 
// ## Task 1
// Write JS program which calculate sum 1+2+3+...n, where n is inputted by keyboard.

// ## Task 2
// Print all digits of a given number

let inputNumber = parseInt(prompt("Enter the quantity of numbers you want to calculate "));

function sumOfNumbers() {

    let sum = 0;
    console.log(sum);
    for (let i = 0; i < inputNumber; i++) {
        let inputSecondNumber = parseInt(prompt("Enter a numbers that you want to sum"));
        console.log(inputSecondNumber);
        sum += inputSecondNumber;
    }
    return sum;

}

console.log(sumOfNumbers());

// ## Task 3
// Change the character (-) of the members of the array

let numArr = [4, -9, -98, -1, 444, 3, -555];
console.log(numArr);

for (let i = 0; i < numArr.length; i++) {
    numArr[i] = numArr[i].toString().replace("-", "");
}

console.log(numArr);

// ## Task 4
// Copy the odd elements from the given one into a new array. Print the new one in the console.
const givenArr = [12, 45, 88, 1, 567, 3, 91];

let odd = [];
for (let number of givenArr) {
    if (number % 2 === 1) {
        odd.push(number)
    }
}
console.log(odd);

// ## Task 5
// Delete all elements of the array except the numbers

let elements = ["Eleonora", 9, 5, 10, "Toso"];

let resultElement = [];

for (let element of elements) {
    if (typeof (element) === "string") {
        resultElement.slice(element, 1).push();
        console.log(element);
    }

}

let numbers = [1, 2, 3, 4, "Toso"];
numbers = numbers.filter((n) => { return n != "Toso" });
console.log(numbers);

