const express = require('express');
const router = express.Router();
const { registerCtrl } = require('../controllers/login/auth')

router.post('/', registerCtrl); 


module.exports = router;