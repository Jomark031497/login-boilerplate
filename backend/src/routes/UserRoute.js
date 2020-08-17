const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/UserController');

// METHOD   : POST
// DESC     : REGISTER A USER
// ACCESS   : PUBLIC
router.post('/register', registerUser);

// METHOD   : POST
// DESC     : LOG-IN A USER
// ACCESS   : PUBLIC
router.post('/login', loginUser);

module.exports = router;