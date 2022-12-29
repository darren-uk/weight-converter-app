# weight-converter-app

> For when your weight scales only show pounds (lbs) and you want it converted to Stones (st lbs)

> Keep track of your weight by storing in local storge of web browser
> Display entries of your weight
> Display Chart / Graph of entries
> Set you target weight

> Display entries of your weight

> Display Chart / Graph of entries

> Set you target weight

> Download your data for Excel spreadsheet (.csv)

## Changelog

- 1.0 - Add Enter Date, Enter weight, convert to stones and list below.
- 1.0.1 - changed color of date in result list.
- 1.0.2 - changed date selection to current date only & add listener for ENTER button to submit.
- 1.1 - Add delete last line in results.
- 1.2 - Adds inputs to local storage and results are displayed constantly in ascending order and after page refresh + deleted instant conversion text temporarily.
- 1.2.1 - Changed delete last line button to delete entry from selected date.
- 1.3 - Add live preview of weight conversion.
- 1.4 - Overhaul of how data is collected in local storage and displayed on page. (more efficient)
- 1.4.1 - Removed live preview of weight conversion
- 1.5 - Added chart display using Chart.js from https://www.chartjs.org/
- 1.5.1 - Changed chart to display last 5 entries on chart.
- 1.6 - Changed UI
- 1.7 - Add drop down menu at top to clean up UI.
- 1.7.1 - add target weight input in drop down menu. Target weight now stored in LocalStorage. Target weight is included in .csv download.

## Dependencies / Libraries

- ChartJS URL https://www.chartjs.org/

## Disclaimer

- WARNING - Clearing / cleaning browser cache, cookies or storage will affect or DELETE data stored on users browser.
- Data is stored in browser with local storage
- If user visits app in another browser, data will not display. Data is stored on users local machine and in browser local storage. All browsers have own local storage.
