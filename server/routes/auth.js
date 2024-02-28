const express = require("express");
const router = express.Router();
const { status, login, callback, logout, refresh, search } = require('../controllers/auth')

router.get("/", login);
router.get("/status", status);
router.get("/callback", callback); 
router.get("/logout", logout); 
router.get('/refresh', refresh); 

module.exports = router