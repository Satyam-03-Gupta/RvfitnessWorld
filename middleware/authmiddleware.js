const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('../routeHandler/authroute');
const cookieParser = require('cookie-parser');
const userModel = require('../models/authuser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kingshuk?0199';

// Middleware to check if user is logged in
const checkAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        console.log("No token found in cookies");
        req.authuser = null;
        return next();
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        let user = await userModel.findOne({ email: decoded.email }); // Fixed variable shadowing
        if (!user) {
            console.log("User not found in database");
        }
        req.authuser = user || null;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error("Token expired at:", err.expiredAt);
            return res.render('login', { error: "Token expired. Please log in again." }); // Fixed view reference
        }
        console.error("Error verifying token:", err);
        req.authuser = null;
    }
    next();
};

module.exports = { checkAuth };