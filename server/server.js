require('dotenv').config()
const express = require('express')
const port = process.env.PORT;
const cors = require('cors'); 
const app = express();
const mongoose = require("mongoose");


// allow cross-origin 
app.use(cors()); 

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