const express = require('express');
const Blog = require('../models/blog'); // Ensure correct case for the Blog model import
const router = express.Router();

/**
 * POST /api/blogs
 * Route for adding a new blog post.
 */
router.post('/', async (req, res) => {
  const { title, content, url } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      url,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Error creating blog post', error });
  }
});

/**
 * GET /api/blogs
 * Route to retrieve all blog posts.
 */
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ message: 'Error retrieving blogs', error });
  }
});

/**
 * DELETE /api/blogs/:id
 * Route to delete a blog post by ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
});

module.exports = router;
