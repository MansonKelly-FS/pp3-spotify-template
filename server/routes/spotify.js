const express = require("express");
const router = express.Router();
const { search } = require("../controllers/spotify");

router.get("/", search);

module.exports = router;
