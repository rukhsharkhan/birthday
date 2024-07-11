const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming you have a Post model

// Get all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Create a new post
router.post('/', async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update a post by ID
router.put('/:id', async (req, res, next) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res, next) => {
  const postId = req.params.id;
  try {
    await Post.findByIdAndDelete(postId);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
