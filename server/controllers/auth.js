const axios = require("axios");
const randomstring = require("randomstring");
const querystring = require("querystring");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, API_URL } = process.env;

const Token = require("../models/spotify");

const auth_token = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

const stateKey = "spotify_auth_state";

const now = new Date().getTime();

exports.login = (req, res) => {
  try {
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
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
  } catch (error) {
    console.error(error);
  }
};

exports.callback = async (req, res) => {
  try {
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

        let jwt = new Token(response.data);
        console.log(response.data);
        jwt.expires_in = new Date(
          new Date().setHours(new Date().getHours() + 1)
        );
        jwt.save();
        console.log(jwt);
    
    return res
      .status(200)
      .json({ message: "callback handler", jwt });
  }
  catch (error) {
        console.error(error);
  }
};

exports.status = async (req, res) => { 
  const { refresh_token } = req.query;
  
  Token.findOne({ refresh_token: refresh_token })
    .exec()
    .then((Token) => {
          if (Token && Token.expires_in > now) {
            res.json({ status: "true" });
          } else {
            res.json({ status: "false" });
          }
    }
  )
}

exports.logout = async (req, res) => {
  return res.status(200).json({ message: "logged out" });
};

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
    },
  });

  return res
    .status(200)
    .json({ message: "refresh token", data: response.data });
};
