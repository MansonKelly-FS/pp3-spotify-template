const express = require("express");
const router = express.Router();
const spotifyCtrl = require("../controllers/spotify");

router.get("/", spotifyCtrl.getToken);

module.exports = router