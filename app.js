const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./configs/config');
const routes = require('./routes/allRoutes');
const db = require('./configs/connection');
const PORT = config.Port;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(routes);

// call the database connectivity function
db();

app.listen(PORT, () => {
    //console.log(`${JSON.stringify(config)}.`);
    console.log(`Server is running on port ${PORT}.`);
})