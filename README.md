# Calendar app

This is a calendar app for managing appointments.

## Demo
[Demo deployment](https://calendar-appointment.herokuapp.com/)

### Prerequisites

To get the project up and running you need to have `node` and `npm` installed on your machine.

## Run locally

### Run the API Server

Set environment variable `MONGODB_URL` before starting in order to connect to MongoDB .

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server.

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```
## Automated tests

### First, run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run tests

In a separate terminal from the API server:

```bash
npm test
```

## Built With

* [Create-react-app](https://github.com/facebookincubator/create-react-app) to start a React/Redux project.
* [NodeJS](https://nodejs.org/en/) to build the server API.
* [MongoDB](https://www.mongodb.com/) to store appointments' data.


## Author

* **Ana Luiza Motta Gomes** - [analuizamtg](https://github.com/analuizamtg)
