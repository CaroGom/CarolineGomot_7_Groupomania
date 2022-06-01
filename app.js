const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

//setting up routes

const UserRoutes = require('./routes/userroute');

const app = express();

//setting up POST routes

app.use(express.json());



//calling routes
app.use ('/api/auth', UserRoutes);

module.exports = app;