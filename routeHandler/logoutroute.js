const express = require('express');
const router = express.Router();
const authModel = require('../models/authuser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { checkAuth } = require('../middleware/authmiddleware');

router.post("/", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;