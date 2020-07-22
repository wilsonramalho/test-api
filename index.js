const express = require('express');
const db = require('./queries');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Create an route to look on the root and return a ok message */
app.get('/', (request, response) => {
    response.json({ info : 'RESTful API for a test application'});
});

/* Route who will return the farmers list */
app.get('/farmers/:data', db.getFarmerByParameter);

/* Setting up the listen port */
app.listen(port, () => {
    console.info(`API is live on port ${port}.`);
});