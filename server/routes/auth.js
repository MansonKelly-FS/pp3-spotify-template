const express = require("express");
const router = express.Router();
const { login, callback, logout, refresh } = require('../controllers/auth')

router.get("/", login);
router.get("/callback", callback); 
router.get("/logout", logout); 
router.get('/refresh', refresh); 

module.exports = router