const express = require("express");
const router = express.Router();
const authRoutes = require('../routes/auth'); 
// const spotifyRoutes = require('../routes/spotify');

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" })
})

router.use("/auth", authRoutes);
// router.use("/search", spotifyRoutes)

module.exports = router;