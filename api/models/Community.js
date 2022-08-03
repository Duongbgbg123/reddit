const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  avatar: { type: String, required: false },
  cover: { type: String, required: false },
  author: { type: String, required: true },
});
const Community = mongoose.model('Community', schema);

module.exports = Community;
