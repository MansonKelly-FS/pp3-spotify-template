const axios = require("axios");

const Token = require("../models/spotify");

const now = new Date().getTime();

exports.search = async (req, res) => {
  const jwt = Token.findOne()
    .where("expires_in")
    .gte(now)
    .exec()
    .then((jwt) => {
      console.log("jwt", jwt);
      const { access_token } = jwt;
      console.log("access token >>>", access_token);

      axios({
        method: "GET",
        url: "https://api.spotify.com/v1/search",
        params: {
          type: "playlist,artist,track",
          q: req.query.q,
          limit: 3,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
        .then(({ data }) => {
          res.json(data);
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => {
      console.error("no valid jwt found", error);
    });
};
