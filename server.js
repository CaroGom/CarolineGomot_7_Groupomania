const mongoose = require('mongoose');
const express = require ('express');
require('./config/db');
require('dotenv').config({path: './config/.env'});
const app = require('./app');



//Setting up listening port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})



