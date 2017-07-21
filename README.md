# Calendar app

This is a calendar app for managing appointments.

### Prerequisites

To get the project up and running you need to have `node` and `npm` installed on your machine.

## Demo
[Demo deployment](https://intelligent-moliere-40740.herokuapp.com/)

## Run locally

### Run the API Server

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

* [Create Next App](https://open.segment.com/create-next-app) - Boilerplate which uses [Next.js](https://github.com/zeit/next.js/) for server-side rendering, and [create-react-app](https://github.com/facebookincubator/create-react-app) to start a React/Redux project.


## Author

* **Ana Luiza Motta Gomes** - [analuizamtg](https://github.com/analuizamtg)
