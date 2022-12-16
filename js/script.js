const date = document.getElementById("date").value;
const weightInput = document.getElementById("inputPounds").value;
const resultsOutput = document.getElementById("results");

let stones = Math.floor(weightInput * 0.071429);
let pounds = (((weightInput * 0.071429) % 1) * 14).toFixed();
let weightApi = date + "|" + stones + "|" + pounds + "|" + weightInput;

function weightTracker() {
	if (date && weightInput) {
		const date = document.getElementById("date").value;
		const weightInput = document.getElementById("inputPounds").value;
		let stones = Math.floor(weightInput * 0.071429);
		let pounds = (((weightInput * 0.071429) % 1) * 14).toFixed();

		let weightApi =
			date +
			"\xa0\xa0\xa0\xa0\xa0\xa0\xa0 " +
			weightInput +
			" lbs" +
			"\xa0\xa0\xa0\xa0\xa0\xa0\xa0 " +
			stones +
			"St " +
			pounds +
			"lbs ";

		localStorage.setItem(date, weightApi); //places both inputs into localstorage
		location.reload(); // reloads webpage
	}
}

let valueList = [];
for (let i = 0; i < localStorage.length; i++) {
	const key = localStorage.key(i);
	const value = localStorage.getItem(key);
	valueList.push(value);
	// resultsOutput.innerHTML += value + '</br>';
}

for (let i = 0; i < valueList.length; i++) {
	valueList.sort();
	valueList.reverse();
	resultsOutput.innerHTML += valueList[i] + "</br>";
}

//ADD EVENT LISTENER FOR PRESSING ENTER BUTTON
// Get the input field
var input = document.getElementById("inputPounds");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keydown", function (event) {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		document.getElementById("calculate").click();
	}
});

function deleteLastEntry() {
	i = document.getElementById("date").value;
	localStorage.removeItem(i);
	location.reload();
}

let dateString = localStorage.getItem("2021-12-03").replace(/ .*/, "");

console.log(dateString);

//Changes the weight inputed to stones + pounds straight after input field
function poundweightConvert(value) {
	let outputStones = Math.floor(value * 0.071429);
	let outputPounds = (((value * 0.071429) % 1) * 14).toFixed();
	document.getElementById("stones").innerHTML = outputStones;
	document.getElementById("stPounds").innerHTML = outputPounds;
	//toFixed limits the decimal place
}
