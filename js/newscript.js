// Get elements

const dateInput = document.getElementById("date-input");
const weightInput = document.getElementById("weight-input");
const resultsOutput = document.getElementById("results");
const graphDiv = document.getElementById("graph-display");
const graphCanvas = document.getElementById("weightChart").getContext("2d");

// Submit Button
function weightTracker() {
	// Get value from weight input
	let weight = weightInput.value;
	// Get value from date input
	let date = dateInput.value;
	// add value from weight and date into local storage
	localStorage.setItem(date, weight);
	displayResults();
}

// Get data from local storage and populate results div
function displayResults() {
	//clear results list
	resultsOutput.innerHTML = "";

	// Put dates from local storage into array to sort order
	let dateList = [];
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		dateList.push(key);
	}

	dateList.sort();
	dateList.reverse();

	//Use ordered dates to collect data from local storage

	for (let i = 0; i < dateList.length; i++) {
		let value = localStorage.getItem(dateList[i]);
		let stones = Math.floor(value / 14);
		// let pounds = value % 14;
		let pounds = (((value * 0.071429) % 1) * 14).toFixed();

		// Format Date
		let optionsYear = {
			year: "numeric",
		};
		let optionsDay = {
			day: "numeric",
		};
		let optionsMonth = {
			month: "short",
		};
		let year = new Date(dateList[i]).toLocaleDateString("en-GB", optionsYear);
		let month = new Date(dateList[i]).toLocaleDateString("en-GB", optionsMonth);
		let day = new Date(dateList[i]).toLocaleDateString("en-GB", optionsDay);

		const nth = function (d) {
			if (d > 3 && d < 21) return "th";
			switch (d % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		};

		dayString = day + nth(day);

		//Create Results list
		const node = document.createElement("li");
		const spanDate = document.createElement("span");
		spanDate.className = "date";
		const spanWeight = document.createElement("span");
		spanWeight.className = "weight";

		let dateText = document.createTextNode(`${year}  ${month} ${dayString} `);

		const weightText = document.createTextNode(
			`${stones} st \xa0\xa0\ ${pounds} lbs`
		);
		spanDate.appendChild(dateText);
		spanWeight.appendChild(weightText);
		node.appendChild(spanDate);
		node.appendChild(spanWeight);
		resultsOutput.appendChild(node);
	}
}
// 14lbs = 1 stone
// 152lbs = 10st 12lbs

//ADD EVENT LISTENER FOR PRESSING ENTER BUTTON
weightInput.addEventListener("keydown", function (event) {
	// Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		document.getElementById("calculate").click();
	}
});

// backup to csv
function backUpCsv() {
	let csvContent = "data:text/csv;charset=utf-8,";
	let rows = [];

	for (i = 0; i < localStorage.length; i++) {
		let x = [];
		let key = localStorage.key(i);
		let item = localStorage.getItem(key);
		let d = [key + "," + item];
		x.push(d);
		rows.push(x);
	}

	// Cycle through array of original data
	rows.forEach(function (rowArray) {
		// converts row into a string and separates each item with a ","
		let row = rowArray.join(",");
		// adds hidden characters at end of each row to place next row on a new line
		csvContent += row + "\r\n";
	});

	// creates filemane from current date
	let currentDate = new Date();
	let simpleDate = currentDate.toLocaleDateString();
	let filename = "MyWeight_" + simpleDate + ".csv";
	let encodedUri = encodeURI(csvContent);
	let link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
}

//Delete entry
function deleteEntry() {
	// get value from date input
	i = document.getElementById("date-input").value;
	// relate date value to local storage and delete entry
	localStorage.removeItem(i);
	//update display
	displayResults();
}

// graphDiv

//Display graph from localhost data
function displayGraph() {
	let myDates = [];
	let myWeights = [];

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		myDates.push(key);
	}

	myDates.sort();
	// myDates.reverse();
	for (let i = 0; i < myDates.length; i++) {
		let localItem = localStorage.getItem(myDates[i]);
		myWeights.push(localItem);
	}

	let myDatesLastFive = myDates.slice(-5);
	let myWeightsLastFive = myWeights.slice(-5);

	let myWeightsMax = Math.max(...myWeightsLastFive);
	let myWeightsMin = Math.min(...myWeightsLastFive);

	new Chart(graphCanvas, {
		type: "line",
		data: {
			labels: myDatesLastFive, //Your labels for Y axis go in here - must be array []
			datasets: [
				{
					label: "Weight lbs",
					data: myWeightsLastFive, // your data for X axis go in here - must be array []
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					min: myWeightsMin,
					max: myWeightsMax,
				},
			},

			plugins: {
				title: {
					display: true,
					text: "Last five entries",
				},
			},
		},
	});
}
