// Get elements

const dateInput = document.getElementById("date-input");
const weightInput = document.getElementById("weight-input");
const resultsOutput = document.getElementById("results");
const graphDiv = document.getElementById("graph-display");
const targetInput = document.getElementById("target-input");

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

// Set Target weight
function storeTarget() {
	if (targetInput.value) {
		localStorage.setItem("target", targetInput.value);
		displayGraph();
	}
}

// Get data from local storage and populate results div
function displayResults() {
	//clear results list
	resultsOutput.innerHTML = "";

	// Put dates from local storage into array to sort order
	let dateList = [];
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key != "target") {
			dateList.push(key);
		}
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

		const node = document.createElement("li");

		let markUp = `

			<span class="date">${year} \xa0\xa0${month} ${dayString}</span>
			<span class="weight-stones"><span class="weight-bold">${stones}</span> st \xa0\xa0\ <span class="weight-bold">${pounds}</span> lbs</span>
			<span class="weight-pounds">( ${value} lbs )</span>

		`;

		node.innerHTML = markUp;

		resultsOutput.appendChild(node);
	}

	displayGraph();
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
	//clear canvas by deleting canvas and re adding

	const graphDiv = document.getElementById("graph-display");
	let graphCanvas = document.getElementById("weightChart");

	graphCanvas.remove();

	let newCanvas = document.createElement("canvas");
	newCanvas.id = "weightChart";
	graphDiv.appendChild(newCanvas);
	graphCanvas = document.getElementById("weightChart").getContext("2d");

	//////
	let myDates = [];
	let myWeights = [];

	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key != "target") {
			myDates.push(key);
		}
	}

	myDates.sort();
	// myDates.reverse();
	for (let i = 0; i < myDates.length; i++) {
		let localItem = localStorage.getItem(myDates[i]);
		myWeights.push(localItem);
	}

	let myDatesLastFive = myDates.slice(-5);
	let myWeightsLastFive = myWeights.slice(-5);

	let targetValue = localStorage.getItem("target");

	let myWeightsMax = Math.max(...myWeightsLastFive) + 4; // +4 adds a gap at top of graph
	let myWeightsMin;
	if (Math.min(...myWeightsLastFive) < targetValue) {
		myWeightsMin = Math.min(...myWeightsLastFive) - 2; // -2 adds gap at bottom of graph
	} else {
		myWeightsMin = targetValue - 2; // -2 adds gap at bottom of graph
	}

	let targetWeight = [
		targetValue,
		targetValue,
		targetValue,
		targetValue,
		targetValue,
	]; // same number as sliced (lastFive)

	// graphCanvas.clearRect(0, 0, canvas.width, canvas.height);
	// https://stackoverflow.com/questions/40056555/destroy-chart-js-bar-graph-to-redraw-other-graph-in-same-canvas
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
				{
					label: `Target weight (${Math.ceil(targetValue / 14)} stone)`,
					data: targetWeight,
					borderWidth: 2,
					radius: 0,
				},
			],
		},
		options: {
			responsive: true,
			radius: 1, // radius of dots on graph in pixles
			scales: {
				y: {
					min: myWeightsMin,
					max: myWeightsMax,
					ticks: {
						callback: function (value) {
							return value + " lbs";
						},
						color: "#c0c9d1",
					},
					grid: {
						color: "#415c5c",
					},
				},
				x: {
					ticks: {
						color: "#c0c9d1",
					},
					grid: {
						color: "transparent",
					},
				},
			},

			plugins: {
				title: {
					display: false,
				},
				legend: {
					labels: {
						usePointStyle: true,
						pointStyle: "line",
						color: "#c0c9d1",
					},
				},
			},
		},
	});
}
