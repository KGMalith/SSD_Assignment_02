//Import .env package
require('dotenv').config();
//Initialize express
let express = require('express');
let app = express();
//import bodyparser
let bodyParser = require('body-parser');
//Import mongoose
let mongoose = require('mongoose');
//Import passport
var passport = require('passport');
//Import CORS
let cors = require('cors');
//Import Main Routes File
let routes = require('./app/app');
//Import google api
const { google } = require('googleapis');
//Import multer
const multer = require('multer')

require('./auth/passportGoogle');
require('./auth/passportJWT');

//Create mongoose connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//make app use json
app.use(express.json());

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(passport.initialize());

app.use('/api', routes);

app.use(function (err, req, res, next) {
    res.status(500).send('Something went wrong!');
});

//Import Port Number
const PORT = process.env.APP_PORT;

app.listen(PORT, () => console.log('server is running on port:' + PORT));
