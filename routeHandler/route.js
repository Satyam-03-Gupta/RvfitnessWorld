const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.post('/', async (req, res) => {
    const { username, email, phone, message } = req.body;

    const newuser = await userModel.create({
        username,
        email,
        phone,
        message
    });

    res.render('thankyou')
});

module.exports = router;
