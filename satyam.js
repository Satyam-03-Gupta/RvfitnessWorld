const express = require('express');
const morgan = require('morgan');
const app = express();
const dbConnection = require('./config/db');
const userModel = require('./models/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('./routeHandler/route');
const authRouter = require('./routeHandler/authroute');
const authLogin = require('./routeHandler/loginroute');
const { checkAuth } = require('./middleware/authmiddleware');

const JWT_SECRET = process.env.JWT_SECRET;
require('dotenv').config();

// Ensure cookieParser is applied before checkAuth
app.use(cookieParser());
app.use(checkAuth);

app.set("view engine", "ejs");
app.use('/', authRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use('/userform', router);
app.use('/auth',authRouter);
app.use('/create', authRouter);
app.use('/login', authLogin);
app.use('/logout', authLogin);


app.get('/', checkAuth, (req, res) => {
    res.render('index', { user: req.user || null });
});

app.get('/createuser', (req, res) => {
    res.render('createuser');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/privacy', (req, res) => {
    res.render('privacy');
});

// ----------------------------subtraining---------------------------

app.get('/GymTraining/build', (req, res) => {
    res.render('GymTraining/build')
})

app.get("/GymTraining/chest", (req, res) => {
    res.render('GymTraining/chest')
});
app.get('/GymTraining/back', (req, res) => {
    res.render('GymTraining/back')
})

app.get("/GymTraining/shoulder", (req, res) => {
    res.render('GymTraining/shoulder')
});

app.get("/GymTraining/biceps", (req, res) => {
    res.render('GymTraining/biceps')
});
app.get('/GymTraining/triceps', (req, res) => {
    res.render('GymTraining/triceps')
})

app.get("/GymTraining/legs", (req, res) => {
    res.render('GymTraining/legs')
});

// -----------------------------subtraining---------------------------
app.get('/LadiesGym/ladiesgym', (req, res) => {
    res.render('LadiesGym/ladiesgym')
})

app.get("/LadiesGym/chest", (req, res) => {
    res.render('LadiesGym/chest')
});
app.get('/LadiesGym/back', (req, res) => {
    res.render('LadiesGym/back')
})

app.get("/LadiesGym/shoulder", (req, res) => {
    res.render('LadiesGym/shoulder')
});

app.get("/LadiesGym/biceps", (req, res) => {
    res.render('LadiesGym/biceps')
});
app.get('/LadiesGym/triceps', (req, res) => {
    res.render('LadiesGym/triceps')
})

app.get("/LadiesGym/leg", (req, res) => {
    res.render('LadiesGym/leg')
});

// -----------------------------subtraining---------------------------

app.get('/WeightLifting/weightlifting', (req, res) => {
    res.render('WeightLifting/weightlifting')
})
app.get("/WeightLifting/chest", (req, res) => {
    res.render('WeightLifting/chest')
});
app.get('/WeightLifting/back', (req, res) => {
    res.render('WeightLifting/back')
})

app.get("/WeightLifting/shoulder", (req, res) => {
    res.render('WeightLifting/shoulder')
});

app.get("/WeightLifting/biceps", (req, res) => {
    res.render('WeightLifting/biceps')
});
app.get('/WeightLifting/triceps', (req, res) => {
    res.render('WeightLifting/triceps')
})

app.get("/WeightLifting/leg", (req, res) => {
    res.render('WeightLifting/leg')
});

// -----------------------------subtraining---------------------------

app.get('/Professional/professional', (req, res) => {
    res.render('Professional/professional')
})
app.get("/Professional/chest", (req, res) => {
    res.render('Professional/chest')
});
app.get('/Professional/back', (req, res) => {
    res.render('Professional/back')
})

app.get("/Professional/shoulder", (req, res) => {
    res.render('Professional/shoulder')
});

app.get("/Professional/biceps", (req, res) => {
    res.render('Professional/biceps')
});
app.get('/Professional/triceps', (req, res) => {
    res.render('Professional/triceps')
})

app.get("/Professional/leg", (req, res) => {
    res.render('Professional/leg')
});

// -----------------------------subtraining---------------------------

app.get('/Workout/workout', (req, res) => {
    res.render('Workout/workout')
})

app.get("/Workout/chest", (req, res) => {
    res.render('Workout/chest')
});
app.get('/Workout/back', (req, res) => {
    res.render('Workout/back')
})

app.get("/Workout/shoulder", (req, res) => {
    res.render('Workout/shoulder')
});

app.get("/Workout/biceps", (req, res) => {
    res.render('Workout/biceps')
});
app.get('/Workout/triceps', (req, res) => {
    res.render('Workout/triceps')
})

app.get("/Workout/leg", (req, res) => {
    res.render('Workout/leg')
});

// -----------------------------subtraining---------------------------

app.get('/SpecificWorkout/specific', (req, res) => {
    res.render('SpecificWorkout/specific')
})

app.get("/SpecificWorkout/chest", (req, res) => {
    res.render('SpecificWorkout/chest')
});
app.get('/SpecificWorkout/back', (req, res) => {
    res.render('SpecificWorkout/back')
})

app.get("/SpecificWorkout/shoulder", (req, res) => {
    res.render('SpecificWorkout/shoulder')
});

app.get("/SpecificWorkout/biceps", (req, res) => {
    res.render('SpecificWorkout/biceps')
});
app.get('/SpecificWorkout/triceps', (req, res) => {
    res.render('SpecificWorkout/triceps')
})

app.get("/SpecificWorkout/leg", (req, res) => {
    res.render('SpecificWorkout/leg')
});

// -----------------------------subtraining---------------------------


app.listen(1432, () => {
    console.log('Welcome Satyam let go!!!');
});














