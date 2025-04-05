const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routeHandler/route');
const authRoutes = require('./routeHandler/authroute');
const authLogin = require('./routeHandler/loginroute');
const cookieParser = require('cookie-parser');
const JWT_SECRET = process.env.JWT_SECRET;

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/userform', userRoutes);
app.use('/authUser', authRoutes);


mongoose.connect('mongodb://localhost:27017/gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log('Database connected'))

    .catch(err => console.log('Error connecting to database'));

app.listen(1432, () => {
    console.log('Server is running on port 1432');
});