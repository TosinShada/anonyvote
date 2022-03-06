const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: [true, 'Please add a transaction hash'],
  },
  proof: {
    type: String,
    required: [true, 'Please add the proof']
  },
  publicSignals: {
    type: String,
    required: [true, 'Please add the public signals']
  },
  nullifierHash: {
    type: String,
    required: [true, 'Please add the nullifier hash']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  poll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Poll',
    required: true
  },
  option: {
    type: mongoose.Schema.ObjectId,
    ref: 'Option',
    required: true
  }
});

module.exports = mongoose.model('Vote', VoteSchema);
