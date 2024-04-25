const express = require('express');
const router = express.Router();
const controller = require("../controllers/entrepreneurship");
const authentication = require("../helpers/tokenValidators");
// const authentication = require("")}

/* GET users listing. */
router.get('/', controller.getAll);
router.get('/:entrepreneurshipId', controller.getOne);
router.get('/:entrepreneurshipId/vote', controller.getVotes);
router.get('/:entrepreneurshipId/vote/:voteId', controller.getVote);

router.post('/', authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.addEntrepreneurship);
router.post('/:entrepreneurshipId/vote',authentication.parseToken, authentication.isValidToken, authentication.isValidInvestor, controller.addVote);

router.put('/:entrepreneurshipId',authentication.parseToken,  authentication.isValidToken, authentication.isValidEntrepreneur,controller.updateEntrepreneurship);
router.put('/:entrepreneurshipId/vote/:voteId', authentication.parseToken, authentication.isValidToken, authentication.isValidInvestor,controller.updateVote);

router.delete('/:entrepreneurshipId',authentication.parseToken, authentication.isValidToken, authentication.isValidEntrepreneur, controller.deleteEntrepreneurship)
router.delete('/:entrepreneurshipId/vote',authentication.parseToken,  authentication.isValidToken, authentication.isAdmin, controller.deleteAllVotes)
router.delete('/:entrepreneurshipId/vote/:voteId',authentication.parseToken, authentication.isValidToken, authentication.isValidInvestor,controller.deleteVote)

module.exports = router;
