// routes/posts.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userRole = require('../middleware/userRole');
const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// Create post (admin only)
router.post('/', [auth, userRole('admin')], async (req, res) => {
  const { title, content,type } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      type,
      author: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update post (admin only)
router.put('/:id', [auth, userRole('admin')], async (req, res) => {
  const { title, content,type } = req.body;

  try {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    // Update post
    post.title = title || post.title;
    post.content = content || post.content;
    post.type = type || post.type
    
    
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete post (admin only)
router.delete('/:id', [auth, userRole('admin')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    await Post.deleteOne({_id:req.params.id});
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;