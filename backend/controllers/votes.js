const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Vote = require('../models/Vote');

// @desc      Get all votes
// @route     GET /api/v1/votes
// @access    Public
exports.getVotes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single vote
// @route     GET /api/v1/votes/:id
// @access    Private/Admin
exports.getVote = asyncHandler(async (req, res, next) => {
  const vote = await Vote.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: vote
  });
});

// @desc      Create vote
// @route     POST /api/v1/votes
// @access    Private/Admin
exports.createVote = asyncHandler(async (req, res, next) => {
  const vote = await Vote.create(req.body);

  res.status(201).json({
    success: true,
    data: vote
  });
});
