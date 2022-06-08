const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usercontroller.js');


//routes POST signup and login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//routes GET users overview
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfo);
router.put('/:id', userCtrl.updateUser);

module.exports = router; 