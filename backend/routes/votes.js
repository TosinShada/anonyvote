const express = require('express');
const {
  getVotes,
  getVote,
  createVote
} = require('../controllers/votes');

const Vote = require('../models/Vote');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Vote), getVotes)
  .post(createVote);

router
  .route('/:id')
  .get(getVote);

module.exports = router;
