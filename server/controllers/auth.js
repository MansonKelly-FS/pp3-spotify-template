const axios = require('axios'); 
const randomstring = require("randomstring");
const querystring = require('querystring'); 
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, API_URL } = process.env; 

const auth_token = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

const stateKey = "spotify_auth_state";

exports.login = (req, res) => {
    console.log("start auth flow");

    const state = randomstring.generate(16); 
    res.cookie(stateKey, state);
    
    const scope = "user-read-private user-read-email";

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: scope,
        state: state,
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};

exports.callback = async (req, res) => {
    const { code } = req.query;
    console.log(">>>", code);

    const response = await axios({
      method: "post",
      url: API_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth_token}`,
      },
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      },
    });

    return res.status(200).json({ message: "callback handler", data: response.data }); 
}

exports.logout = async (req, res) => { 
    return res.status(200).json({ message: "logged out" }); 
}

exports.refresh = async (req, res) => { 
    const { refresh_token } = req.query; 
    console.log(">>>>", refresh_token); 
    const response = await axios({
      method: "post",
      url: API_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth_token}`,
        },
        params: { 
            grant_type: "refresh_token", 
            refresh_token: refresh_token, 
      }
    });

    return res.status(200).json({ message: 'refresh token', data: response.data }); 
}