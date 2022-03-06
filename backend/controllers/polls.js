const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Poll = require('../models/Poll');

// @desc      Get all polls
// @route     GET /api/v1/polls
// @access    Public
exports.getPolls = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single poll
// @route     GET /api/v1/polls/:id
// @access    Public
exports.getPoll = asyncHandler(async (req, res, next) => {
  const poll = await Poll.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: poll
  });
});

// @desc      Create poll
// @route     POST /api/v1/polls
// @access    Public
exports.createPoll = asyncHandler(async (req, res, next) => {
  const poll = await Poll.create(req.body);

  res.status(201).json({
    success: true,
    data: poll
  });
});

// @desc      Update poll
// @route     PUT /api/v1/polls/:id
// @access    Public
exports.updatePoll = asyncHandler(async (req, res, next) => {
  const poll = await Poll.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: poll
  });
});

// @desc      Delete poll
// @route     DELETE /api/v1/polls/:id
// @access    Public
exports.deletePoll = asyncHandler(async (req, res, next) => {
  await Poll.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
