const express = require('express');
const {
  getPolls,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll
} = require('../controllers/polls');

const Poll = require('../models/Poll');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Poll), getPolls)
  .post(createPoll);

router
  .route('/:id')
  .get(getPoll)
  .put(updatePoll)
  .delete(deletePoll);

module.exports = router;
