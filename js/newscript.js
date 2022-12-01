// Get elements

const dateInput = document.getElementById("date-input");
const weightInput = document.getElementById("weight-input");
const resultsOutput = document.getElementById("results");

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
		let pounds = value % 14;

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

		console.log(dayString);
		//Create Results list
		const node = document.createElement("li");
		const spanDate = document.createElement("span");
		spanDate.className = "date";
		const spanWeight = document.createElement("span");
		spanWeight.className = "weight";

		let dateText = document.createTextNode(`${year} ${month} ${dayString} `);

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

// backup to csv
function csvBackup() {
	// create csv file  from local storage data
}

// backup to google docs

function googleBackup() {
	// create csv file  from local storage data and upload to google drive
}

// restore from backup

function backupRestore() {
	//get data from csv and place into local storage
	// Get array of all weights from local storage
	// loop through array
	// for each , convert with weightConverter function and display results
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

//ADD EVENT LISTENER FOR PRESSING ENTER BUTTON
