const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

commentSchema.methods.isOwnedBy = function(user) {
  return this.user && user._id.equals(this.user._id);
};

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  restaurants: [],
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  admin: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  votes: [{
    voter: { type: mongoose.Schema.ObjectId, ref: 'User' },
    restaurant: { type: Object }
  }],
  winner: { type: Object }
});

module.exports = mongoose.model('Event', eventSchema);
