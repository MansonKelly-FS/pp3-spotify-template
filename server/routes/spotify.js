const express = require("express");
const router = express.Router();
const spotifyCtrl = require("../controllers/spotify");

router.get("/auth", spotifyCtrl.getAuth);

module.exports = router