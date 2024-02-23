const express = require("express");
const router = express.Router();
const authRoutes = require('../routes/auth'); 

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" })
})

router.use("/auth", authRoutes);

module.exports = router;