const express = require('express');
const mongoose = require('mongoose');
const User =  require('./models/userModel');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require("connect-mongo")(session);
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((User, done) => done(null, User.id)); // how users are logged in in a session
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
}) // how users are logged out in a session

// Connections
mongoose.connect(process.env.DB_URL, {  // Database Connection
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('Database connected: Welcome to MongoDB Atlas!')
});

const store = new MongoDBStore({
    url: process.env.DB_URL,
    secret: storeSecret,
    touchAfter: 24 * 3600 //touch after 1 day
});


//Session initialization

app.use(session({   // generates session cookie
    store,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 3600000
    }
 // storing sessions in mongoDB
}));

// ::::::::::::::::::: ROUTES ::::::::::::::::::::::

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/products',productRoutes);

app.listen(port, ()=> {
    console.log(`App running on port: ${port}`);
});
