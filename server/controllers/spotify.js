const axios = require("axios");
const qs = require("qs");
const Token = require('../models/spotify'); 

// get authorization code from Spotify API
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const auth_token = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

const getAuth = async () => {
  try {
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    getAuth
}