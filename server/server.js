require('dotenv').config()
const express = require('express')
const port = process.env.PORT;
const cors = require('cors'); 
const path = require('path'); 
const app = express();
const mongoose = require("mongoose");


app.use(cors()); 
app.use(express.json());

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

// look in the react build folder for static build
app.use(express.static(path.join(__dirname, "../reactjs/build")));

// for any routes not defined by the api, assume it's a direct
// request to a client-side route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});
