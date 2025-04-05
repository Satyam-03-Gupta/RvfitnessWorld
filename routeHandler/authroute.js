const express = require('express');
const router = express.Router();
const authModel = require('../models/authuser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { checkAuth } = require('../middleware/authmiddleware');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route
router.post('/', async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await authModel.create({
            username,
            email,
            password: hash,
        });

        let token = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/login');
    } 
    catch (err) {
        console.error("Error in /create route:", err.message);
        res.status(500).send("Error creating user in database");
    }
});


module.exports = router;