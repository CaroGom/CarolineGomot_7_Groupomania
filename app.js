const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
require('dotenv').config({path : './config/.env'});
require('./config/db');
const {checkUser, requireAuth}= require('./middlewares/authmiddleware')

//setting up routes

const UserRoutes = require('./routes/userroute');
const PostRoutes = require('./routes/postroute');

const app = express();

//setting up POST routes

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
})

//img management
app.use('/images', express.static(path.join(__dirname, 'images')));

//calling routes
app.use ('/api/auth', UserRoutes);
app.use ('/api/post', PostRoutes);

module.exports = app;