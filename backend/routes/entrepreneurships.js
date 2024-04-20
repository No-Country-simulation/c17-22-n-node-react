const express = require('express');
const router = express.Router();
const controller = require("../controllers/entrepreneurship");
const authentication = require("../helpers/tokenValidators");
// const authentication = require("")


const dummy = (req,res,next) => {
  res.send('respond with a resource');
}

/* GET users listing. */
router.get('/', controller.getAll);
router.get('/:entrepreneurshipId', controller.getOne);
router.get('/:entrepreneurshipId/votes', controller.getVotes);
router.get('/:entrepreneurshipId/votes/:voteId', controller.getVote);

router.post('/', authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur,dummy);
router.post('/vote',authentication.parseToken,  authentication.isValidToken, authentication.isValidInvestor, dummy);

router.put('/:entrepreneurshipId',authentication.parseToken,  authentication.isValidToken, authentication.isValidEntrepreneur,dummy);
router.put('/:entrepreneurshipId/vote/:voteId', authentication.isValidToken, authentication.isValidInvestor,dummy);

router.delete('/:entrepreneurshipId',authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, dummy)
router.delete('/:entrepreneurshipId/vote',authentication.parseToken,  authentication.isValidToken, authentication.isAdmin, dummy)
router.delete('/:entrepreneurshipId/vote/:voteId',authentication.parseToken, authentication.isValidToken, authentication.isValidInvestor,dummy)

module.exports = router;
