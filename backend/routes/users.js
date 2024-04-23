const express = require('express');
const controller = require('../controllers/user')
const authentication = require('../helpers/tokenValidators');

const router = express.Router();
/* GET users listing. */
router.get('/',controller.getAllUsers);
router.get('/investors', controller.getAllInvestors);
router.get('/entrepreneurs', controller.getAllEntrepreneurs);
router.get('/:userId',controller.getUser);
router.get('/:userId/votes',controller.getUserVotes);
router.put('/:userId',authentication.parseToken, authentication.isValidToken, authentication.getUserFromToken, controller.updateUser);
router.delete('/:userId',authentication.parseToken, authentication.isValidToken, authentication.getUserFromToken, controller.deleteUser);


module.exports = router;
