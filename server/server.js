require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const routeHandler = require('./routes/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use('/api/v1', routeHandler)

// server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// connect to mongodb
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));

