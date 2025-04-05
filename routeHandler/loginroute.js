const express = require('express');
const router = express.Router();
const authModel = require('../models/authuser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { checkAuth } = require('../middleware/authmiddleware');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Login Route
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        let user = await authModel.findOne({ email });
        if (!user) return res.status(400).send("User not found");

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            let token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
            res.cookie("token", token, { httpOnly: true });
            res.redirect('/');
        } else {
            res.status(400).send("Incorrect email or password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// Example usage of checkAuth middleware
router.get('/protected', checkAuth, (req, res) => {
    res.send(`Welcome, ${req.user ? req.user.username : 'Guest'}! This is a protected route.`);
});

module.exports = router;