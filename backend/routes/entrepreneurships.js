const express = require('express');
const router = express.Router();
const controller = require("../controllers/entrepreneurship");

// const authentication = require("")


const dummy = (req,res,next) => {
  res.send('respond with a resource');
}

const authentication = {
  isValidToken: dummy,
  isValidEntrepreneur: dummy,
  isValidInvestor: dummy,
  isAdmin: dummy,
}

/* GET users listing. */
router.get('/', dummy);
router.get('/:entrepreneurshipId', dummy);
router.get('/:entrepreneurshipId/vote', dummy);
router.get('/:entrepreneurshipId/vote/:voteId', dummy);

router.post('/', authentication.isValidToken, authentication.isValidEntrepreneur,dummy);
router.post('/vote', authentication.isValidToken, authentication.isValidInvestor, dummy);

router.put('/:entrepreneurshipId', authentication.isValidToken, authentication.isValidEntrepreneur,dummy);
router.put('/:entrepreneurshipId/vote/:voteId', authentication.isValidToken, authentication.isValidInvestor,dummy);

router.delete('/:entrepreneurshipId',authentication.isValidToken, authentication.isValidEntrepreneur, dummy)
router.delete('/:entrepreneurshipId/vote', authentication.isValidToken, authentication.isAdmin, dummy)
router.delete('/:entrepreneurshipId/vote/:voteId',authentication.isValidToken, authentication.isValidInvestor,dummy)

module.exports = router;
