require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/index');
const session = require('express-session');
global.__basedir = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({
    secret: 'webslesson',
    resave: true,
    saveUninitialized: true,
}));

module.exports = app;
