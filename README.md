# Weight Tracker Web Application

> For when your weight scales only show pounds (lbs) and you want it converted to Stones (st lbs)

> Keep track of your weight by storing in local storge of web browser

> Display entries of your weight

> Display Chart / Graph of entries

> Set you target weight

> Download your data for Excel spreadsheet (.csv)

> Backup and restore you data locally.

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
- 1.8.0 - Added backup and restore function. Added delete all data function. Added set target weight with stones and pounds.
- 1.8.1 - removed dependency of ChartJS, added own chart script. Added coloured arrows aside records.
- 1.8.2 - removed site migration message & closed netlify site. Added Google Analytics to new site.
- 1.8.3 - changed layout of input section. changed button colors for accessabillity. added fade animation to results list. Added highest & lowest weights.
- 1.8.4 - added meta data and added feature to make PWA for mobile.
- 1.8.5 - added cache files. Site sould now work offline. approx cache size 300kb - 400kb.

## Dependencies / Libraries

- ~~ChartJS https://www.chartjs.org/~~ - Depreciated at version 1.8.1
- Lightweight client-side loader that feature-detects and load polyfills only when necessary https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js
- Markdown file converter https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js

## Your Data

- All data you input into the site is only stored locally on your machine. It is stored in your browsers local storage and will not expire unless you manually delete it. The data is linked to the web address of this site.
- You have access to your data by using the download option in the menu. The site will create a spreadsheet file with the extension .csv
- None of your inputed data is collected by me or any third party.

## Disclaimer

- WARNING - Clearing / cleaning browser cache, cookies or storage will affect or DELETE data stored on users browser.
- Data is stored in browser with local storage
- If user visits app in another browser, data will not display. Data is stored on users local machine and in browser local storage. All browsers have own local storage.
- DATA IS NOT STORED OR SHARED WITH ANYONE EXCEPT YOURSELF. WE COLLECT NO ADDITIONAL DATA.
- WE (THE OWNER / CREATOR OF THIS WEB SITE) ACCEPT NO RESPONSIBILITY FOR LOSS OF DATA STORED OR ANYONE ELSE INJECTING MALICIOUS DATA AND DAMAGING HARDWARE OR SOFTWARE.
- WE (THE OWNER / CREATOR OF THIS WEB SITE) ACCEPT NO RESPONSIBILITY FOR ANY ACTIONS OR CHANGES OF LIBRARIES OR DEPENDENCIES LISTED ABOVE.
- We use Google Analytics to collect data. We need this data to understand how you use our website so we can improve its design and functionality.

Using this site you are giving your consent, Google Analytics will process and collect your personal data (cookies and IP address) to give us valuable information. Google Analytics will transfer your data to the United States and store it for 6 months.

## FAQ

- Download backup of your data by selecting download button in menu screen. A spreadsheet .csv file will be created.
- Restore backup of your data by selecting upload button in menu screen. Select the .csv file that was created by the backup system.
  - Restore will overwrite the data stored in the browser local storage based on date. Other dated entries will not be deleted automatically. Clear all data before using Restore backup option if you dont want data mixed up.
- Clear all of your data from the site and local storage by selecting clear all button in menu screen. THIS IS PERMINENT and cannot be undone.
  - Data can only be restored by using Restore backup function and selecting .csv file created by site.
- Delete a single entry by selecting date on front page and using delete entry button.
- Use a speadsheet program (EXCEL or Google Sheets) to open the backup .csv file and view all stored data.
  - When opening file for the first time in EXCEL and option is presented, select show data seperated by comma.
  - You can create various graphs and charts to your liking.

## Contact details

Contact me via email [darrencolson80+support@gmail.com](mailto:darrencolson80+support@gmail.com)
