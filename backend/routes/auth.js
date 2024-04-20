const express = require('express');
const router = express.Router();
const { loginCtrl } = require('../controllers/login/auth')

router.post('/', loginCtrl); 


module.exports = router;