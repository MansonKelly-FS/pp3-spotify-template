const axios = require("axios");
const qs = require("qs");
const Token = require("../models/spotify");

// get authorization code from Spotify API and save it as a JWT
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const auth_token = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

const now = new Date().getTime();

const getToken = async () => {
  try {
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    let jwt = new Token(response.data);
    console.log(response.data);
    jwt.expires_in = new Date(
      new Date().setHours(new Date().getHours() + 1)
        //.getTime() + 5 /* expires after 5 min */ * 60000
    );
    jwt.save(); 
        console.log(jwt);
    return jwt;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getToken,
};
