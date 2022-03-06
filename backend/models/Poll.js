const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: [true, 'Please add a poll hash'],
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  expiry: {
    type: Date,
    required: [true, 'Please add an expiry date'],
  },
  owner: {
    type: String,
    required: [true, 'Please add the owner of the poll'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  options: [{
    signal: {
      type: String,
      required: [true, 'Please add an option signal'],
    },    
    hash: {
      type: String,
      required: [true, 'Please add an option signal'],
    },
    option: {
      type: String,
      required: [true, 'Please add a valid option']
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('Poll', PollSchema);
