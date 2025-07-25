"use strict";
// Get elements

const dateInput = document.getElementById("date-input");
const weightInput = document.getElementById("weight-input");
const hiLowList = document.getElementById("hi-low");
const resultsOutput = document.getElementById("results");
const graphDiv = document.getElementById("graph-display");
const targetInputPounds = document.getElementById("target-input-pounds");
const targetInputStone = document.getElementById("target-input-stone");
const userMessage = document.getElementById("user-message");
const targetStone = document.getElementById("target-stone");
const targetPounds = document.getElementById("target-pounds");
const targetDisplay = document.getElementById("target");
const graphText = document.getElementById("graph-text");
const targetLineColor = "#36eb36";
const weightLineColor = "#348dc6";
let arrowSet = 0;
let arrow;
let entryNumber = -5;
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
	let targetPounds;
	let targetStone;

	if (targetInputPounds.value) {
		targetPounds = parseInt(targetInputPounds.value);
	} else {
		targetPounds = 0;
	}

	if (targetInputStone.value) {
		targetStone = targetInputStone.value * 14;
	} else {
		targetStone = 0;
	}

	let target = targetPounds + targetStone;

	localStorage.setItem("target", target);
	targetStone = parseInt(targetInputStone.value);
	targetInputPounds.value = "";
	targetInputStone.value = "";
	displayGraph();
	displayTargetWeight();
}

//display target weight
function displayTargetWeight() {
	if (localStorage.getItem("target")) {
		targetStone.innerText = Math.floor(localStorage.getItem("target") / 14);
		targetPounds.innerText = localStorage.getItem("target") % 14;
		targetDisplay.innerText = localStorage.getItem("target");
	} else {
		targetStone.innerText = "0";
		targetPounds.innerText = "0";
		targetDisplay.innerText = "0";
	}
}
displayTargetWeight();
// Get data from local storage and populate results div
function displayResults() {
	//clear results list
	resultsOutput.innerHTML = "";

	// Put dates from local storage into array to sort order
	let dateList = [];
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key != "target" && key != "") {
			dateList.push(key);
		}
	}

	dateList.sort();
	dateList.reverse();

	let highestValue = 0;
	let lowestValue = 90000;
	let highestRecord = `Your highest record will be shown here`;
	let lowestRecord = `your lowest record will be shown here`;

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

		let dayString = day + nth(day);

		//collect if highest or lowest record
		if (value > highestValue) {
			highestValue = value;
			highestRecord = `<span class="weight-bold">${stones}</span> st <span class="weight-bold">${pounds}</span> lbs <span class=" inline-margin"><span class="red">(</span>${value} lbs<span class="red">)</span></span> | &nbsp; ${year} ${month} ${dayString}`;
		}
		if (value < lowestValue) {
			lowestValue = value;
			lowestRecord = `<span class="weight-bold">${stones}</span> st <span class="weight-bold">${pounds}</span> lbs <span class=" inline-margin"><span class="green">(</span>${value} lbs<span class="green">)</span></span> | &nbsp; ${year} ${month} ${dayString}`;
		}

		// draw arrows
		let y = i + 1;
		let colorClass;
		if (
			value == localStorage.getItem(dateList[y]) ||
			i == dateList.length - 1
		) {
			arrow = `<span class="arrow "> -- </span>`;
			colorClass = "neutral";
		} else if (value < localStorage.getItem(dateList[y])) {
			arrow = `<span class="arrow"> <img src="./images/caret-down-solid.svg" alt="weight loss"> </span>`;
			colorClass = "green";
		} else if (value > localStorage.getItem(dateList[y])) {
			arrow = `<span class="arrow"> <img src="./images/caret-up-solid.svg" alt="weight gain"> </span>`;
			colorClass = "red";
		}

		const node = document.createElement("li");
		node.classList.add("fade", "fadeOut");

		let markUp = `

			<span class="date">${year} \xa0\xa0${month} ${dayString}</span>
			<span class="weight-stones"><span class="weight-bold">${stones}</span> st \xa0\xa0\ <span class="weight-bold">${pounds}</span> lbs</span>
			<span class="weight-pounds"><span class="${colorClass}">(</span> ${value} lbs <span class="${colorClass}">)</span> ${arrow}</span>

		`;

		node.innerHTML = markUp;

		resultsOutput.appendChild(node);
		arrowSet = value;
	}
	// display highest and lowest entries
	hiLowList.innerHTML = `<li>Lowest recorded weight  &nbsp; -  &nbsp; ${lowestRecord}</li><li>Highest recorded weight  &nbsp; -  &nbsp; ${highestRecord}</li>`;

	displayGraph();
	fadeInAnimation();
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

	for (let i = 0; i < localStorage.length; i++) {
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

// restore data from file
function restoreData() {
	let file = document.getElementById("csvFileInput").files[0];
	let filePath = document.getElementById("csvFileInput").value;

	if (file) {
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			let csvString = reader.result;
			// clean up string using split
			let lines = csvString.split("\r\n");
			// lines is now an array with each item a string "date,weight"
			for (let i = 0; i < lines.length; i++) {
				let line = lines[i].split(",");
				//check for any undefined or null entries
				if (line != "") {
					// localStorage (date,weight)
					localStorage.setItem(line[0], line[1]);
				}
			}
			// Clear browse file input
			document.getElementById("csvFileInput").value = "";
			// Change message
			userMessage.innerText = "Data stored to local storage";
			// Update display and graph

			displayResults();
			displayTargetWeight();
			displayGraph();
		};
		reader.onerror = function () {
			console.log(reader.error);
			userMessage.innerText =
				"There was an error recieving your file, Please try again" +
				reader.error;
		};
	} else {
		console.log("No File Selected");
		userMessage.innerText = "No File selected";
	}
}

// limit file type for restoreData()
function fileValidation() {
	var fileInput = document.getElementById("csvFileInput");

	var filePath = fileInput.value;

	// Allowing file type
	var allowedExtensions = /(\.csv)$/i;

	if (!allowedExtensions.exec(filePath)) {
		alert(
			"not '.CSV' file -  Invalid file type\nFile template must be MyWeight_**_**_****.csv"
		);
		userMessage.innerText =
			' Please select again. File template must be "MyWeight_**_**_****.csv"';
		fileInput.value = "";
		return false;
	}
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

//Confirm delete of all data
function confirmDelete() {
	let txt;
	if (confirm("Press OK to confirm delete of all data")) {
		txt = "All data has been deleted";
		localStorage.clear();
		displayResults();
		displayTargetWeight();
		displayGraph();
	} else {
		txt = "You pressed Cancel!";
	}
	document.getElementById("delete-message").innerText = txt;
}

//Display graph from localhost data

function displayGraph() {
	// if (localStorage.getItem("target") === null) {

	let noGraphText = `<h2>TRACK YOUR WEIGHT, ACHIEVE YOUR GOALS</h2><p>Track your weight effortlessly with Weight Tracker. View your weight in stones and pounds, making it easy to monitor your progress. Stay on top of your health goals with detailed tracking and insightful analytics. Start your journey towards a healthier you today</P><br><h3>A graph will display after your first two entries are logged</h3><br><h3>Set your target weight in the drop down menu above</h3>`;
	if (
		window.localStorage.length < 2 &&
		localStorage.getItem("target") === null
	) {
		let graphDiv = document.getElementById("graph-display");
		let graphCanvas = document.getElementById("weightChart");
		graphText.innerHTML = noGraphText;
		if (graphCanvas) {
			graphCanvas.remove();
		}
	} else if (window.localStorage.length < 3 && localStorage.getItem("target")) {
		let graphDiv = document.getElementById("graph-display");
		let graphCanvas = document.getElementById("weightChart");
		graphText.innerHTML = noGraphText;
		if (graphCanvas) {
			graphCanvas.remove();
		}
	} else {
		let graphDiv = document.getElementById("graph-display");
		let graphCanvas = document.getElementById("weightChart");
		let targetValue = localStorage.getItem("target");

		graphText.innerHTML = `
			<h2>Select last <select name="graph-entries" id="graph-entries">
						<option value="">Number of</option>
						<option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                    </select> entries</h2>
			<ul class="legend"><li><span class="weight-dash"></span>Weight.</li><li><span class="target-dash"></span>Target weight = &nbsp;<span class="weight-bold">${Math.floor(
				targetValue / 14
			)}</span> &nbsp;stone &nbsp; <span class="weight-bold">${
			targetValue % 14
		}</span> &nbsp; pounds &nbsp; <span class="green">(</span>${Math.floor(
			targetValue
		)} pounds<span class="green">)</span></li></ul>
			`;
		//clear canvas by deleting canvas and re adding
		if (graphCanvas) {
			graphCanvas.remove();
		}

		let newCanvas = document.createElement("canvas");
		newCanvas.id = "weightChart";
		graphDiv.appendChild(newCanvas);

		graphCanvas = document.getElementById("weightChart").getContext("2d");

		//////
		let myDates = [];
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key != "target") {
				myDates.push(key);
			}
		}

		myDates.sort();
		let myWeights = [];

		for (let i = 0; i < myDates.length; i++) {
			let localItem = localStorage.getItem(myDates[i]);
			myWeights.push(localItem);
		}

		let myWeightsLastFive = myWeights.slice(entryNumber);

		//// DRAW LINE CHART

		const canvas = document.getElementById("weightChart");
		const ctx = canvas.getContext("2d");

		// Sample data

		const data = myWeightsLastFive;

		let target = [
			targetValue,
			targetValue,
			targetValue,
			targetValue,
			targetValue,
		];

		// Graph dimensions
		const width = document.getElementById("graph-display").offsetWidth;
		const height = document.getElementById("graph-display").offsetHeight;
		canvas.width = width;
		canvas.height = height;
		canvas.style.background = "#304949";
		const padding = 10;
		const paddingLeft = 50;
		const yLabelCount = data.length;

		// Calculate scaling factors
		const xScale = (width - (padding + paddingLeft)) / (data.length - 1);
		const yMax = Math.max(...data) + 5;

		let yMin;
		if (Math.min(...data) < targetValue) {
			yMin = Math.min(...data) - 2;
		} else {
			yMin = targetValue - 2;
		}

		const yRange = yMax - yMin;
		const yScale = (height - 2 * padding) / yRange;

		// Draw axes
		ctx.beginPath();
		ctx.moveTo(paddingLeft, padding);
		ctx.lineTo(paddingLeft, height - padding);
		ctx.strokeStyle = "#2b4141";
		ctx.stroke();

		//Draw grid lines
		for (let i = 0; i <= yLabelCount; i++) {
			ctx.beginPath();
			let yValue = yMin + (yRange / yLabelCount) * i;
			const y = height - padding - (yValue - yMin) * yScale;
			ctx.moveTo(paddingLeft, y + 5);
			ctx.lineTo(width - padding, y + 5);
			ctx.strokeStyle = "#ffffff2a";
			ctx.stroke();
		}

		// Draw lines
		ctx.beginPath();
		ctx.moveTo(paddingLeft, height - padding - (data[0] - yMin) * yScale);
		data.forEach((point, index) => {
			const x = paddingLeft + index * xScale;
			const y = height - padding - (point - yMin) * yScale;
			ctx.lineTo(x, y);
		});
		ctx.lineWidth = 2;
		// blue
		ctx.strokeStyle = weightLineColor;
		ctx.stroke();

		//Draw target line
		ctx.beginPath();
		ctx.moveTo(paddingLeft, height - padding - (target[0] - yMin) * yScale);
		target.forEach((point, index) => {
			const x = width - padding;
			const y = height - padding - (point - yMin) * yScale;
			ctx.lineTo(x, y);
		});
		ctx.lineWidth = 2;
		// red
		// ctx.strokeStyle = "#ff6384";
		ctx.strokeStyle = targetLineColor;
		ctx.stroke();

		//Draw points
		const dot_size = 3;
		data.forEach((point, index) => {
			ctx.beginPath();
			const x = paddingLeft + index * xScale;
			const y = height - padding - (point - yMin) * yScale;
			ctx.arc(x, y, dot_size, 0, 2 * Math.PI, true);
			// blue
			ctx.fillStyle = "#348dc6";
			ctx.fill();
		});

		// Draw y-axis labels
		if (entryNumber == -3 || entryNumber == -5 || entryNumber == -10) {
			for (let i = 0; i <= yLabelCount; i++) {
				let yValue = yMin + (yRange / yLabelCount) * i;
				const y = height - padding - (yValue - yMin) * yScale;
				ctx.fillStyle = "#c9d5db";
				ctx.font = "12px Helvetica";
				ctx.fillText(yValue.toFixed(0) + " lbs", paddingLeft - 50, y + 5);
			}
		}
	}

	let entrySelect = document.getElementById("graph-entries");

	if (entrySelect) {
		entrySelect.addEventListener("change", () => {
			entryNumber = 0 - entrySelect.value;
			displayGraph();
		});
	}
}

//fade in animation

function fadeInAnimation() {
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 1,
	};

	function observerCallback(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// fade in observed elements that are in view
				entry.target.classList.replace("fadeOut", "fadeIn");
			} else {
				// fade out observed elements that are not in view
				entry.target.classList.replace("fadeIn", "fadeOut");
			}
		});
	}

	const observer = new IntersectionObserver(observerCallback, observerOptions);

	let fadeElms = document.querySelectorAll(".fade");
	fadeElms.forEach((el) => observer.observe(el));
}
