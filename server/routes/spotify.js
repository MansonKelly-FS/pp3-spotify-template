const express = require("express");
const router = express.Router();
const spotifyCtrl = require("../controllers/spotify");
const authCtrl = require("../controllers/auth");

router.get("/", spotifyCtrl.getToken);

module.exports = router