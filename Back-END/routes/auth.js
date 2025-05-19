const express = require('express');
const authRoutes = express.Router();
const {register ,login,GetUsers} = require('../controllers/userControllers');


authRoutes.post('/register',register);
authRoutes.post('/login',login);
authRoutes.get('/', GetUsers);




module.exports = authRoutes ;