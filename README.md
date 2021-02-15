# React-Expense-Tracker
### Version 1.0 Beta
The Front-end for an expense tracking mobile app that connects with a RESTful API through HTTP Requests

Web-based Mobile Application using a [custom built API](https://github.com/damiecode/TrackingApp-API) to gather and manipulate information related to various type of expenses.

## Features
### Expense Tracker (expenses, savings, categories)
- After Logging in a User is able to add various expenses to their tracker. 
- The expenses added to the tracker will be saved and stored in the back-end server's database.  
- The User is then able to track the number of expenses and amount they've used.
### Track expenses on a monthly basis
- The expenses are stored and sorted on a monthly basis.
### Expenses Charts
- A User can view expenses as a chart.

<!-- ![screenshot](./screenshot.jpg)
![screenshot](./screenshot2.jpg) -->

## [Live Link](https://react-expense-trackers.netlify.app/)

## Built With

- HTML, CSS
- JavaScript
- React.js
- React-Router
- Redux.js
- Redux-Thunk
- NPM Webpack

## Setup for Local use

### Clone Repository

Grab a clone of [this repository](https://github.com/damiecode/react-expense-tracker) from Github

### Setting up Front-End to Back-End connection

After you have successfully setup your back-end, you will need to change the URL the front-end connects to.

1. Navigate to your local directory of this cloned repository
2. Navigate to the src/redux/actions folder and open the index.js file
3. On line 3 where you would see const ```const URL = 'trackingapp-api.herokuapp.com/';```, replace ```'trackingapp-api.herokuapp.com/'``` with the url of your back-end server that you would have setup.

### Install Dependencies

```
$ npm install
```

### Run Application

```
$ npm run server
```

### Running Tests

```
$ npm run test
```

## Running Linters

### ESLint
- Run `npx eslint .` on the root of your project directory.

### Stylelint
- Run `npx stylelint "**/*.{css,scss}"` on the root of your project directory.

### Future Changes
- Major reboot for desktop design
- Add more information in the chart component page
- Add more functionality to the buttons in the more component page
(Help document, Detailed Profile Page, Settings Menu, Ability to set a Goal)

## Author

👤 **Damilola Ale**

- Github: [@damiecode](https://github.com/damiecode)
- Twitter: [@iamlildamski](https://twitter.com/iamlildamski)
- Linkedin: [Damilola Ale](https://www.linkedin.com/in/damiecode/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!
