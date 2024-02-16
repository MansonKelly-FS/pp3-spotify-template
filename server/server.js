require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const qs = require("qs");

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

// get authorization token
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const auth_token = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

const getAuth = async () => {
  try {
    // post request for access token
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // return access token
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
};
