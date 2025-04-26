// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type:{
    type: String,
    enum: ['Enviroment', 'Design','Tech','Entertainment'],
    default: 'Tech'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

},{timestamps : true});

module.exports = mongoose.model('Post', PostSchema);